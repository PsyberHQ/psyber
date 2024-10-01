import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect('/app/login');
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-max rounded-lg bg-white p-20 pt-10 text-center shadow-lg">
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
      </div>
    </div>
  );
};

export default page;
