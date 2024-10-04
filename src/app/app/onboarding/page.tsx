import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession();
  return (
    <div className="p-20">
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
        Welcome to Psyber , {session?.user?.name}
      </h1>
      <p className="mb-6 text-center text-gray-600">Are you new to Web3 or already a pro?</p>
      <div className="flex justify-between">
        <div>
          <button className="mx-auto mt-10 flex w-fit max-w-xs items-center justify-center rounded-full border px-4 py-2 font-semibold text-slate-400 shadow-sm">
            I{"'"}m Existing Web3.0 User
          </button>
          <span className="mt-2 block text-center text-gray-400">comming soon !</span>
        </div>
        <Link href="/app/onboarding/new">
          <button className="mx-auto mt-10 flex w-fit max-w-xs items-center justify-center rounded-full bg-[#7047A3] px-4 py-2 shadow-md font-semibold text-white hover:bg-[#933ba3]">
            I{"'"}m New to Web3.0
          </button>
        </Link>
      </div>
    </div>
  );
};

export default page;
