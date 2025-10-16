'use client';

import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative z-0 h-screen flex items-center pl-[3vw] md:pl-8">
      <Image
        src="/bg.jpeg"
        alt="Hero Background"
        className="absolute -z-10 object-cover"
        fill={true}
      />
      <div className="absolute inset-0 bg-[#270937] bg-opacity-60 -z-10"></div>

      <div className="h-fit w-full items-center gap-8 md:grid md:grid-cols-2 z-10">
        <div className="mb-8 md:mb-0">
          <h1 className="font-gliker mb-[18px] text-4xl font-bold text-white sm:leading-[42px] md:text-5xl md:leading-[56px] lg:text-6xl lg:leading-[72px]">
            Feeling Lost in the Web3 Buzz? Don't Worry, We've Got You
          </h1>
          <p className="font-urbanist text-base text-gray-200 sm:text-lg md:text-lg mb-8 max-w-lg">
            Psyber makes web 3.0 accessible for everyone, offering step-by-step guidance for beginners and stress relief tools for seasoned users. Whether you're new to web3 or looking to relax and enhance your blockchain journey, we're here to guide you through education, tasks, and mind wellness.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/psyber-auth/signup">
              <button className="button h-[50px] px-8 rounded-[42px] bg-gradient-to-br from-[#efbff6] to-[#731981] text-white font-semibold hover:from-[#e0a5e5] hover:to-[#621570] transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </Link>
            <button className="h-[50px] px-8 rounded-[42px] border-2 border-white text-white font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300">
              Join Beta
            </button>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src="/mediBrain.png"
            alt="Meditating Brain"
            fill={true}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;