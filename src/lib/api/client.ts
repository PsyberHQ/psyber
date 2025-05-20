import { API_BASE_URL, Endpoints } from './config';

interface ApiOptions {
  headers?: Record<string, string>;
  customUrl?: string;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiError extends Error {
  status?: number;
  data?: any;
}

/**
 * API client for making authenticated requests to the backend
 */
class ApiClient {
  private token: string | null = null;
  private debugMode: boolean = process.env.NODE_ENV === 'development';
  
  /**
   * Get the API base URL
   */
  getBaseUrl(): string {
    return API_BASE_URL;
  }
  
  /**
   * Set the authentication token for future requests
   */
  setToken(token: string) {
    if (this.debugMode) console.log("Setting API token");
    
    this.token = token;
    // Store token in localStorage when in browser environment
    if (typeof window !== 'undefined') {
      localStorage.setItem('psyber_token', token);
      
      // Also set a cookie for middleware access
      document.cookie = `psyber_token=${token}; path=/; max-age=2592000`; // 30 days
    }
  }
  
  /**
   * Get the stored token
   */
  getToken(): string | null {
    // Try to get from memory first
    if (this.token) return this.token;
    
    // Try to get from localStorage in browser environment
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('psyber_token');
      if (storedToken) {
        this.token = storedToken;
        if (this.debugMode) console.log("Retrieved token from localStorage");
        return storedToken;
      }
    }
    
    if (this.debugMode) console.log("No token found");
    return null;
  }
  
