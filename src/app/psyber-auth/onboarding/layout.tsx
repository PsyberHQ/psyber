'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import LoaderComp from '@/components/LoaderComp';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, onboardingComplete } = usePsyberAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If user has completed onboarding, redirect to app
      if (onboardingComplete || user?.is_onboarded) {
        console.log("User has completed onboarding, redirecting to app");
        router.push('/app');
      }
    }
  }, [loading, user, router, onboardingComplete]);

  if (loading) {
    return <LoaderComp text="Loading..." />;
  }

  return <>{children}</>;
}