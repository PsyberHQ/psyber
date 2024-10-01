import SignOutBtn from '@/components/App/SignOutBtn';
import Footer from '@/components/Home/Footer';
import Providers from '@/lib/Providers';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <Providers>
      <nav className="fixed left-0 right-0 top-0 p-8">
        <div className="flex items-center justify-between">
          <div className="h-fit w-fit">
            <Link href="/">
              <Image
                src="/logoName.png"
                alt=" Psyber Logo"
                width={372}
                height={472}
                className="size-12 w-fit object-contain"
              />
            </Link>
          </div>
          {session && <SignOutBtn />}
        </div>
      </nav>
      <div
        className="fixed inset-0 -z-10 min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.jpeg')",
        }}
      ></div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="my-28 aspect-video w-max min-w-[512px] rounded-lg bg-white p-20 shadow-xl">
          {children}
        </div>
      </div>
      <Footer />
    </Providers>
  );
}
