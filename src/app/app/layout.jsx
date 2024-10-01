import Footer from '@/components/Home/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <div>
      <nav className="fixed left-0 right-0 top-0 p-8">
        <div className="w-fit">
          <Link href="/">
            <Image
              src="/logoName.png"
              alt=" Psyber Logo"
              width={372}
              height={472}
              className="size-12 w-fit object-contain"
            />
          </Link>
        </div>
      </nav>
      <div
        className="fixed inset-0 -z-10 min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.jpeg')",
        }}
      ></div>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
