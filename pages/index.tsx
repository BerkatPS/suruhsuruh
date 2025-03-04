import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Use this to avoid hydration issues
    return null;
  }

  return (
      <Layout>
        <Hero />
        <Services />
        <Contact />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </Layout>
  );
}