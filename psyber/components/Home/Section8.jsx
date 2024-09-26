import Image from "next/image";
import Link from "next/link";

const Section8 = () => {
  return (
    <section className="md:px-[4vw] px-[3vw] md:pt-[40px] h-fit flex gap-[20px] justify-center items-center">
      <div className="max-w-[692px]">
        <h1 className="text-[40px] text-left font-[600] text-brand-darkbrown ">
          What&rsquo;s Next on Your Psyber Journey?
        </h1>
        <br />
        <div className="max-w-xl">
          <p className="text-[14px] font-[400] text-brand-darkbrown leading-[17px] mb-[25px]">
            Excited about learning Web3? We&rsquo;re not stopping here! Stay
            tuned for upcoming features designed for experienced Web3 users who
            want to handle the stress and challenges of Web3 trading and more
          </p>
          <p className="text-[14px] font-[400] text-brand-darkbrown leading-[17px] mb-[40px]">
            For those already in the Web3 world – you&rsquo;ll soon have access
            to games, stress-relief activities, and psychological assessments
            tailored to the unique pressures of Web3 trading.
          </p>

          <Link href="/">
            <button className="bg-[#BA68C8] m-auto w-fit h-[54px] text-[18px] rounded-[42px] text-white font-[700]  px-[22px] ">
              Sign up for early access
            </button>
          </Link>
        </div>
      </div>

      <Image src="/girl.png" alt="Logo" width={390} height={390} />
    </section>
  );
};

export default Section8;
