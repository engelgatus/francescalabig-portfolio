'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative bg-linear-to-br from-pink-50 via-amber-50 to-teal-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-4 inline-block px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-medium">
            Available for new projects
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            Hi, I&apos;m <span className="text-pink-500">{SITE_CONFIG.nickname}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
            {SITE_CONFIG.tagline}
          </p>
          
          <p className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            I help busy professionals and growing businesses stay organized with reliable administrative support, 
            so you can focus on what matters most.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let&apos;s Work Together
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
