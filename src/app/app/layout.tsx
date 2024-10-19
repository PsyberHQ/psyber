import ReturnBtn from '@/components/App/ReturnBtn';
import UserAvatar from '@/components/App/UserAvatar';
import WalletBtn from '@/components/WalletBtn';
import dbConnect from '@/lib/dbConnect';
import Providers from '@/lib/Providers';
import { UserModel } from '@/model/User';
import { WalletModel } from '@/model/Wallet';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  const email = session?.user?.email;
  await dbConnect();
  const user = await UserModel.findOne({
    email,
  });
  const userToken = user?.xp || 0;
  const userWallet = await WalletModel.findOne({
    user: user?._id,
  });

  return (
    <Providers>
      <nav className="fixed left-0 right-0 top-0 z-50 p-6">
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
              <button className="flex items-center justify-center gap-2 rounded-full bg-white py-2 pl-4 pr-6 text-sm font-semibold text-[#7047A3]">
                <Image
                  src="/coinIcon.png"
                  alt="Coin Image"
                  width={372}
                  height={472}
                  className="size-6 rounded-full"
                />
                {userToken || 0} Tokens
              </button>
              <UserAvatar session={session} />
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
      <div className="relative mb-[60px] mt-[120px] flex min-h-[calc(100dvh-180px)] items-center justify-center">
        <div className="max-h-full min-w-[60vw] max-w-[80%] overflow-hidden rounded-xl bg-white shadow-xl max-lg:max-w-[85%] max-md:max-w-[95%]">
          <div className="h-[calc(100dvh-180px)] max-h-full">{children}</div>
        </div>
      </div>
      <ReturnBtn />
    </Providers>
  );
}
