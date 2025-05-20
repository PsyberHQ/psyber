'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/lib/api/services/authService';
import { userService } from '@/lib/api/services/userService';
import { UserData } from '@/types/api';
import apiClient from '@/lib/api/client';
import { useRouter, usePathname } from 'next/navigation';

// Add this function at the top to handle localStorage safely
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (name: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  googleLogin: () => Promise<void>;
  clearError: () => void;
  debugState: any;
  onboardingComplete: boolean;
  setOnboardingComplete: (value: boolean) => void;
}

const PsyberAuthContext = createContext<AuthContextType | undefined>(undefined);

export function PsyberAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [debugState, setDebugState] = useState<any>({});
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false);
  const [redirectInProgress, setRedirectInProgress] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = apiClient.getToken();
    console.log("Initial auth check - Token exists:", !!token);
    
    // Also check localStorage for authentication state
    const storedAuthState = safeLocalStorage.getItem('psyber_authenticated') === 'true';
    const storedOnboardingState = safeLocalStorage.getItem('psyber_onboarding_complete') === 'true';
    
    if (token) {
      setIsAuthenticated(true);
      setOnboardingComplete(storedOnboardingState);
      refreshUser();
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, []);

  // Additional effect to handle redirects based on authentication state
  useEffect(() => {
    if (!loading && !redirectInProgress) {
      console.log("Auth state updated:", {
        isAuthenticated,
        pathname,
        userLevel: user?.level,
        onboardingComplete
      });
      
      if (isAuthenticated) {
        // Only redirect if we're on a login/signup page
        if (pathname === '/psyber-auth/login' || pathname === '/psyber-auth/signup') {
          // Prevent redirect loops by setting a flag
          setRedirectInProgress(true);
          
          if (user && !onboardingComplete && (!user.level || user.level === 0) && !user.is_onboarded) {
            console.log("Redirecting to onboarding");
            router.push('/psyber-auth/onboarding');
          } else {
            console.log("Redirecting to app");
            router.push('/app');
          }
          
          // Reset the flag after navigation
          setTimeout(() => {
            setRedirectInProgress(false);
          }, 1000);
        }
      }
    }
  }, [loading, isAuthenticated, user, pathname, router, onboardingComplete]);

  const clearError = () => {
    setError(null);
  };

  const refreshUser = async () => {
    try {
      setLoading(true);
      console.log("Refreshing user data");
      
      // Get stored onboarding status
      const storedOnboardingStatus = safeLocalStorage.getItem('psyber_onboarding_complete') === 'true';
      
      const userData = await userService.getCurrentUser();
      console.log("User data fetched:", !!userData);
      
      setUser(userData);
      setIsAuthenticated(true);
      safeLocalStorage.setItem('psyber_authenticated', 'true');
      setError(null);
      
      // Use the is_onboarded field directly and also check stored status
      const isOnboarded = !!userData?.is_onboarded || storedOnboardingStatus;
      setOnboardingComplete(isOnboarded);
      
      if (isOnboarded) {
        safeLocalStorage.setItem('psyber_onboarding_complete', 'true');
      }
      
      // Debug output to check what values are being used
      console.log("Onboarding check:", {
        badge: userData?.badge,
        init_quiz_result: !!userData?.init_quiz_result,
        level: userData?.level,
        is_onboarded: userData?.is_onboarded,
        stored_status: storedOnboardingStatus,
        result: isOnboarded
      });
      
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to refresh user';
      console.error("User refresh error:", errorMsg);
      setError(errorMsg);
      
      // Keep authentication if we have a token
      const hasToken = !!apiClient.getToken();
      if (!hasToken) {
        setUser(null);
        setIsAuthenticated(false);
        safeLocalStorage.removeItem('psyber_authenticated');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Attempting login with username:", username);
      
      // Update debug state
      setDebugState((prev: any) => ({
        ...prev,
        loginAttempt: {
          username,
          timestamp: new Date().toISOString()
        }
      }));
      
      // Login with the API
      const authResponse = await authService.login(username, password);
      console.log("Login success, token received:", !!authResponse.access_token);
      
      // Load user data
      await refreshUser();
      
      // Determine redirection based on user's onboarding status
      const userData = await userService.getCurrentUser();
      
      console.log("Determining redirect path based on level:", userData.level);
      
      // Update debug state
      setDebugState((prev: any) => ({
        ...prev,
        loginResult: {
          success: true,
          hasToken: !!authResponse.access_token,
          userLevel: userData.level,
          timestamp: new Date().toISOString()
        }
      }));
      
      if (!userData.level || userData.level === 0) {
        console.log("Redirecting to onboarding after login");
        router.push('/psyber-auth/onboarding');
      } else {
        console.log("Redirecting to app after login");
        router.push('/app');
      }
    } catch (err: any) {
      const errorMsg = err.message || 'Login failed. Please try again.';
      console.error("Login error:", errorMsg);
      setError(errorMsg);
      
      // Update debug state
      setDebugState((prev: any) => ({
        ...prev,
        loginError: {
          message: errorMsg,
          stack: err.stack,
          timestamp: new Date().toISOString()
        }
      }));
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, username: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Attempting signup for:", email);
      
      // Signup with the API
      await authService.signup({ name, username, email, password });
      console.log("Signup successful, proceeding to login");
      
      // Log in automatically after successful signup
      await authService.login(email, password);
      await refreshUser();
      
      console.log("Redirecting to onboarding after signup");
      router.push('/psyber-auth/onboarding');
    } catch (err: any) {
      const errorMsg = err.message || 'Signup failed. Please try again.';
      console.error("Signup error:", errorMsg);
      setError(errorMsg);
      
      // Update debug state
      setDebugState((prev: any) => ({
        ...prev,
        signupError: {
          message: errorMsg,
          stack: err.stack,
          timestamp: new Date().toISOString()
        }
      }));
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      console.log("Attempting logout");
      
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setOnboardingComplete(false);
      safeLocalStorage.removeItem('psyber_authenticated');
      safeLocalStorage.removeItem('psyber_onboarding_complete');
      router.push('/');
      
      console.log("Logout successful");
    } catch (err: any) {
      console.error("Logout error:", err.message);
    } finally {
      // Even if the API call fails, clear the token locally
      apiClient.clearToken();
      setLoading(false);
    }
  };

  // Set onboarding complete with localStorage persistence
  const setOnboardingCompleteWithStorage = (value: boolean) => {
    setOnboardingComplete(value);
    if (value) {
      safeLocalStorage.setItem('psyber_onboarding_complete', 'true');
    } else {
      safeLocalStorage.removeItem('psyber_onboarding_complete');
    }
  };

  return (
    <PsyberAuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        refreshUser,
        isAuthenticated,
        
        clearError,
        debugState,
        onboardingComplete,
        setOnboardingComplete: setOnboardingCompleteWithStorage
      }}
    >
      {children}
    </PsyberAuthContext.Provider>
  );
}

export const usePsyberAuth = () => {
  const context = useContext(PsyberAuthContext);
  if (context === undefined) {
    throw new Error('usePsyberAuth must be used within a PsyberAuthProvider');
  }
  return context;
};