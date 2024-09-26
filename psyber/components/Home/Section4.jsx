const Section4 = () => {
  return (
    <>
      <Section4A />
      <Section4B />
    </>
  );
};

const Section4A = () => {
  return (
    <section className="mt-[-35px] rounded-bl-[50px] md:px-[4vw] px-[3vw] pt-[80px] pb-[40px] h-fit bg-[#CDFEC269]">
      <h1 className="m-auto w-[490px] font-[600] text-[#321C2A] leading-[45px] text-[40px] text-center mb-[60px]">
        Your Web3 Journey – Simplified and Stress-Free
      </h1>

      <div className="flex justify-center flex-wrap gap-[15px] items-start border-2 border-red-500">
        <div className="border-2 border-green-800 w-[210px] h-fit m-auto">
          <span className="font-bold">Web3 Pop Quiz:</span> Test your Web3
          knowledge in a fun, low-pressure way
        </div>

        <div className="border-2 border-green-800 w-[240px] h-fit m-auto">
          <span className="font-bold">Psychological Readiness Test:</span> Find
          out if you’re ready to dive into Web3 – without the anxiety
        </div>

        <div className="border-2 border-green-800 w-[230px] h-fit m-auto">
          <span className="font-bold">Task-Based Learning:</span> Complete easy
          daily tasks like ‘What’s an NFT?’ or ‘How does blockchain work?’ – no
          tech skills required.
        </div>

        <div className="border-2 border-green-800 w-[260px] h-fit m-auto">
          <span className="font-bold">On-Demand Counseling:</span> Feeling
          stressed? Talk to a professional whenever you need.
        </div>

        <div className="border-2 border-green-800 w-[260px] h-fit m-auto">
          <span className="font-bold">Earn Rewards:</span>Stay motivated by
          earning crypto rewards and tokens as you learn.
        </div>
      </div>
    </section>
  );
};

const Section4B = () => {
  return (
    <section
      className="md:px-[4vw] px-[3vw] md:pt-[60px] lg:pt-[80px] xl:pt-[120px] pt-[30px] flex gap-[30px] justify-center items-center"
      style={{
        backgroundImage: "url(/wave.png)",
      }}
    ></section>
  );
};

export default Section4;
