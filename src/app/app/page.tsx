'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import LoaderComp from '@/components/LoaderComp';
import TaskParent from '@/components/App/TaskParent';

export default function AppPage() {
  const { user, loading, isAuthenticated, onboardingComplete } = usePsyberAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  // Debug log to see what's happening
  useEffect(() => {
    console.log("App page rendered with auth state:", { isAuthenticated, onboardingComplete });
  }, [isAuthenticated, onboardingComplete]);

  useEffect(() => {
    // Only run checks once auth context has loaded
    if (!loading) {
      if (!isAuthenticated) {
        // Not authenticated, redirect to login
        console.log("App page: Not authenticated, redirecting to login");
        router.push('/psyber-auth/login');
      } else if (!onboardingComplete && (!user?.level || user?.level === 0) && !user?.is_onboarded) {
        // Not onboarded, redirect to onboarding
        console.log("App page: Not onboarded, redirecting to onboarding");
        router.push('/psyber-auth/onboarding');
      } else {
        // Authentication and onboarding checks passed
        setPageLoading(false);
      }
    }
  }, [loading, isAuthenticated, onboardingComplete, user, router]);

  if (loading || pageLoading) {
    return <LoaderComp text="Loading dashboard..." />;
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">Welcome to Psyber, {user?.name || 'User'}!</h1>
        <p className="text-gray-600">
          Your journey to mastering web3 starts here. Here are your tasks:
        </p>
      </div>
      
      <div className="grid h-full max-h-[70vh] xl:min-w-[60vw] min-w-full xl:max-w-[80vw] md:max-w-[95vw] grid-cols-10 overflow-scroll hide-scrollbar">
        <div className="col-span-10">
          <TaskParent />
        </div>
      </div>
    </div>
  );
}
