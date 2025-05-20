'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/lib/api/services/authService';
import { userService } from '@/lib/api/services/userService';
import { UserData } from '@/types/api';
import apiClient from '@/lib/api/client';
import { useRouter, usePathname } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = apiClient.getToken();
    console.log("Initial auth check - Token exists:", !!token);
    
    if (token) {
      refreshUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Additional effect to handle redirects based on authentication state
  useEffect(() => {
    if (!loading) {
      console.log("Auth state updated:", {
        isAuthenticated,
        pathname,
        userLevel: user?.level,
        onboardingComplete
      });
      
      if (isAuthenticated) {
        // If user is authenticated and tries to access login/signup pages, redirect to app
        if (pathname === '/psyber-auth/login' || pathname === '/psyber-auth/signup') {
          if (user && !onboardingComplete && (!user.level || user.level === 0)) {
            console.log("Redirecting to onboarding");
            router.push('/psyber-auth/onboarding');
          } else {
            console.log("Redirecting to app");
            router.push('/app');
          }
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
      
      const userData = await userService.getCurrentUser();
      console.log("User data fetched:", !!userData);
      
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);
      
      // Check if user has completed the quiz
      // If they have a badge or any other identifier that shows onboarding completion
      if (userData?.badge || userData?.onboardingCompleted) {
        setOnboardingComplete(true);
      }
      
      // Update debug state
      setDebugState(prev => ({
        ...prev,
        lastRefresh: new Date().toISOString(),
        userLevel: userData?.level,
        userId: userData?.id,
        onboardingComplete: !!userData?.badge || !!userData?.onboardingCompleted
      }));
      
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to refresh user';
      console.error("User refresh error:", errorMsg);
      setError(errorMsg);
      setUser(null);
      setIsAuthenticated(false);
      apiClient.clearToken();
      
      // Update debug state
      setDebugState(prev => ({
        ...prev,
        lastError: errorMsg,
        errorTimestamp: new Date().toISOString()
      }));
      
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
      setDebugState(prev => ({
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
      setDebugState(prev => ({
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
      setDebugState(prev => ({
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
      setDebugState(prev => ({
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

  const googleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Redirect to Google login page
      console.log("Redirecting to Google login");
      window.location.href = `${apiClient.getBaseUrl()}${authService.getGoogleLoginUrl()}`;
    } catch (err: any) {
      const errorMsg = err.message || 'Google login failed. Please try again.';
      console.error("Google login error:", errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
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
        googleLogin,
        clearError,
        debugState,
        onboardingComplete,
        setOnboardingComplete // Allow components to update this state
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