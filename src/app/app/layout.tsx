import SignOutBtn from '@/components/App/SignOutBtn';
import WalletBtn from '@/components/WalletBtn';
import dbConnect from '@/lib/dbConnect';
import Providers from '@/lib/Providers';
import { UserModel } from '@/model/User';
import { WalletModel } from '@/model/Wallet';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  const email = session?.user?.email;
  await dbConnect();
  const user = await UserModel.findOne({
    email,
  });
  // const userLevel = user?.level || 0;
  const userToken = user?.xp || 0;
  const userWallet = await WalletModel.findOne({
    user: user?._id,
  });
  console.log('userWallet', userWallet);

  return (
    <Providers>
      <nav className="fixed left-0 right-0 top-0 z-50 p-8">
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
          {session && (
            <div className="flex items-center justify-center gap-4">
              {userWallet && <WalletBtn />}
              <button className="flex gap-2 rounded-full bg-white py-2 pl-4 pr-6 text-sm font-semibold text-[#7047A3]">
                <Image
                  src="/coinIcon.png"
                  alt="Coin Image"
                  width={372}
                  height={472}
                  className="size-6 rounded-full"
                />
                {userToken || 0} Tokens
              </button>
              <details className="relative mr-4">
                <summary className="flex size-14 cursor-pointer items-center">
                  <Image
                    title="This is Your Profile Image"
                    src={session?.user?.image || ''}
                    alt="user"
                    width={372}
                    height={472}
                    className="rounded-full"
                  />
                </summary>
                <div className="absolute -bottom-12 left-1/2 w-max -translate-x-1/2">
                  <SignOutBtn />
                </div>
              </details>
            </div>
          )}
        </div>
      </nav>
      <div
        className="fixed inset-0 -z-10 min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.jpeg')",
        }}
      ></div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="overflow-hidden rounded-lg bg-white shadow-xl">{children}</div>
      </div>
    </Providers>
  );
}
