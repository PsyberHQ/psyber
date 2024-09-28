"use client";
import { signIn } from "next-auth/react";

const GoogleSignInBtn = () => {
  return (
    <button
      className="bg-brand-button-purple hover:bg-[#933ba3] text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center mx-auto w-fit max-w-xs mt-10"
      onClick={() => {
        signIn("google");
      }}
    >
      <img src="/googleLogo.png" alt="Google Logo" className="w-5 h-5 mr-2" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInBtn;
