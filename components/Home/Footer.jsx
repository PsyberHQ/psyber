import { Linden_Hill } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t-[3px] bg-white  border-neutral-400  py-[30px] md:px-[4vw] px-[3vw]">
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
             <a href="https://t.me/PsyberHQ">
                <Image
                  src="/telegram.jpg"
                  alt="Logo"
                  width={1022}
                  height={1022}
                  className="size-[28px]"
                />
              </a>
            <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
              Psyber
            </p>
          </div>

          <div className="flex justify-center gap-2 items-center">
              <a href="https://t.me/PsyberHQ"> 
                <Image
                  src="/twitter.png"
                  alt="Logo"
                  width={1022}
                  height={1022}
                  className="size-[20px]"
                />
              </a>
              <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]">
                <a href="https://t.me/PsyberHQ">PsyberHQ</a>
              </p>
            
          </div>
        </div>

        <div className="w-fit">
          <div className="text-left w-fit flex justify-center gap-2 items-center sm:mb-[20px] mb-[10px]">
            <a href="tel:+1234567890">
              <Image
                src="/phone.png"
                alt="Logo"
                width={1022}
                height={1022}
                className="size-[22px]"
              />
            </a>
            <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] hover:underline">
             <a href="tel:+1234567890">+2349038279790</a>
            </p>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <a href="mailto:psyberofficial@gmail.com">
              <Image
                src="/envelop.png"
                alt="Logo"
                width={1022}
                height={1022}
                className="h-[20px] w-[22px]"
              />
            </a>
            <p className="md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] hover:underline">
              <a href="mailto:psyberofficial@gmail.com">psyberofficial01@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="w-[320px] mx-auto">
          <p className="mb-[30px] font-[700] md:text-base text-sm">
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
            <Link href="">
              <button className="hover:bg-[#71177f] bg-gradient-to-br from-[#efbff6] to-[#731981] md:w-[90px] w-[70px] h-[40px] md:text-[18px] text-[15px] rounded-[42px] text-white font-semibold py-0 px-[6px]">
                Join
              </button>
            </Link>
          </div>
        </div>
      </div>
      <p className="md:text-[15px] text-[13px] text-[#6F6C90]">Copyright @ Psyber | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
