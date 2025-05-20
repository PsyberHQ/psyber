'use client';
import { PsyberAuthProvider } from '@/contexts/PsyberAuthContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <PsyberAuthProvider>{children}</PsyberAuthProvider>;
};

export default Providers;
