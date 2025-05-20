import Image from 'next/image';
import Link from 'next/link';

const Section3 = () => {
  return (
    <section className="h-fit items-center gap-4 px-[3vw] pt-[40px] md:grid md:grid-cols-2 md:px-[4vw] md:pt-[60px] lg:pt-[70px]">
      <div className="flex h-full flex-1 flex-col justify-end">
        <Image
          src="/sectionThreeImg.png"
          alt="Logo"
          width={550}
          height={550}
          className="order-1 m-auto max-md:pb-6 md:m-0"
        />
      </div>

      <div className="mt-[-20px] pb-6 text-left sm:mt-0 md:order-2 md:pb-10">
        <h1 className="font-gliker text-2xl leading-[31px] text-brand-darkbrown md:text-[40px] md:leading-[44px]">
          Breathe Easy {'–'} Psyber Makes Web3 Learning Simple
        </h1>
        <br />
        <p className="font-urbanist text-sm font-[400] leading-[19px] text-brand-black md:text-base">
          With Psyber, you don&rsquo;t need to worry about getting overwhelmed. We break down
          complex Web3 concepts into small, manageable tasks designed specifically for non-tech
          users
        </p>
        <br />
        <p className="font-urbanist text-sm font-[400] leading-[19px] text-brand-black md:text-base">
          <span className="font-bold">Who is this for?</span> This is for everyone who wants to stay
          updated on Web3 technologies while prioritizing their mental health—teachers, lawyers,
          doctors, therapists, and anyone curious about the future of tech.
        </p>
        <br />
        <p className="font-urbanist text-sm font-[400] leading-[19px] text-brand-black md:text-base">
          <span className="font-bold">Task-Based Learning:</span> Enjoy small, daily tasks that help
          you ease into Web3 at your own pace, without stress.
        </p>
        <br />

        <div className="m-auto w-fit">
          <Link href="/app">
            <button className="button m-auto h-[40px] w-[140px] rounded-[42px] bg-gradient-to-br from-[#efbff6] to-[#731981] px-[14px] text-[14px] font-semibold text-white hover:bg-[#71177f] sm:text-[16px] md:h-[50px] md:w-[200px] md:text-[20px]">
              Start learning
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section3;
