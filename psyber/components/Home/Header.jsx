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
      className={`w-full py-4 flex justify-between px-10 items-center fixed top-0 z-50 transition-colors duration-300 ${
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
            className="size-16"
          />
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/">
          <button className="bg-[#BA68C8] w-[154px] h-[40px] text-[14px] rounded-[42px] text-white font-semibold px-4">
            Lets&rsquo;s get started
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
