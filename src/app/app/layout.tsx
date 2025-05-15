import SignOutBtn from '@/components/App/SignOutBtn';
import Providers from '@/lib/Providers';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import PsyberAppWrapper from '@/components/App/PsyberAppWrapper';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <Providers>
      <div className="max-w-screen py-4 ">
        <div className="mx-auto flex h-full min-w-[300px] min-h-[80vh]">
          <div className="flex flex-col justify-between w-full">
            <nav className="sticky top-0 p-1  w-full">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <Image src="/mediBrain.png" alt="Meditating Brain" height={50} width={50} />
                  <span className="my-auto text-gray-600 font-bold">Psyber</span>
                </div>
                <SignOutBtn />
              </div>
            </nav>
            
            {/* Now PsyberAppWrapper will have access to the PsyberAuthProvider */}
            <PsyberAppWrapper>
              {children}
            </PsyberAppWrapper>
          </div>
        </div>
      </div>
    </Providers>
  );
}
