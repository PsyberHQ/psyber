import { Urbanist } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { PsyberAuthProvider } from '@/contexts/PsyberAuthContext';
import ApiDebugPanel from '@/components/Debug/ApiDebugPanel';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const gliker = localFont({
  src: '../../public/fonts/GlikerBold.ttf',
  variable: '--font-gliker',
  display: 'swap',
});

export const metadata = {
  title: 'Psyber',
  description: 'Discover Psyber, your guide to navigating the complexities of Web3 effortlessly!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${gliker.variable} antialiased`}>
        <PsyberAuthProvider>
          {children}
          {process.env.NODE_ENV === 'development' && <ApiDebugPanel />}
        </PsyberAuthProvider>
      </body>
    </html>
  );
}
