import { Urbanist } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { PsyberAuthProvider } from '@/contexts/PsyberAuthContext';
import ApiDebugPanel from '@/components/Debug/ApiDebugPanel';

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
      <body className={`${urbanist.variable} ${gloock.variable} antialiased`}>
        <PsyberAuthProvider>
          {children}
          {process.env.NODE_ENV === 'development' && <ApiDebugPanel />}
        </PsyberAuthProvider>
      </body>
    </html>
  );
}