  /**
   * Clear the authentication token
   */
  clearToken() {
    if (this.debugMode) console.log("Clearing API token");
    
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('psyber_token');
      
      // Also clear the cookie
      document.cookie = 'psyber_token=; path=/; max-age=0';
    }
  }
  
  /**
   * Make a request to the API
   */
  async request<T>(
    endpoint: string,
    method: RequestMethod = 'GET',
    data?: any,
    options: ApiOptions = {}
  ): Promise<T> {
    const url = options.customUrl || `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    // Add authorization header if token exists
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    let body: string | FormData | URLSearchParams | undefined = undefined;
    
    // Handle different content types for the body
    if (data) {
      if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        if (data instanceof URLSearchParams) {
          body = data;
        } else {
          // Convert object to URLSearchParams
          const params = new URLSearchParams();
          Object.entries(data).forEach(([key, value]) => {
            params.append(key, value as string);
          });
          body = params;
        }
      } else if (headers['Content-Type'] === 'multipart/form-data') {
        // Remove content-type header for FormData (browser will set it with boundary)
        delete headers['Content-Type'];
        
        if (data instanceof FormData) {
          body = data;
        } else {
          // Convert object to FormData
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string);
          });
          body = formData;
        }
      } else {
        // Default to JSON
        body = JSON.stringify(data);
      }
    }
    
    if (this.debugMode) {
      console.log(`API ${method} request to ${url}`);
      if (data) console.log("Request data:", data);
    }
    
    const config: RequestInit = {
      method,
      headers,
      body,
    };
    
    try {
      const response = await fetch(url, config);
      
      if (this.debugMode) {
        console.log(`API response status: ${response.status}`);
      }
      
      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401) {
        // Clear invalid token
        this.clearToken();
        const error = new Error('Unauthorized - please login again') as ApiError;
        error.status = 401;
        throw error;
      }
      
      // Try to parse the response as JSON
      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        // Handle non-JSON responses
        const textResult = await response.text();
        try {
          // Still try to parse it as JSON in case content-type is wrong
          result = JSON.parse(textResult);
        } catch {
          // If it's not JSON, use the text as is
          result = { message: textResult };
        }
      }
      
      if (!response.ok) {
        let detailedMessage = `API request to ${url} failed with status ${response.status}`;
        try {
            // result might not be defined if response.json() itself failed, e.g. for non-JSON error responses
            if (result && result.detail && Array.isArray(result.detail)) {
              detailedMessage = "Validation error(s): " + result.detail.map((e: any) => {
                const loc = e.loc ? e.loc.join('.') : 'unknown_location';
                const inputSnippet = e.input ? ` | input: ${JSON.stringify(e.input).substring(0, 50)}...` : '';
                return `[Field: ${loc}, Message: ${e.msg}${inputSnippet}]`;
              }).join("; ");
            } else if (result && result.detail) {
              detailedMessage = String(result.detail);
            } else if (result && result.message) {
              detailedMessage = String(result.message);
            } else if (response.statusText) {
                detailedMessage = response.statusText;
            }
        } catch (parseError) {
            console.error("Error parsing API error response:", parseError);
            // Use statusText if available and result parsing failed
            detailedMessage = response.statusText || `HTTP error ${response.status}`;
        }

        console.error("API error response:", response.status, detailedMessage, "Full result:", result);
        const error = new Error(detailedMessage) as ApiError;
        error.status = response.status;
        error.data = result;
        throw error;
      }
      
      return result as T;
    } catch (error) {
      if (this.debugMode) console.error('API request failed:', error);
      
      // Rethrow the error for the caller to handle
      if ((error as ApiError).status) {
        throw error;
      } else {
        // Network errors won't have a status, add more context
        const networkError = new Error(`Network error: ${(error as Error).message}`) as ApiError;
        networkError.status = 0;
        throw networkError;
      }
    }
  }
  
  /**
   * Make a GET request
   */
  get<T>(endpoint: string, options?: ApiOptions): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, options);
  }
  
  /**
   * Make a POST request
   */
  post<T>(endpoint: string, data?: any, options?: ApiOptions): Promise<T> {
    if (endpoint === Endpoints.INIT_QUIZ) { // Ensure Endpoints.INIT_QUIZ is correctly defined
      console.log("[apiClient.post] Received data for init-quiz submission:", JSON.parse(JSON.stringify(data)));
      if (data && data.answers && Array.isArray(data.answers)) {
        console.log("[apiClient.post] Checking/fixing items in data.answers for init-quiz...");
        for (let i = 0; i < data.answers.length; i++) {
          const answerItem = data.answers[i];
          console.log(`[apiClient.post] Item ${i} in data.answers (before any fix):`, JSON.parse(JSON.stringify(answerItem)));
          if (answerItem && typeof answerItem === 'object') {
            if (!('id' in answerItem) && 'index' in answerItem && typeof answerItem.index === 'number') {
              console.warn(`[apiClient.post] FIXING Item ${i}: Has 'index' (${answerItem.index}) but missing 'id'. Converting 'index' to 'id'.`);
              answerItem.id = answerItem.index; // Assuming the value of 'index' was the intended 0-based ID
              delete answerItem.index;
              console.log(`[apiClient.post] Item ${i} in data.answers (after fix):`, JSON.parse(JSON.stringify(answerItem)));
            } else if (!('id' in answerItem)) {
              console.error(`[apiClient.post] Item ${i} in data.answers is MISSING 'id' and does not have a convertible 'index' key. Item:`, JSON.parse(JSON.stringify(answerItem)));
              // This item will likely cause a validation error on the server.
            } else {
              console.log(`[apiClient.post] Item ${i} in data.answers appears to have 'id' (${answerItem.id}). No fix applied by safety check.`);
            }
          } else {
            console.error(`[apiClient.post] Item ${i} in data.answers is not an object:`, JSON.parse(JSON.stringify(answerItem)));
          }
        }
        console.log("[apiClient.post] Final data.answers for init-quiz after checks/fixes:", JSON.parse(JSON.stringify(data.answers)));
      }
    }
    return this.request<T>(endpoint, 'POST', data, options);
  }
  
  /**
   * Make a PUT request
   */
  put<T>(endpoint: string, data?: any, options?: ApiOptions): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data, options);
  }
  
  /**
   * Make a DELETE request
   */
  delete<T>(endpoint: string, options?: ApiOptions): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, options);
  }
  
  /**
   * Upload a file
   */
  async uploadFile<T>(endpoint: string, file: File, type: string): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}/${type}`;
    const formData = new FormData();
    formData.append('file', file);
    
    const headers: Record<string, string> = {};
    
    // Add authorization header if token exists
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (this.debugMode) {
      console.log(`Uploading file to ${url}`);
    }
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: formData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        const errorMessage = result.detail || 'File upload failed';
        if (this.debugMode) console.error("File upload error:", errorMessage);
        throw new Error(errorMessage);
      }
      
      return result as T;
    } catch (error) {
      if (this.debugMode) console.error('File upload failed:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;