'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const GoogleSignInBtn = () => {
  return (
    <button
      className="mx-auto mt-10 w-fit purple-btn"
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
