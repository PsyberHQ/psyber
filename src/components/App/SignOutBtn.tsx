'use client';
import { signOut } from 'next-auth/react';

const SignOutBtn = () => {
  return (
    <button
      title="You better not click"
      className="flex w-fit max-w-xs items-center justify-center rounded-full bg-[#7047A3] px-4 py-2 font-semibold text-white hover:bg-[#933ba3]"
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  );
};

export default SignOutBtn;
