import { Urbanist, Gloock } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['100', '400', '600'], 
});

const gloock = Gloock({
  subsets: ['latin'],
  variable: '--font-gloock',
  weight: '400'
});

export const metadata = {
  title: "Psyber",
  description: "Discover Psyber, your guide to navigating the complexities of Web3 effortlessly!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${gloock.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
