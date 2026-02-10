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

      <Container className="relative z-10 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full gap-8">
          
          <div ref={visualRef} className="hidden lg:col-span-6 lg:flex flex-col justify-center items-center h-full">
            <div className="w-100 h-125 bg-white/10 rounded-[3rem] border border-white/20 backdrop-blur-sm shadow-dream flex items-center justify-center relative group">
               <span className="text-white/60 font-mono text-sm tracking-widest uppercase">
                 [Visual: Alice / Pusheen]
               </span>
            </div>
          </div>

          <div ref={contentRef} className="col-span-1 lg:col-span-6 flex flex-col justify-center h-full relative pl-0 lg:pl-12">
            
            {/* SLIDE 1 */}
            <div className="hero-slide-1 absolute top-1/2 left-0 lg:left-12 w-full -translate-y-1/2 px-4 lg:px-0">
              <h1 className="text-6xl sm:text-7xl md:text-7xl font-bold mb-6 text-white leading-loose drop-shadow-sm">
                Hi, I&apos;m <br />
                <span className="font-display text-7xl sm:text-8xl md:text-9xl text-ink tracking-widest uppercase">Frances</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-lg">
                I help busy business owners get organized and get moving.
              </p>
            </div>

            {/* SLIDE 2 */}
            <div className="hero-slide-2 absolute top-1/2 left-0 lg:left-12 w-full -translate-y-1/2 opacity-0 pointer-events-none px-4 lg:px-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Your time is <span className="text-alice font-display italic">magic</span> <br/>
                Save it for the good stuff.
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
                I take care of the inbox, the schedule, and the details so you can focus on leading your business.
              </p>
            </div>

            {/* SLIDE 3 */}
            <div className="hero-slide-3 absolute top-1/2 left-0 lg:left-12 w-full -translate-y-1/2 opacity-0 pointer-events-none px-4 lg:px-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
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
