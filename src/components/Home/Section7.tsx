import Image from 'next/image';
import Link from 'next/link';

const Section7 = () => {
  return (
    <section
      className="mt-[10px] h-fit px-[3vw] pb-[100px] pt-[0px] md:px-[4vw] md:pt-[40px]"
      style={{
        backgroundImage: 'url(/wavybg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="m-auto mb-[5px] mt-[90px] w-fit text-center font-gloock text-[24px] font-[600] text-brand-darkbrown sm:mb-[25px] md:text-[32px]">
        Community Highlight
      </h1>
      <br />
      <div className="flex h-fit flex-wrap items-center justify-center gap-4">
        <div className="flex h-fit w-full items-center justify-between gap-[12px] rounded-[50px] bg-[#D9D9D9] p-[14px] sm:h-[120px] sm:w-[370px]">
          <Image src="/circleTwitter.png" alt="Logo" width={76} height={76} />
          <p className="font-urbanist text-[13px] font-[400] leading-[16px] text-brand-darkbrown md:text-[14px]">
            <span className="font-bold">Twitter Significance:</span> Twitter is the hub for Web3
            users, and by using Psyber, you{"'"}ll be able to immerse yourself in conversations,
            trends, and events that define the space.
          </p>
        </div>

        <div className="flex h-fit w-full items-center justify-between gap-[12px] rounded-[50px] bg-[#D9D9D9] p-[14px] sm:h-[120px] sm:w-[370px]">
          <Image src="/circleTelegram.png" alt="Logo" width={76} height={76} />
          <p className="font-urbanist text-[13px] font-[400] leading-[18px] text-brand-darkbrown md:text-[14px]">
            <span className="font-bold">Telegram Community:</span> Join our vibrant Telegram groups
            where you can ask questions, discuss ideas and connect with fellow learners.
          </p>
        </div>

        <div className="flex h-fit w-full items-center justify-between gap-[12px] rounded-[50px] bg-[#D9D9D9] p-[14px] sm:h-[120px] sm:w-[370px]">
          <Image src="/circleSolana.png" alt="Logo" width={96} height={196} className="size-20" />
          <p className="font-urbanist text-[13px] font-[400] leading-[18px] text-brand-darkbrown md:text-[14px]">
            <span className="font-bold">Social Rewards:</span> Earn tokens not just by completing
            tasks, but also for sharing your achievements on Twitter and engaging in the Telegram
            community.
          </p>
        </div>
      </div>
      <br />

      <div className="m-auto w-fit">
        <Link href="/https://t.me/PsyberHQ">
          <button className="m-auto h-[40px] w-fit rounded-[42px] bg-gradient-to-br from-[#efbff6] to-[#731981] px-[22px] text-[14px] font-[700] text-white shadow-custom-light hover:bg-[#71177f] sm:text-[16px] md:h-[50px] md:text-[20px]">
            Join our community
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Section7;
