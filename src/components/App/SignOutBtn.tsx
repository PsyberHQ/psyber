'use client';
import { signOut } from 'next-auth/react';

const SignOutBtn = () => {
  return (
    <button
      className="flex w-fit max-w-xs items-center justify-center rounded-full bg-brand-button-purple px-4 py-2 font-semibold text-white hover:bg-[#933ba3]"
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  );
};

export default SignOutBtn;
