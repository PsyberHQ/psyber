'use client';

import { useState } from 'react';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function PsyberSignupPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  
  const { signup, loading, error, googleLogin } = usePsyberAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setSignupError("Passwords don't match");
      return;
    }
    
    try {
      await signup(name, username, email, password);
      router.push('/app'); // Redirect to dashboard after successful signup
    } catch (err: any) {
      setSignupError(err.message || 'Signup failed. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      // The redirect is handled by the googleLogin function
    } catch (err: any) {
      setSignupError(err.message || 'Google login failed. Please try again.');
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
      
      <h1 className="mb-2 text-3xl font-bold text-gray-800">Create Your Psyber Account</h1>
      <p className="mb-6 text-gray-600">Join us on your journey to mastering web3!</p>
      
      <div className="w-full max-w-md">
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              required
            />
          </div>
          
          {(signupError || error) && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
              {signupError || error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:bg-purple-300"
          >
            {loading ? 'Creating account...' : 'Sign up'}
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
            Sign up with Google
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/psyber-auth/login" className="font-medium text-purple-600 hover:text-purple-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}