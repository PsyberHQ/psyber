import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t-[3px] border-neutral-400  py-[30px] md:px-[4vw] px-[3vw]">
      <div className="flex justify-between gap-[30px] flex-wrap items-start">
        <div className="w-fit">
          <Image src="/footerLogo.jpg" alt="Logo" width={140} height={140} />
        </div>

        <div className="w-[100px]">
          <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] mb-[30px]">
            Why Psyber?
          </p>
          <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] mb-[30px]">
            How It works
          </p>
          <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] mb-[30px]">
            Features
          </p>
        </div>

        <div className="w-[100px]">
          <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] mb-[30px] ">
            Rewards
          </p>
          <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
            Counseling
          </p>
        </div>

        <div className="w-[110px]">
          <div className="text-left w-fit flex justify-center gap-2 items-center mb-[20px]">
            <Image
              src="/telegram.jpg"
              alt="Logo"
              width={97}
              height={97}
              className="size-[20px]"
            />

            <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
              Psyber
            </p>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <Image src="/twitter.jpg" alt="Logo" width={20} height={20} />
            <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
              PsyberHQ
            </p>
          </div>
        </div>

        <div className="w-fit">
          <div className="text-left w-fit flex justify-center gap-2 items-center mb-[20px]">
            <Image src="/phone.jpg" alt="Logo" width={22} height={22} />
            <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
              0987654321
            </p>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <Image src="/envelop.jpeg" alt="Logo" width={20} height={20} />
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

          <div className="w-[318px] p-2 rounded-[40px] border-2 border-neutral-500 flex gap-[10px] justify-between items-center">
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
