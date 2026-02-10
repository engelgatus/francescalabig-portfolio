'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

const AliceOrchestrator = dynamic(
  () => import('@/components/assets/AliceOrchestrator'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <AliceOrchestrator />
      
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
