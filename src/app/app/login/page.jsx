import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import GoogleSignInBtn from '@/components/App/GoogleSignInBtn';
import Image from 'next/image';

const Login = async () => {
  const session = await getServerSession();
  if (session) {
    redirect('/app');
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-max rounded-lg bg-white p-20 pt-10 text-center shadow-lg">
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

        <GoogleSignInBtn />

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
    </div>
  );
};

export default Login;
