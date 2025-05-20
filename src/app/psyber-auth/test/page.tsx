'use client';

import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TestAuthPage() {
  const { user, loading, error, isAuthenticated, logout } = usePsyberAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/psyber-auth/login');
    }
  }, [loading, isAuthenticated, router]);
  
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.push('/psyber-auth/login')}
          className="mt-4 rounded bg-purple-600 px-4 py-2 text-white"
        >
          Back to Login
        </button>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will be redirected by the useEffect
  }
  
  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Authentication Successful!</h1>
      
      <div className="mb-6 rounded bg-gray-100 p-4">
        <h2 className="mb-2 text-xl font-semibold">User Profile</h2>
        <pre className="overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      
      <button
        onClick={() => logout()}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}