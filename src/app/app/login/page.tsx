'use client';

import { useRouter } from 'next/navigation';
import GoogleSignInBtn from '@/components/App/GoogleSignInBtn';
import Image from 'next/image';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import { useEffect } from 'react';
import Link from 'next/link';

const Login = () => {
  const { isAuthenticated, onboardingComplete } = usePsyberAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (isAuthenticated) {
      if (!onboardingComplete) {
        router.push('/psyber-auth/onboarding');
      } else {
        router.push('/app');
      }
    }
  }, [isAuthenticated, onboardingComplete, router]);
  
  return (
    <div className="flex flex-col md:p-[4vw] p-[3vw] pb-10 items-center justify-center text-center">
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
      <p className="mb-6 text-gray-600 w-fit m-auto">Your journey to mastering web3 starts here!</p>

      <div className="mb-6 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
        <p className="mb-2">
          Use our Psyber authentication system:
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/psyber-auth/login">
            <button className="rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
              Login
            </button>
          </Link>
          <Link href="/psyber-auth/signup">
            <button className="rounded-md border border-blue-600 px-3 py-1 text-blue-600 hover:bg-blue-50">
              Sign up
            </button>
          </Link>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-gray-500">
        By signing up, you agree to our{' '}
        <a href="/terms" className="text-purple-600 underline">
          terms of service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-purple-600 underline">
          privacy policy
        </a>
      </p>
    </div>
  );
};

export default Login;
