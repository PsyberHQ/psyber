import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/User';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/app/login');
  const email = session?.user?.email;
  await dbConnect();
  const user = await UserModel.findOne({
    email,
  });
  if (!user?.badge || user?.badge === '') {
    redirect('/app/onboarding');
  }
  return (
    <>
      <div className="mb-4">
        <Image
          src="/mediBrain.png"
          alt="Meditating Brain"
          className="mx-auto h-36 w-36"
          height={972}
          width={1148}
        />
      </div>
      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        Welcome to Psyber , {session.user.name}
      </h1>
      <p className="mb-6 text-gray-600">Your journey to mastering web3 starts here!</p>
      <Image
        src={session?.user?.image}
        alt="user"
        width={372}
        height={472}
        className="mx-auto size-[100px] rounded-full"
      />
      <Link href="/app/quiz">
        <button className="mx-auto mt-10 flex w-fit max-w-xs items-center justify-center rounded-full bg-brand-button-purple px-4 py-2 font-semibold text-white hover:bg-[#933ba3]">
          Let{"'"}s Start 🚀
        </button>
      </Link>
    </>
  );
};

export default page;
