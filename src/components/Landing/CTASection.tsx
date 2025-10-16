'use client';

import Link from 'next/link';
import Image from 'next/image';

const CTASection = () => {
  return (
    <section className="relative px-[3vw] py-16 md:px-[4vw] md:py-24 overflow-hidden" style={{ backgroundColor: '#2C083F' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <Image
            src="/mediBrain.png"
            alt="Psyber Logo"
            width={120}
            height={120}
            className="mx-auto mb-6"
          />
        </div>

        <h2 className="font-gliker text-3xl md:text-5xl font-bold text-white mb-6">
          Stay ahead of the game with Psyber!
        </h2>

        <p className="font-urbanist text-lg text-gray-200 mb-10 leading-relaxed">
          Whether you're just starting or looking to advance your skills, Psyber is your go-to platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/psyber-auth/signup">
            <button className="button h-[50px] px-10 rounded-[42px] bg-gradient-to-br from-[#efbff6] to-[#731981] text-white font-semibold hover:from-[#e0a5e5] hover:to-[#621570] transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              Get Started
            </button>
          </Link>
        </div>

        <p className="text-gray-400 font-urbanist text-sm">
          No credit card required. Start your wellness journey today.
        </p>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="rgba(0,0,0,0.1)"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default CTASection;