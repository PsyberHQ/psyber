import apiClient from '../client';
import { Endpoints } from '../config';
import { TokenResponse, UserData, UserSignupRequest } from '@/types/api';

/**
 * Authentication service for handling user login, signup, and authentication
 */
export const authService = {
  /**
   * Register a new user
   */
  async signup(userData: UserSignupRequest): Promise<UserData> {
    const response = await apiClient.post<UserData>(Endpoints.SIGNUP, userData);
    return response;
  },

  /**
   * Login with username/email and password
   */
  async login(username: string, password: string): Promise<TokenResponse> {
    // The login endpoint expects form data, not JSON
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await apiClient.request<TokenResponse>(
      Endpoints.LOGIN,
      'POST',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
    // Store the token for future requests
    if (response.access_token) {
      apiClient.setToken(response.access_token);
    }
    
    return response;
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    await apiClient.post(Endpoints.LOGOUT);
    apiClient.clearToken();
  },

  /**
   * Refresh the authentication token
   */
  async refreshToken(): Promise<TokenResponse> {
    const response = await apiClient.put<TokenResponse>(Endpoints.REFRESH_TOKEN);
    
    // Update the token
    if (response.access_token) {
      apiClient.setToken(response.access_token);
    }
    
    return response;
  },

  /**
   * Get the Google login URL
   */
  getGoogleLoginUrl(): string {
    return Endpoints.GOOGLE_LOGIN;
  },

  /**
   * Handle Google callback
   */
  async handleGoogleCallback(code: string): Promise<TokenResponse> {
    const response = await apiClient.get<TokenResponse>(`${Endpoints.GOOGLE_CALLBACK}?code=${code}`);
    
    // Store the token for future requests
    if (response.access_token) {
      apiClient.setToken(response.access_token);
    }
    
    return response;
  },

  /**
   * Send OTP to user email
   */
  async sendOtp(email: string): Promise<any> {
    return await apiClient.post(Endpoints.SEND_OTP, { email });
  },

  /**
   * Verify OTP code
   */
  async verifyOtp(email: string, otp: string): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>(Endpoints.VERIFY_OTP, { email, otp });
    
    // Store the token for future requests
    if (response.access_token) {
      apiClient.setToken(response.access_token);
    }
    
    return response;
  },

  /**
   * Reset user password
   */
  async resetPassword(password: string): Promise<TokenResponse> {
    return await apiClient.put<TokenResponse>(Endpoints.RESET_PASSWORD, { password });
  },
}