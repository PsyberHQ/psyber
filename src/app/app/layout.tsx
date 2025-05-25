import ReturnBtn from '@/components/App/ReturnBtn';
import UserAvatar from '@/components/App/UserAvatar';
import WalletBtn from '@/components/WalletBtn';
import dbConnect from '@/lib/dbConnect';
import Providers from '@/lib/Providers';
import Image from 'next/image';
import Link from 'next/link';
import PsyberAppWrapper from '@/components/App/PsyberAppWrapper';
import SignOutBtn from '@/components/SignOutBtn';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Providers>
        <PsyberAppWrapper>
          <div className="flex min-h-screen flex-col">
            <header className="flex items-center justify-between bg-white p-4 shadow-md">
              <div className="flex items-center space-x-4">
                <Image
                  src="/mediBrain.png"
                  width={40}
                  height={40}
                  alt="Psyber Logo"
                />
                <h1 className="text-2xl font-bold">PSYBER</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/app">Dashboard</Link>
                <Link href="/app/tasks">Tasks</Link>
                <Link href="/app/learn">Learn</Link>
                <SignOutBtn />
              </div>
            </header>
            <div className="flex flex-1 flex-col p-4">
              {children}
            </div>
          </div>
        </PsyberAppWrapper>
      </Providers>
    </main>
  );
}
