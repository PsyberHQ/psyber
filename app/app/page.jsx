import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect("/app/login");
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-lg p-20 pt-10 shadow-lg w-max  text-center">
        <div className="mb-4">
          <img
            src="/mediBrain.png"
            alt="Meditating Brain"
            className="mx-auto w-36 h-36"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to Psyber , {session.user.name}
        </h1>
        <p className="text-gray-600 mb-6">
          Your journey to mastering web3 starts here!
        </p>
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
