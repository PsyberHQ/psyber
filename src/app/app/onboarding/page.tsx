import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession();
  return (
    <div className="xs:p-10 p-6 max-md:text-center md:p-20">
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
      <div className="mt-10 flex flex-wrap-reverse justify-between gap-4 max-sm:justify-center">
        <div>
          <button
            disabled
            className="mx-auto flex w-fit max-w-xs items-center justify-center rounded-full border px-4 py-2 font-semibold text-slate-400 shadow-sm"
          >
            I{"'"}m Existing Web3.0 User
          </button>
          <span className="mt-2 block text-center text-gray-400">coming soon !</span>
        </div>
        <Link href="/app/onboarding/new">
          <button className="purple-btn mx-auto flex w-fit">I{"'"}m New to Web3.0</button>
        </Link>
      </div>
    </div>
  );
};

export default page;
