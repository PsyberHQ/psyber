import Image from "next/image";
import Link from "next/link";

const Section1 = () => {
  return (
    <section className="relative md:px-[4vw] z-0 px-[3vw] bg-[#FEFCFFAB]  h-fit pb-12 pt-28">
      <Image
        src="/homeSection1Bg.png"
        alt="Logo"
        layout="fill"
        className="absolute -z-10 object-fill opacity-40"
      />

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-2 items-center  md:mt-0 mt-[-10px]">
      <div className="">
        <h1 className=" text-2xl md:text-4xl lg:text-[48px] font-gloock font-[600]  sm:leading-[36px] md:leading-[48px] lg:leading-[57px] text-brand-darkbrown mb-[18px]">
          Feeling Lost in the Web3 Buzz? Don&rsquo;t Worry, We&rsquo;ve Got You
        </h1>

        <p className="sm:w-full w-[80%] font-[400] font-urbanist text-[12px] sm:text-sm md:text-base lg:leading-relaxed text-brand-darkbrown">
          Whether you&rsquo;re a professional or just someone who loves staying updated, Psyber helps you smoothly navigate Web3 while prioritizing your mental well-being.
        </p>
        <br />
        <Link href="/">
          <button className="shadow-custom-light bg-gradient-to-br from-[#efbff6] to-[#731981] w-[140px] md:w-[212px] h-[40px] md:h-[50px] sm:text-[16px] text-[14px] md:text-[20px] rounded-[32px] md:rounded-[42px] text-white font-semibold md:px-4 px-[10px] ">
            Explore Psyber
          </button>
        </Link>
      </div>

      <div className=" ">
        <Image
          src="/girl1.png"
          alt="Logo"
          width={850}
          height={900}
        />
      </div>
      </div>

    </section>
  );
};

export default Section1;
