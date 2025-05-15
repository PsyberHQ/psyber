'use client';
import { SessionProvider } from 'next-auth/react';
import { PsyberAuthProvider } from '@/contexts/PsyberAuthContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider session={null}>
      <PsyberAuthProvider>{children}</PsyberAuthProvider>
    </SessionProvider>
  );
};

export default Providers;
