'use client';

import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section 
      className="relative z-0 min-h-screen w-full flex items-center justify-center pt-20 px-[3vw] md:px-[4vw]"
      style={{
        backgroundImage: 'url(/bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay to blend with the rest of the page */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to bottom, rgba(44,8,63,0.3) 0%, rgba(44,8,63,0.6) 50%, #2C083F 100%)`
        }}
      ></div>

      <div className="relative z-20 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-0">
        {/* Text Content - Centered on Mobile, Left-aligned on Desktop */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-gliker mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Feeling Lost in the Web3 Buzz? Don't Worry, We've Got You
          </h1>
          <p className="font-urbanist text-sm sm:text-base md:text-lg text-gray-200 mb-6 md:mb-8 leading-relaxed">
            Psyber makes web 3.0 accessible for everyone, offering step-by-step guidance for beginners and stress relief tools for seasoned users. Whether you're new to web3 or looking to relax and enhance your blockchain journey, we're here to guide you through education, tasks, and mind wellness.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto md:justify-start">
            <Link href="/psyber-auth/signup" className="w-full sm:w-auto">
              <button className="button w-full sm:w-auto h-[50px] px-8 rounded-[42px] bg-gradient-to-br from-[#efbff6] to-[#731981] text-white font-semibold hover:from-[#e0a5e5] hover:to-[#621570] transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Image - Hidden on Mobile, Shown on Desktop */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full hidden md:flex items-center justify-center">
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