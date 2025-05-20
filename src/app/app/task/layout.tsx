'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import LoaderComp from '@/components/LoaderComp';

export default function TaskLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = usePsyberAuth();
  const router = useRouter();

  useEffect(() => {
    // Only perform check after loading
    if (!loading && !isAuthenticated) {
      console.log("Task layout: Not authenticated, redirecting to login");
      router.push('/psyber-auth/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <LoaderComp text="Loading..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      {children}
    </div>
  );
}
