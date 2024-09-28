"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full md:py-4 py-[10px] flex justify-between md:px-[4vw] px-[3vw] items-center fixed top-0 z-50 transition-colors duration-300 ${
        isScrolled && "bg-white shadow-sm"
      }`}
    >
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={1080}
            height={720}
            className="md:size-16 size-12"
          />
        </Link>
      </div>


     <Link href="/">
      <button className="shadow-custom-light bg-gradient-to-br from-[#efbff6] to-[#731981]  w-[150px]  md:w-[212px] h-[40px] md:h-[50px] sm:text-[16px] text-[14px] md:text-[20px] rounded-[32px] md:rounded-[42px] text-white font-semibold md:px-4 px-[12px]">
       Let's get started
      </button>
      </Link>
    </nav>
  );
};

export default Header;
