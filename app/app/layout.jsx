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
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.jpeg')",
        }}
      >
        {children}
      </div>
      <Footer
        className="
         bottom-0 left-0 right-0 bg-white/30
      "
      />
    </div>
  );
}
