'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import LoaderComp from '@/components/LoaderComp';

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
  const { user, loading, isAuthenticated } = usePsyberAuth();
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Not authenticated, redirect to login
        router.push('/psyber-auth/login');
      } else if (requireOnboarding && (!user?.level || user.level === 0)) {
        // User hasn't completed onboarding, redirect to onboarding
        router.push('/psyber-auth/onboarding');
      } else {
        // User is authenticated and has completed onboarding if required
        setChecking(false);
      }
    }
  }, [loading, isAuthenticated, user, router, requireOnboarding]);

  if (loading || checking) {
    return <LoaderComp text="Loading..." />;
  }

  return <>{children}</>;
}