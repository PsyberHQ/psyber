import Image from "next/image";
import Link from "next/link";

const Section1 = () => {
  return (
    <section className="relative md:px-[4vw] z-0 px-[3vw] bg-[#FEFCFFAB]  h-fit pb-12 pt-28">
      <Image
        src="/homeSection1Bg.jpeg"
        alt="Logo"
        layout="fill"
        className="absolute -z-10 object-fill opacity-40"
      />
      <div className="w-full h-fit grid grid-cols-2 gap-[30px]">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-[48px] font-[600] leading-[57px] text-brand-darkbrown">
            Feeling Lost in the Web3 Buzz? Don&rsquo;t Worry, We&rsquo;ve Got
            You
          </h1>
          <br />
          <p className="font-[400] text-[16px] leading-[23px] text-brand-darkbrown">
            Whether you&rsquo;re a professional or just someone who loves
            staying updated, Psyber helps you smoothly navigate Web3 while
            prioritizing your mental well-being
          </p>
          <br />

          <Link href="/">
            <button className="bg-brand-button-purple w-[212px] h-[58px] text-[20px] rounded-[42px] text-white font-semibold  px-4 ">
              Explore Psyber
            </button>
          </Link>
        </div>

        <div className="size-full">
          <Image src="/girl1.png" alt="Logo" width={850} height={900} />
        </div>
      </div>
    </section>
  );
};

export default Section1;
