import Image from "next/image";
import Link from "next/link";

const Section3 = () => {
  return (
    <section className="md:px-[4vw] px-[3vw] md:pt-[60px] lg:pt-[70px] pt-[30px] pb-[30px] h-fit flex gap-[30px] justify-center items-center">
      <Image src="/sectionThreeImg.jpg" alt="Logo" width={550} height={550} />

      <div className="w-[550px] 2xl:w-[599px]">
        <h1 className="text-[40px] font-[600] leading-[44px] text-brand-darkbrown">
          Breathe Easy – Psyber Makes Web3 Learning Simple
        </h1>
        <br />
        <p className="leading-[19px] font-[400] text-brand-black">
          With Psyber, you don&rsquo;t need to worry about getting overwhelmed.
          We break down complex Web3 concepts into small, manageable tasks
          designed specifically for non-tech users
        </p>
        <br />
        <p className="leading-[19px] font-[400] text-brand-black">
          <span className="font-bold">Who is this for?</span> This is for
          everyone who wants to stay updated on Web3 technologies while
          prioritizing their mental health—teachers, lawyers, doctors,
          therapists, and anyone curious about the future of tech.
        </p>
        <br />
        <p className="leading-[19px] font-[400] text-brand-black">
          <span className="font-bold">Task-Based Learning:</span> Enjoy small,
          daily tasks that help you ease into Web3 at your own pace, without
          stress.
        </p>
        <br />
        <br />

        <div className="m-auto">
          <Link href="/">
            <button className="bg-[#BA68C8] m-auto w-[212px] h-[54px] text-[20px] rounded-[42px] text-white font-semibold  px-[14px] ">
              Start learning
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section3;
