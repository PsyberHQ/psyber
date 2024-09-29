import Link from "next/link";
import Image from "next/image";

const Section5 = () => {
  return (
    <section className="md:px-[4vw] px-[3vw] md:py-[40px] py-[25px]">
      <h1 className="md:text-[40px] text-2xl md:leading-[47px] leading-[31px] md:w-[470px] w-[250px] m-auto text-center font-gloock font-[600] text-brand-darkbrown md:mb-[40px] mb-[30px]">
        How Psyber Makes Web3 Easy for You{" "}
      </h1>
      <div className="w-fit mb-[50px] m-auto">
        <Image 
           src="/fiveSteps.png" 
           alt="5 steps to get started" 
           width={4696} 
           height={1120}
           quality={100}
           className="sm:block hidden"
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
        <Link href="/">
          <button className="shadow-custom-light bg-gradient-to-br from-[#efbff6] to-[#731981] m-auto md:w-[165px] w-[125px] md:h-[50px] h-[40px] sm:text-[16px] text-[14px] md:text-[20px] rounded-[42px] text-white font-[700]  px-[14px] ">
            Get started?
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Section5;
