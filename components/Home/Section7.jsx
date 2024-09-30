import Image from "next/image";
import Link from "next/link";

const Section7 = () => {
  return (
    <section
      className="md:px-[4vw] px-[3vw] md:pt-[40px] h-fit pb-[100px]  pt-[0px] mt-[10px]"
      style={{
        backgroundImage: "url(/wavybg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <h1 className="md:text-[32px] text-[24px] w-fit m-auto text-center font-gloock font-[600] text-brand-darkbrown sm:mb-[25px] mb-[5px] mt-[90px]">
        Community Highlight
      </h1>
      <br/>
      <div className="flex flex-wrap gap-4 justify-center items-center h-fit">
        <div className="sm:h-[120px] h-fit sm:w-[370px] w-full  p-[14px] bg-[#D9D9D9] rounded-[50px] flex gap-[12px] justify-between items-center">
          <Image src="/circleTwitter.png" alt="Logo" width={76} height={76} />
          <p className="md:text-[14px] text-[13px] leading-[16px] font-[400] font-urbanist text-brand-darkbrown">
            <span className="font-bold">Twitter Significance:</span> Twitter is
            the hub for Web3 users, and by using Psyber, you'll be able to
            immerse yourself in conversations, trends, and events that define
            the space.
          </p>
        </div>

        <div className="sm:h-[120px] h-fit sm:w-[370px] w-full  p-[14px] bg-[#D9D9D9] rounded-[50px] flex gap-[12px] justify-between items-center">
          <Image src="/circleTelegram.png" alt="Logo" width={76} height={76} />
          <p className="md:text-[14px] text-[13px] leading-[18px] font-[400] font-urbanist text-brand-darkbrown">
            <span className="font-bold">Telegram Community:</span> Join our
            vibrant Telegram groups where you can ask questions, discuss ideas
            and connect with fellow learners.
          </p>
        </div>

        <div className="sm:h-[120px] h-fit sm:w-[370px] w-full  p-[14px] bg-[#D9D9D9] rounded-[50px] flex gap-[12px] justify-between items-center">
          <Image src="/circleSolana.png" alt="Logo" width={96} height={196} className="size-20"/>
          <p className="md:text-[14px] text-[13px] leading-[18px] font-[400] font-urbanist text-brand-darkbrown">
            <span className="font-bold">Social Rewards:</span> Earn tokens not
            just by completing tasks, but also for sharing your achievements on
            Twitter and engaging in the Telegram community.
          </p>
        </div>
      </div>
      <br/>
      
      <div className="m-auto w-fit">
        <Link href="/https://t.me/PsyberHQ">
          <button className="shadow-custom-light bg-gradient-to-br from-[#efbff6] to-[#731981] hover:bg-[#71177f] m-auto w-fit md:h-[50px] h-[40px] sm:text-[16px] text-[14px] md:text-[20px]  rounded-[42px] text-white font-[700]  px-[22px] ">
            Join our community
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Section7;
