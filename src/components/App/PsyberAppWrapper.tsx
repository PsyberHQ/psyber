'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import LoaderComp from '@/components/LoaderComp';

interface PsyberAppWrapperProps {
  children: React.ReactNode;
}

export default function PsyberAppWrapper({ children }: PsyberAppWrapperProps) {
  const { user, loading, isAuthenticated, onboardingComplete } = usePsyberAuth();
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Not authenticated with Psyber API, let NextAuth handle it
        setChecking(false);
      } else if (!onboardingComplete && (!user?.level || user.level === 0)) {
        // User authenticated with Psyber API but hasn't completed onboarding
        router.push('/psyber-auth/onboarding');
      } else {
        // User is authenticated with Psyber API and has completed onboarding
        setChecking(false);
      }
    }
  }, [loading, isAuthenticated, user, router, onboardingComplete]);

  if (loading || checking) {
    return <LoaderComp text="Loading..." />;
  }

  return <>{children}</>;
}