import { Urbanist, Gloock } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const gloock = Gloock({
  subsets: ['latin'],
  variable: '--font-gloock',
  weight: '400',
});

export const metadata = {
  title: 'Psyber',
  description: 'Discover Psyber, your guide to navigating the complexities of Web3 effortlessly!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${gloock.variable} font-urbanist tracking-[0.01rem] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
