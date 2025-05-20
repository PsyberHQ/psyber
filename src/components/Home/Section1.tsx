import Image from 'next/image';
import Link from 'next/link';

const Section1 = () => {
  return (
    <section className="relative z-0 h-fit pl-[3vw] pt-28 md:pl-8">
      <Image
        src="/homeSection1Bg.png"
        alt="Logo"
        className="absolute -z-10 object-fill opacity-40"
        fill={true}
      />

      <div className="h-fit w-full items-center gap-2 md:grid md:grid-cols-2">
        <div className="mb-4">
          <h1 className="font-gliker mb-[18px] text-3xl text-brand-darkbrown sm:leading-[36px] md:text-4xl md:leading-[48px] lg:text-[48px] lg:leading-[57px]">
            Feeling Lost in the Web3 Buzz? Don&rsquo;t Worry, We&rsquo;ve Got You
          </h1>

          <p className="w-[80%] font-urbanist text-[14px] font-[400] text-brand-darkbrown sm:w-full sm:text-sm md:text-base lg:leading-relaxed">
            Whether you&rsquo;re a professional or just someone who loves staying updated, Psyber
            helps you smoothly navigate Web3 while prioritizing your mental well-being.
          </p>
          <br />
          <Link href="/app">
            <button className="button h-[40px] w-[140px] rounded-[32px] px-[10px] text-[14px] font-semibold text-white hover:bg-[#71177f] sm:text-[16px] md:h-[50px] md:w-[212px] md:rounded-[42px] md:px-4 md:text-[20px]">
              Explore Psyber
            </button>
          </Link>
        </div>

        <div className="">
          <Image
            src="/girl1.png"
            alt="Logo"
            width={850}
            height={900}
            className="object-contain max-md:max-h-[400px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Section1;
