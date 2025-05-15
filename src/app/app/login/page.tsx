import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import GoogleSignInBtn from '@/components/App/GoogleSignInBtn';
import Image from 'next/image';
import AuthSwitcher from '@/components/App/AuthSwitcher';

const Login = async () => {
  const session = await getServerSession();
  if (session) {
    redirect('/app');
  }
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

      <AuthSwitcher />
      
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
  );
};

export default Login;
