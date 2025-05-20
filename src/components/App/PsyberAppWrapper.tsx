'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import LoaderComp from '@/components/LoaderComp';
import apiClient from '@/lib/api/client';

export default function PsyberAppWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated, onboardingComplete } = usePsyberAuth();
  const [checking, setChecking] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !redirecting) {
      const hasToken = !!apiClient.getToken();
      const hasLocalOnboarding = typeof window !== 'undefined' && localStorage.getItem('psyber_onboarding_complete') === 'true';
      
      // Don't redirect if we're already on a login page
      const isLoginPage = pathname === '/app/login' || 
                         pathname === '/psyber-auth/login' || 
                         pathname === '/psyber-auth/signup';
      
      // Special case for /app route
      if (pathname === '/app' && !isAuthenticated && !hasToken) {
        console.log("PsyberAppWrapper: Not authenticated at /app, redirecting to login");
        setRedirecting(true);
        router.push('/psyber-auth/login');
        return;
      }
      
      // Check if this is a task detail page
      const isTaskPage = pathname.startsWith('/app/task/');
      
      // Never redirect away from login pages
      if (isLoginPage) {
        setChecking(false);
        return;
      }
      
      if (!isAuthenticated && !hasToken && !isLoginPage) {
        // Not authenticated and not on login page, redirect to login
        console.log("PsyberAppWrapper: Not authenticated, redirecting to login");
        setRedirecting(true);
        router.push('/psyber-auth/login');
      } else if (isAuthenticated && !onboardingComplete && !hasLocalOnboarding && 
                (!user?.level || user?.level === 0) && !user?.is_onboarded && 
                !pathname?.includes('/onboarding') && !isTaskPage) {
        // User authenticated but hasn't completed onboarding
        console.log("PsyberAppWrapper: Not onboarded, redirecting to onboarding");
        setRedirecting(true);
        router.push('/psyber-auth/onboarding');
      } else {
        // User is authenticated with Psyber API and has completed onboarding
        console.log("PsyberAppWrapper: Authenticated and onboarded, setting checking to false");
        setChecking(false);
      }
    }
  }, [loading, isAuthenticated, user, router, onboardingComplete, pathname]);

  if (loading || checking) {
    return <LoaderComp text="Loading..." />;
  }

  return <>{children}</>;
}