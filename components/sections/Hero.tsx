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
          scrub: 0.5,
          pin: true,
        },
      });

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
          scrub: true,
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
      className="relative h-screen flex items-center overflow-hidden bg-heart"
    >
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-float pointer-events-none mix-blend-overlay" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-alice/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none mix-blend-overlay" />

      <Container className="relative z-10 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full gap-8">
          
          <div ref={visualRef} className="hidden lg:col-span-6 lg:flex flex-col justify-center items-center h-full">
            <div className="w-100 h-125 bg-white/10 rounded-[3rem] border border-white/20 backdrop-blur-sm shadow-dream flex items-center justify-center relative group">
               <span className="text-white/60 font-mono text-sm tracking-widest uppercase">
                 [Visual: Alice / Pusheen]
               </span>
               <div className="absolute -top-10 -left-10 w-24 h-24 bg-alice/80 rounded-full blur-xl opacity-60 group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute top-1/2 -right-12 w-20 h-20 bg-cheshire/80 rounded-full blur-xl opacity-60 animate-pulse-slow" />
            </div>
          </div>

          <div ref={contentRef} className="col-span-1 lg:col-span-6 flex flex-col justify-center h-full relative pl-0 lg:pl-12">
            
            <div className="hero-slide-1 absolute top-1/2 left-0 lg:left-12 w-full -translate-y-1/2">
              <h1 className="text-8xl! md:text-7xl font-primary! mb-6 text-white leading-[1.2] drop-shadow-sm">
                Hi, I&apos;m <br />
                <span className="font-display text-9xl md:text-8xl text-ink tracking-widest uppercase">Frances</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-lg">
                I turn chaos into calm and to-do lists into done.
                <span className="inline-block ml-2 animate-bounce">✨</span>
              </p>
              <div className="mt-8 flex items-center gap-2 text-white/70 text-sm font-mono uppercase tracking-widest">
                <div className="w-8 h-px bg-white/70" /> Scroll to explore
              </div>
            </div>

            <div className="hero-slide-2 absolute top-1/2 left-0 lg:left-12 w-full -translate-y-1/2 opacity-0 pointer-events-none">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Your time is <span className="text-alice font-display italic">magic</span> <br/>
                Don&apos;t waste it on the mundane.
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
                I handle the inbox, the schedule, and the noise—so you can focus on the big picture.
              </p>
            </div>

            <div className="hero-slide-3 absolute top-1/2 left-0 lg:left-12 w-full -translate-y-1/2 opacity-0 pointer-events-none">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                Ready for a <br/>
                <span className="font-display text-paper tracking-widest">lighter workload?</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-paper text-heart hover:bg-white shadow-dream font-bold pointer-events-auto border-none"
                >
                  See My Magic
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white/10 pointer-events-auto font-bold"
                >
                  Say Hello
                </Button>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
