import Link from "next/link";

const Section5 = () => {
  return (
    <section className="md:px-[4vw] px-[3vw] md:pt-[40px] pt-[20px]">
      <h1 className="text-[40px] leading-[47px] w-[571px] m-auto text-center font-[600] text-brand-darkbrown mb-[40px]">
        How Psyber Makes Web3 Easy for You{" "}
      </h1>
      <div className="flex gap-[30px] justify-center items-center border-2 border-black h-[280px] mb-[50px]"></div>

      <div className="m-auto w-fit">
        <Link href="/">
          <button className="bg-[#BA68C8] m-auto w-[145px] h-[54px] text-[18px] rounded-[42px] text-white font-[700]  px-[14px] ">
            Get started?
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Section5;
