'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import Header from '@/components/Home/Header';
import Footer from '@/components/Home/Footer';
import HeroSection from '@/components/Landing/HeroSection';
import WhatIsPsyber from '@/components/Landing/WhatIsPsyber';
import HowItWorks from '@/components/Landing/HowItWorks';
import WhyPsyber from '@/components/Landing/WhyPsyber';
import EarnPoints from '@/components/Landing/EarnPoints';
import Roadmap from '@/components/Landing/Roadmap';
import CTASection from '@/components/Landing/CTASection';

export default function Home() {
  const { isAuthenticated, loading } = usePsyberAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!loading && isAuthenticated) {
      router.push('/app');
    }
  }, [isAuthenticated, loading, router]);

  // Show loader while auth context is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900">
        <div className="text-white text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto"></div>
          </div>
          <p>Loading Psyber...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-purple-900 via-purple-800 to-black min-h-screen">
      <Header />
      <HeroSection />
      <WhatIsPsyber />
      <HowItWorks />
      <WhyPsyber />
      <EarnPoints />
      <Roadmap />
      <CTASection />
      <Footer />
    </div>
  );
}
