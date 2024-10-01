'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-[3vw] py-[10px] transition-colors duration-300 md:px-[4vw] md:py-4 ${
        isScrolled && 'bg-white shadow-sm'
      }`}
    >
      <div className="flex size-16 items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={1080}
            height={720}
            className="size-12 md:size-16"
          />
        </Link>
      </div>

      <Link href="/app">
        <button className="button bg-gradient-to-br from-[#efbff6] to-[#731981] hover:bg-[#71177f]">
          Let{"'"}s get started
        </button>
      </Link>
    </nav>
  );
};

export default Header;
