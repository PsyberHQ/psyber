import Image from 'next/image';
import Link from 'next/link';

const Section8 = () => {
  return (
    <section className="py h-fit items-center gap-4 px-[3vw] md:grid md:grid-cols-10 md:px-[4vw] md:pt-[40px]">
      <div className="col-span-6 max-w-[692px]">
        <h1 className="text-center font-gloock text-2xl font-[600] leading-[31px] text-brand-darkbrown sm:text-left md:text-[40px] md:leading-[44px]">
          What&rsquo;s Next on Your Psyber Journey?
        </h1>
        <br />
        <div className="max-w-xl">
          <p className="mb-[25px] font-urbanist text-[14px] font-[400] leading-[17px] text-brand-darkbrown md:text-base">
            Excited about learning Web3? We&rsquo;re not stopping here! Stay tuned for upcoming
            features designed for experienced Web3 users who want to handle the stress and
            challenges of Web3 trading and more
          </p>
          <p className="mb-[30px] font-urbanist text-[14px] font-[400] leading-[17px] text-brand-darkbrown md:mb-[40px] md:text-base">
            For those already in the Web3 world {'–'} you&rsquo;ll soon have access to games,
            stress-relief activities, and psychological assessments tailored to the unique pressures
            of Web3 trading.
          </p>

          <Link href="/app">
            <button className="m-auto mb-[28px] h-[40px] w-[220px] rounded-[42px] bg-gradient-to-br from-[#efbff6] to-[#731981] px-[22px] text-[14px] font-[700] text-white shadow-custom-light hover:bg-[#71177f] sm:text-[15px] md:h-[50px] md:w-[268px] md:text-[18px]">
              Sign up for early access
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-hidden md:col-span-4">
        <Image
          src="/girl.png"
          alt="Logo"
          width={864}
          height={1230}
          className="h-[500px] object-contain max-md:max-h-[400px] sm:mt-0"
        />
      </div>
    </section>
  );
};

export default Section8;
