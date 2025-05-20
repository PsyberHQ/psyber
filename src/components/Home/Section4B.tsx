import React from 'react';
import Image from 'next/image';

const Section4B = () => {
  return (
    <>
      <section className="hidden h-fit bg-[#CDFEC269] px-[3vw] pb-2 pt-[80px] sm:block md:px-[4vw]">
        <h1 className="font-gliker m-auto mb-[60px] w-[320px] text-center text-2xl leading-[31px] text-[#321C2A] md:w-[510px] md:text-[40px] md:leading-[45px]">
          Your Web3 Journey {'–'} Simplified and Stress-Free
        </h1>

        <div className="flex h-fit flex-wrap justify-center sm:gap-6">
          <div className="h-fit w-[210px] font-urbanist">
            <span className="font-bold">Web3 Pop Quiz:</span> Test your Web3 knowledge in a fun,
            low-pressure way
          </div>

          <div className="h-fit w-[240px] font-urbanist">
            <span className="font-bold">Psychological Readiness Test:</span> Find out if
            you&rsquo;re ready to dive into Web3 – without the anxiety
          </div>

          <div className="h-fit w-[250px] font-urbanist">
            <span className="font-bold">Task-Based Learning:</span> Complete easy daily tasks like
            What&rsquo;s an NFT?&rsquo; or &rsquo;How does blockchain work?&rsquo; {'–'} no tech
            skills required.
          </div>

          <div className="h-fit w-[260px] font-urbanist">
            <span className="font-bold">On-Demand Counseling:</span> Feeling stressed? Talk to a
            professional whenever you need.
          </div>

          <div className="h-fit w-[260px] font-urbanist">
            <span className="font-bold">Earn Rewards:</span>Stay motivated by earning crypto rewards
            and tokens as you learn.
          </div>
        </div>
      </section>

      <Image
        src="/wave.png"
        alt=""
        width={1755}
        height={600}
        className="hidden h-[180px] sm:block"
      />

      <Image
        src="/section4mobile.png"
        alt="your web3 journey simplified"
        width={755}
        height={1062}
        className="block sm:hidden"
      />
    </>
  );
};

export default Section4B;
