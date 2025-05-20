'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import LoaderComp from '@/components/LoaderComp';
import apiClient from '@/lib/api/client';

interface PsyberRouteGuardProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

/**
 * Route guard component for Psyber API authenticated routes
 * @param requireOnboarding If true, redirects users who haven't completed onboarding
 */
export default function PsyberRouteGuard({ 
  children, 
  requireOnboarding = true 
}: PsyberRouteGuardProps) {
  const { user, loading, isAuthenticated, onboardingComplete } = usePsyberAuth();
  const [checking, setChecking] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !redirecting) {
      // Get token as a fallback check
      const hasToken = !!apiClient.getToken();
      const hasLocalOnboarding = typeof window !== 'undefined' && localStorage.getItem('psyber_onboarding_complete') === 'true';
      
      if (!isAuthenticated && !hasToken) {
        // Not authenticated, redirect to login
        console.log("PsyberRouteGuard: Not authenticated, redirecting to login");
        setRedirecting(true);
        router.push('/psyber-auth/login');
      } else if (requireOnboarding && !onboardingComplete && !hasLocalOnboarding) {
        // User hasn't completed onboarding, redirect to onboarding
        console.log("PsyberRouteGuard: Not onboarded, redirecting to onboarding");
        setRedirecting(true);
        router.push('/psyber-auth/onboarding');
      } else {
        // User is authenticated and has completed onboarding if required
        console.log("PsyberRouteGuard: Authenticated and onboarded, setting checking to false");
        setChecking(false);
      }
    }
  }, [loading, isAuthenticated, user, router, requireOnboarding, onboardingComplete]);

  if (loading || checking) {
    return <LoaderComp text="Loading..." />;
  }

  return <>{children}</>;
}