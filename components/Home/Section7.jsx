import Image from "next/image";
import Link from "next/link";

const Section7 = () => {
  return (
    <section
      className="md:px-[4vw] px-[3vw] md:pt-[40px] h-fit py-[100px]"
      style={{
        backgroundImage: "url(/wavybg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-[32px] w-fit m-auto text-center font-[600] text-brand-darkbrown mt-[90px]">
        Community Highlight
      </h1>
      <div className="flex flex-wrap gap-[20px] justify-center items-center h-[280px]">
        <div className="h-[140px] w-[370px] p-3 bg-[#D9D9D9] rounded-[50px] flex gap-[20px] justify-between items-center">
          <Image src="/circleTwitter.png" alt="Logo" width={90} height={90} />
          <p className="text-[14px] leading-[18px] font-[400] text-brand-darkbrown">
            <span className="font-bold">Twitter Significance:</span> Twitter is
            the hub for Web3 users, and by using Psyber, you'll be able to
            immerse yourself in conversations, trends, and events that define
            the space.
          </p>
        </div>

        <div className="h-[140px] w-[370px] p-3 bg-[#D9D9D9] rounded-[50px] flex gap-[20px] justify-between items-center">
          <Image
            src="/circleTelegram.png"
            alt="Logo"
            width={1080}
            height={1090}
            className="size-[90px]"
          />
          <p className="text-[14px] leading-[18px] font-[400] text-brand-darkbrown">
            <span className="font-bold">Telegram Community:</span> Join our
            vibrant Telegram groups where you can ask questions, discuss ideas
            and connect with fellow learners.
          </p>
        </div>

        <div className="h-[140px] w-[370px] p-3 bg-[#D9D9D9] rounded-[50px] flex gap-[20px] justify-between items-center">
          <Image src="/circleSolana.png" alt="Logo" width={90} height={90} />
          <p className="text-[14px] leading-[18px] font-[400] text-brand-darkbrown">
            <span className="font-bold">Social Rewards:</span> Earn tokens not
            just by completing tasks, but also for sharing your achievements on
            Twitter and engaging in the Telegram community.
          </p>
        </div>
      </div>

      <div className="m-auto w-fit">
        <Link href="/">
          <button className="bg-brand-button-purple m-auto w-fit h-[54px] text-[18px] rounded-[42px] text-white font-[700]  px-[22px] ">
            Join our community
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Section7;
