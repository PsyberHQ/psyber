import Footer from "@/components/Home/Footer";
import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <div>
      <nav className="fixed p-8">
        <div className="size-36">
          <Image
            src="/logoName.png"
            alt=" Psyber Logo"
            width={372}
            height={472}
          />
        </div>
      </nav>
      <div
        className="min-h-screen fixed inset-0  -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.jpeg')",
        }}
      ></div>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
