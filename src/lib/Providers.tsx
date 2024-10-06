'use client';
import { Wallet } from '@/components/Wallet';
import { SessionProvider } from 'next-auth/react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Wallet>{children}</Wallet>
    </SessionProvider>
  );
};

export default Providers;
