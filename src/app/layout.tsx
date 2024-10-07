import { Urbanist } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';

const gliker = localFont({
  src: [
    {
      path: '/fonts/GlikerRegular.ttf',
      weight: '400',
    },
    {
      path: '/fonts/GlikerBold.ttf',
      weight: '700',
    },
    {
      path: '/fonts/GlikerSemiBold.ttf',
      weight: '600',
    },
  ],
  variable: '--font-gliker',
  display: 'swap',
});

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Psyber',
  description: 'Discover Psyber, your guide to navigating the complexities of Web3 effortlessly!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${gliker.variable} font-urbanist tracking-[0.01rem] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
