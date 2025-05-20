'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/lib/api/services/authService';
import { userService } from '@/lib/api/services/userService';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import Image from 'next/image';
import LoaderComp from '@/components/LoaderComp';

export default function GoogleCallbackPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = usePsyberAuth();
  
  useEffect(() => {
    const code = searchParams.get('code');
    
    if (!code) {
      setError('No authentication code provided');
      setLoading(false);
      return;
    }
    
    // Handle the Google callback
    const handleCallback = async () => {
      try {
        await authService.handleGoogleCallback(code);
        await refreshUser();
        
        // Check if the user needs onboarding
        const userData = await userService.getCurrentUser();
        
        if (!userData.level || userData.level === 0) {
          router.push('/psyber-auth/onboarding');
        } else {
          router.push('/app');
        }
      } catch (err: any) {
        console.error('Google authentication error:', err);
        setError('Failed to authenticate with Google. Please try again.');
        setLoading(false);
      }
    };
    
    handleCallback();
  }, [searchParams, router, refreshUser]);
  
  if (loading) {
    return <LoaderComp text="Completing your Google sign-in..." />;
  }
  
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="mb-4">
          <Image
            src="/mediBrain.png"
            alt="Meditating Brain"
            className="mx-auto h-24 w-24"
            height={972}
            width={1148}
          />
        </div>
        <div className="rounded-md bg-red-50 p-4 text-red-700">
          <h2 className="mb-2 text-xl font-semibold">Authentication Error</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push('/psyber-auth/login')}
            className="mt-4 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }
  
  return <LoaderComp text="Redirecting..." />;
}