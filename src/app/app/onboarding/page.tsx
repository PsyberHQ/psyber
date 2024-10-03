import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession();
  return (
    <>
        <div className='md:p-7 p-3'>
          <div className="md:mb-4 mb-1">
            <Image
              src="/mediBrain.png"
              alt="Meditating Brain"
              className="mx-auto h-36 w-36"
              height={972}
              width={1148}
            />
          </div>

          <div className='md:p-[4vw] p-[3vw]'>
              <h1 className="mb-2 md:text-3xl text-xl w-fit m-auto font-bold text-gray-800 text-center">
                Welcome to Psyber, {session?.user?.name}
              </h1>
              <p className="mb-6 text-center text-gray-600">Your journey to mastering web3 starts here!</p>
              <p className="mb-6 text-center text-gray-700 font-semibold">Are you new to Web3 or already a pro?</p>
            
              {/* <div className="flex justify-between border-2"> */}
                  <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 w-fit m-auto '>
                      <div>
                        <button className="mx-auto m-auto  flex w-fit max-w-xs items-center justify-center rounded-full px-6 border-[1px] border-neutral-600 py-2 md:text-base text-sm font-semibold text-neutral-600 hover:bg-purple-800 hover:text-white">
                          I'm an existing web 3.0 user
                        </button>
                        <div className='md:mt-2 mt-[3px] w-60 text-center'>
                          <em className=' text-neutral-500'>coming soon!</em>
                        </div>
                      </div>

                      <Link href="/app/onboarding/new">
                        <button className="mx-auto flex w-[240px]  max-w-xs items-center justify-center rounded-full bg-purple-600 px-6  py-2 md:text-base text-sm font-semibold text-white hover:bg-purple-800">
                          I'm new to Web 3.0
                        </button>
                      </Link>
                      </div>
                  {/* </div> */}
           </div>
        </div>
    </>
  );
};

export default page;
