import React from 'react'
import Image from 'next/image'

const Section4B = () => {
  return (
    <>
        <section className="md:px-[4vw] px-[3vw] pt-[80px] pb-2 h-fit bg-[#CDFEC269] sm:block hidden">
            <h1 className="m-auto font-gloock font-[600] text-[#321C2A] md:leading-[45px] md:w-[510px] w-[320px] leading-[31px] md:text-[40px] text-2xl text-center mb-[60px]">
            Your Web3 Journey – Simplified and Stress-Free
            </h1>

            <div className="flex flex-wrap justify-center sm:gap-6  h-fit">
                <div className="w-[210px] h-fit font-urbanist">
                    <span className="font-bold">Web3 Pop Quiz:</span> Test your Web3
                    knowledge in a fun, low-pressure way
                </div>

                <div className="w-[240px] h-fit font-urbanist">
                    <span className="font-bold">Psychological Readiness Test:</span> Find
                    out if you&rsquo;re ready to dive into Web3 – without the anxiety
                </div>

                <div className="w-[250px] h-fit font-urbanist">
                    <span className="font-bold">Task-Based Learning:</span> Complete easy
                    daily tasks like What&rsquo;s an NFT?&rsquo; or &rsquo;How does blockchain work?&rsquo; – no
                    tech skills required.
                </div>

                <div className="w-[260px] h-fit font-urbanist">
                    <span className="font-bold">On-Demand Counseling:</span> Feeling
                    stressed? Talk to a professional whenever you need.
                </div>

                <div className="w-[260px] h-fit font-urbanist">
                    <span className="font-bold">Earn Rewards:</span>Stay motivated by
                    earning crypto rewards and tokens as you learn.
                </div>
          </div>
      </section>

      <Image 
         src="/wave.png" 
         alt="" 
         width={1755}
         height={600}
         className="h-[180px]  sm:block hidden"
       />

      <Image 
        src="/section4mobile.png" 
        alt="your web3 journey simplified" 
        width={1055}
        height={1000}
        className="sm:hidden block"
         />
    </>
  )
}

export default Section4B