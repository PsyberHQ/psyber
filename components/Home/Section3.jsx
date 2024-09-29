import Image from "next/image";
import Link from "next/link";

const Section3 = () => {
  return (
    <section className="md:px-[4vw] px-[3vw] md:pt-[60px] lg:pt-[70px] pt-[40px]  h-fit md:grid md:grid-cols-2 gap-4 items-center">
      <div className="flex flex-col flex-1 h-full  justify-end">
        <Image
          src="/sectionThreeImg.jpg"
          alt="Logo"
          width={550}
          height={550}
          className="md:m-0 m-auto order-1 max-md:pb-6 "
        />
      </div>

      <div className="text-left sm:mt-0 mt-[-20px] md:order-2 pb-6 md:pb-10">
        <h1 className="md:text-[40px] text-2xl font-gloock font-[600] md:leading-[44px] leading-[31px] text-brand-darkbrown">
          Breathe Easy – Psyber Makes Web3 Learning Simple
        </h1>
        <br />
        <p className="leading-[19px] font-[400] font-urbanist text-brand-black md:text-base text-sm">
          With Psyber, you don&rsquo;t need to worry about getting overwhelmed.
          We break down complex Web3 concepts into small, manageable tasks
          designed specifically for non-tech users
        </p>
        <br />
        <p className="leading-[19px] font-[400] font-urbanist text-brand-black md:text-base text-sm">
          <span className="font-bold">Who is this for?</span> This is for
          everyone who wants to stay updated on Web3 technologies while
          prioritizing their mental health—teachers, lawyers, doctors,
          therapists, and anyone curious about the future of tech.
        </p>
        <br />
        <p className="leading-[19px] font-[400] font-urbanist text-brand-black md:text-base text-sm">
          <span className="font-bold">Task-Based Learning:</span> Enjoy small,
          daily tasks that help you ease into Web3 at your own pace, without
          stress.
        </p>
        <br />

        <div className="m-auto w-fit">
          <Link href="/">
            <button className="button m-auto md:w-[200px] w-[140px] md:h-[50px] h-[40px] sm:text-[16px] text-[14px] md:text-[20px] rounded-[42px] text-white font-semibold  px-[14px] ">
              Start learning
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section3;
