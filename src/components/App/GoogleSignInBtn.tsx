'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const GoogleSignInBtn = () => {
  return (
    <button
      className="mx-auto mt-10 flex w-fit max-w-xs items-center justify-center rounded-full bg-brand-button-purple px-4 py-2 font-semibold text-white hover:bg-[#933ba3]"
      onClick={() => {
        signIn('google');
      }}
    >
      <Image
        src="/googleLogo.png"
        alt="Google Logo"
        className="mr-2 h-5 w-5"
        height={72}
        width={72}
      />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInBtn;
