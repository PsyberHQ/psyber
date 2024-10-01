import Link from 'next/link';
import Image from 'next/image';

const Section5 = () => {
  return (
    <section className="px-[3vw] py-[25px] md:px-[4vw] md:py-[40px]">
      <h1 className="m-auto mb-[30px] w-[250px] text-center font-gloock text-2xl font-[600] leading-[31px] text-brand-darkbrown md:mb-[40px] md:w-[470px] md:text-[40px] md:leading-[47px]">
        How Psyber Makes Web3 Easy for You{' '}
      </h1>
      <div className="m-auto mb-[50px] w-fit">
        <Image
          src="/fiveSteps.png"
          alt="5 steps to get started"
          width={4696}
          height={1120}
          quality={100}
          className="hidden sm:block"
        />

        <Image
          src="/fiveStepsMobile.png"
          alt="5 steps to get started"
          width={1317}
          height={2353}
          quality={100}
          className="sm:hidden"
        />
      </div>

      <div className="m-auto w-fit">
        <Link href="/app">
          <button className="m-auto h-[40px] w-[125px] rounded-[42px] bg-gradient-to-br from-[#efbff6] to-[#731981] px-[14px] text-[14px] font-[700] text-white shadow-custom-light hover:bg-[#71177f] sm:text-[16px] md:h-[50px] md:w-[165px] md:text-[20px]">
            Get started?
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Section5;
