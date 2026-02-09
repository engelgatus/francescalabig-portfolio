"use client";

import { useRef, useLayoutEffect } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { setupHeroPinning } from "@/lib/animations";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Only run on client
    const ctx = gsap.context(() => {
      setupHeroPinning(heroRef, contentRef);
    }, heroRef); // Scope to this component

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-alice" 
    >
      {/* Background Decor (Pusheen-style blobs) */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-cheshire/20 rounded-full blur-3xl animate-pulse-slow" />

      <Container className="relative z-10">
        <div ref={contentRef} className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-sm">
            Hi, I&apos;m <span className="text-heart">Frances</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-medium leading-relaxed">
            Your friendly Virtual Assistant who turns chaos into calm 
            <span className="inline-block ml-2 animate-bounce">✨</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-paper text-alice hover:bg-white shadow-dream font-bold"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
            >
              Let&apos;s Chat
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
