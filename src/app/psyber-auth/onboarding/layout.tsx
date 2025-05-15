'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import LoaderComp from '@/components/LoaderComp';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = usePsyberAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.level && user.level > 0) {
      // User has already completed onboarding
      router.push('/app');
    }
  }, [loading, user, router]);

  if (loading) {
    return <LoaderComp text="Loading..." />;
  }

  return <>{children}</>;
}