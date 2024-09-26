import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="w-full  py-4 flex justify-between px-10 items-center fixed top-0 bg-white z-50">
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
          <button className="bg-[#BA68C8] w-[154px] h-[40px] text-[14px] rounded-[42px] text-white font-semibold  px-4 ">
            Lets&rsquo;s get started
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
