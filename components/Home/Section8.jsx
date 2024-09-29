import Image from "next/image";
import Link from "next/link";

const Section8 = () => {
  return (
    <section className="md:px-[4vw] px-[3vw] py md:pt-[40px] h-fit md:grid md:grid-cols-10  gap-4 items-center ">
      <div className="max-w-[692px] col-span-6">
        <h1 className="md:text-[40px] text-2xl font-gloock font-[600] text-brand-darkbrown md:leading-[44px] leading-[31px] sm:text-left text-center">
          What&rsquo;s Next on Your Psyber Journey?
        </h1>
        <br />
        <div className="max-w-xl">
          <p className="md:text-base text-[14px] font-[400] font-urbanist text-brand-darkbrown leading-[17px] mb-[25px]">
            Excited about learning Web3? We&rsquo;re not stopping here! Stay
            tuned for upcoming features designed for experienced Web3 users who
            want to handle the stress and challenges of Web3 trading and more
          </p>
          <p className="md:text-base text-[14px] font-[400] font-urbanist text-brand-darkbrown leading-[17px] md:mb-[40px] mb-[30px]">
            For those already in the Web3 world – you&rsquo;ll soon have access
            to games, stress-relief activities, and psychological assessments
            tailored to the unique pressures of Web3 trading.
          </p>

          <Link href="/">
            <button className="shadow-custom-light bg-gradient-to-br from-[#efbff6] to-[#731981] m-auto md:w-[268px] w-[220px] md:h-[50px] h-[40px] sm:text-[15px] text-[14px] md:text-[18px] rounded-[42px] text-white font-[700]  px-[22px] mb-[28px]">
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
          className="sm:mt-0 object-contain max-md:max-h-[400px] h-[500px] "
        />
      </div>
    </section>
  );
};

export default Section8;
