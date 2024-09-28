import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t-[3px] border-neutral-400 mt-[-17px] py-[30px] md:px-[4vw] px-[3vw]">
      <div className="flex justify-between md:gap-[30px] gap-[24px] flex-wrap items-start">
        <div className="">
          <Image 
            src="/footerLogo.jpg" 
            alt="Logo" 
            width={140} 
            height={140} 
            className="h-[60px] md:h-[90px] lg:h-[110px] w-[60px] md:w-[90px] lg:w-[110px]"
            />
        </div>

        <div className="w-[100px]">
          <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] sm:mb-[30px] mb-[15px]">
            Why Psyber?
          </p>
          <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] sm:mb-[30px] mb-[15px]">
            How It works
          </p>
          <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] sm:mb-[30px] mb-[15px]">
            Features
          </p>
        </div>

        <div className="w-[100px]">
          <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] sm:mb-[30px] mb-[15px] ">
            Rewards
          </p>
          <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
            Counseling
          </p>
        </div>

        <div className="w-[110px]">
          <div className="text-left w-fit flex justify-center gap-2 items-center sm:mb-[20px] mb-[10px]">
            <Image src="/telegram.jpg" alt="Logo" width={1022} height={1022}  className="size-[28px]"/>
            <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
              Psyber
            </p>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <Image src="/twitter.jpg" alt="Logo" width={1022} height={1022} className="size-[20px]"/>
            <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
              PsyberHQ
            </p>
          </div>
        </div>

        <div className="w-fit">
          <div className="text-left w-fit flex justify-center gap-2 items-center sm:mb-[20px] mb-[10px]">
            <Image src="/phone.png" alt="Logo" width={1022} height={1022} className="size-[22px]"/>
            <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
              0987654321
            </p>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <Image src="/envelop.jpeg" alt="Logo" width={1022} height={1022} className="h-[22px] w-[26px]"/>
            <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
              psyber@psyber
            </p>
          </div>
        </div>

        <div className="w-[320px]">
          <p className="mb-[30px] font-[700]">
            Join our mailing list for your weekly dose of wellness and Web3
            innovation.
          </p>

          <div className="md:w-[318px] w-[280px] h-[50px] md:h-[55px]  md:p-2 p-[5px] rounded-[40px] border-2 border-neutral-500 flex gap-[10px] justify-between items-center">
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter your email"
              className="outline-none pl-2"
            />
            <button className="bg-brand-button-purple hover:bg-[#933ba3] w-[90px] h-[40px] md:text-[18px] text-[15px] rounded-[42px] text-white font-semibold  px-[2px]">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
