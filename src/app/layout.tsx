import { Urbanist, Gloock } from 'next/font/google';
import './globals.css';
import { Wallet } from '@/components/Wallet';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['100', '400', '600'],
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
      <body className={`${urbanist.variable} ${gloock.variable} antialiased`}>
        <Wallet>{children}</Wallet>
      </body>
    </html>
  );
}
