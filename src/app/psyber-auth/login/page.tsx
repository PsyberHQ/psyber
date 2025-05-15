'use client';

import { useState, useEffect } from 'react';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function PsyberLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const { login, loading, error, googleLogin } = usePsyberAuth();
  const router = useRouter();

  // For debugging
  useEffect(() => {
    if (error) {
      console.error("Auth context error:", error);
      setLoginError(error);
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Attempting login with:", username);
      setDebugInfo(null);
      
      await login(username, password);
      
      // If we get here without redirecting, something is wrong
      console.warn("Login completed but no redirect occurred");
      setDebugInfo({
        message: "Login API call completed but no redirect occurred",
        username,
        timestamp: new Date().toISOString()
      });
      
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage = err.message || 'Login failed. Please try again.';
      setLoginError(errorMessage);
      
      // Capture more debug info
      setDebugInfo({
        error: errorMessage,
        stack: err.stack,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Attempting Google login");
      await googleLogin();
    } catch (err: any) {
      console.error("Google login error:", err);
      setLoginError(err.message || 'Google login failed. Please try again.');
      setDebugInfo({
        error: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-[4vw]">
      <div className="mb-4">
        <Image
          src="/mediBrain.png"
          alt="Meditating Brain"
          className="mx-auto h-36 w-36"
          height={972}
          width={1148}
        />
      </div>
      
      <h1 className="mb-2 text-3xl font-bold text-gray-800">Welcome to Psyber</h1>
      <p className="mb-6 text-gray-600">Your journey to mastering web3 starts here!</p>
      
      <div className="w-full max-w-md">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              required
            />
          </div>
          
          {loginError && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
              <div className="font-bold">Error:</div>
              <div>{loginError}</div>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:bg-purple-300"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-gray-700 shadow-md hover:bg-gray-50 disabled:opacity-50"
          >
            <Image 
              src="/googleLogo.png" 
              alt="Google Logo" 
              width={20} 
              height={20} 
            />
            Sign in with Google
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/psyber-auth/signup" className="font-medium text-purple-600 hover:text-purple-500">
              Sign up
            </Link>
          </p>
        </div>

        {/* Debug Information Display */}
        {debugInfo && (
          <div className="mt-8 rounded-md bg-gray-100 p-3 text-xs">
            <div className="font-bold">Debug Information:</div>
            <pre className="mt-1 overflow-auto max-h-40">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}