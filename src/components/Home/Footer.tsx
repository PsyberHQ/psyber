import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t-[3px] border-neutral-400 bg-white px-[3vw] py-[30px] md:px-[4vw]">
      <div className="flex flex-wrap items-start justify-between gap-[24px] md:gap-[30px]">
        <div className="">
          <Image
            src="/footerLogo.jpg"
            alt="Logo"
            width={140}
            height={140}
            className="h-[60px] w-[60px] md:h-[90px] md:w-[90px] lg:h-[110px] lg:w-[110px]"
          />
        </div>

        <div className="w-[100px]">
          <p className="font-inter mb-[15px] text-[14px] font-[600] text-brand-darkbrown sm:mb-[30px] md:text-[15px]">
            Why Psyber?
          </p>
          <p className="font-inter mb-[15px] text-[14px] font-[600] text-brand-darkbrown sm:mb-[30px] md:text-[15px]">
            How It works
          </p>
          <p className="font-inter mb-[15px] text-[14px] font-[600] text-brand-darkbrown sm:mb-[30px] md:text-[15px]">
            Features
          </p>
        </div>

        <div className="w-[100px]">
          <p className="font-inter mb-[15px] text-[14px] font-[600] text-brand-darkbrown sm:mb-[30px] md:text-[15px]">
            Rewards
          </p>
          <p className="font-inter text-[14px] font-[600] text-brand-darkbrown md:text-[15px]">
            Counseling
          </p>
        </div>

        <div className="w-[110px]">
          <div className="mb-[10px] flex w-fit items-center justify-center gap-2 text-left sm:mb-[20px]">
            <a href="https://t.me/PsyberHQ">
              <Image
                src="/telegram.jpg"
                alt="Logo"
                width={1022}
                height={1022}
                className="size-[28px]"
              />
            </a>
            <p className="font-inter text-[14px] font-[600] text-brand-darkbrown md:text-[15px]">
              Psyber
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <a href="https://t.me/PsyberHQ">
              <Image
                src="/twitter.png"
                alt="Logo"
                width={1022}
                height={1022}
                className="size-[20px]"
              />
            </a>
            <p className="font-inter text-[14px] font-[600] text-brand-darkbrown md:text-[15px]">
              <a href="https://t.me/PsyberHQ">PsyberHQ</a>
            </p>
          </div>
        </div>

        <div className="w-fit">
          <div className="mb-[10px] flex w-fit items-center justify-center gap-2 text-left sm:mb-[20px]">
            <a href="tel:+1234567890">
              <Image
                src="/phone.png"
                alt="Logo"
                width={1022}
                height={1022}
                className="size-[22px]"
              />
            </a>
            <p className="font-inter text-[14px] font-[600] text-brand-darkbrown hover:underline md:text-[15px]">
              <a href="tel:+1234567890">+2349038279790</a>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <a href="mailto:psyberofficial@gmail.com">
              <Image
                src="/envelop.png"
                alt="Logo"
                width={1022}
                height={1022}
                className="h-[20px] w-[22px]"
              />
            </a>
            <p className="font-inter text-[14px] font-[600] text-brand-darkbrown hover:underline md:text-[15px]">
              <a href="mailto:psyberofficial@gmail.com">psyberofficial01@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="mx-auto w-[320px]">
          <p className="mb-[30px] text-sm font-[700] md:text-base">
            Join our mailing list for your weekly dose of wellness and Web3 innovation.
          </p>

          <div className="flex h-[50px] w-[280px] items-center justify-between gap-[10px] rounded-[40px] border-2 border-neutral-500 p-[5px] md:h-[55px] md:w-[318px] md:p-2">
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter your email"
              className="pl-2 outline-none"
            />
            <Link href="">
              <button className="h-[40px] w-[70px] rounded-[42px] bg-gradient-to-br from-[#efbff6] to-[#731981] px-[6px] py-0 text-[15px] font-semibold text-white hover:bg-[#71177f] md:w-[90px] md:text-[18px]">
                Join
              </button>
            </Link>
          </div>
        </div>
      </div>
      <p className="text-[13px] text-[#6F6C90] md:text-[15px]">
        Copyright @ Psyber | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
