'use client';

import { PsyberAuthProvider } from '@/contexts/PsyberAuthContext';

export default function PsyberAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PsyberAuthProvider>
      <div className="flex min-h-screen items-center justify-center">
        <div className="my-28 w-max rounded-lg bg-white shadow-xl">
          {children}
        </div>
      </div>
    </PsyberAuthProvider>
  );
}