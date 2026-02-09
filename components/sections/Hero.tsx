"use client";

import { useRef, useLayoutEffect } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 0.5,    // Reduced from 1 to 0.5 for snappier response
          pin: true,
          // anticipatePin: 1, // REMOVED: This was causing the "magnet" snap
        },
      });

      // ANIMATION SEQUENCE
      tl.to(".hero-slide-1", { opacity: 0, y: -50, duration: 1 })
        .fromTo(".hero-slide-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "<0.5")
        
        .to({}, { duration: 0.5 }) 

        .to(".hero-slide-2", { opacity: 0, y: -50, duration: 1 })
        .fromTo(".hero-slide-3", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "<0.5");

      gsap.to(visualRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true, // Instant scrub (no lag) for the visual container
        },
        y: 50,
        scale: 1.05,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center overflow-hidden bg-alice"
    >
      {/* Background Decor */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-cheshire/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      <Container className="relative z-10 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8 md:gap-16">
          
          {/* LEFT COLUMN */}
          <div ref={visualRef} className="hidden lg:flex flex-col justify-center items-center h-full">
            <div className="w-100 h-125 bg-white/10 rounded-[3rem] border border-white/20 backdrop-blur-sm shadow-dream flex items-center justify-center relative group">
               <span className="text-white/50 font-mono text-sm">
                 [Visual: Alice falling or Pusheen floating]
               </span>
               <div className="absolute -top-10 -left-10 w-24 h-24 bg-heart/80 rounded-full blur-xl opacity-60 group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute top-1/2 -right-12 w-20 h-20 bg-cheshire/80 rounded-full blur-xl opacity-60 animate-pulse-slow" />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div ref={contentRef} className="flex flex-col justify-center h-full relative">
            
            {/* SLIDE 1 */}
            <div className="hero-slide-1 absolute top-1/2 left-0 w-full -translate-y-1/2">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight drop-shadow-sm">
                Hi, I&apos;m <span className="text-heart">Frances</span>.
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-lg">
                Your friendly Virtual Assistant who turns your daily chaos into organized calm.
                <span className="inline-block ml-2 animate-bounce">✨</span>
              </p>
              <div className="mt-8 flex items-center gap-2 text-white/60 text-sm font-mono uppercase tracking-widest">
                <div className="w-8 h-px bg-white/60" /> Scroll to explore
              </div>
            </div>

            {/* SLIDE 2 */}
            <div className="hero-slide-2 absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-0 pointer-events-none">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                More Time for <br/>
                <span className="text-heart">What Matters.</span>
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
                I handle the inbox, the scheduling, and the admin headaches so you can focus on growing your business.
              </p>
            </div>

            {/* SLIDE 3 */}
            <div className="hero-slide-3 absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-0 pointer-events-none">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Ready to reclaim <br/>your time?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-paper text-alice hover:bg-white shadow-dream font-bold pointer-events-auto"
                >
                  View My Work
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10 pointer-events-auto"
                >
                  Let&apos;s Chat
                </Button>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
