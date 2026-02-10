"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Contact() {
  return (
    // No overflow-hidden on the main section -> Cloud can hang down!
    <section id="contact" className="relative py-32 bg-cheshire mb-75 md:mb-100 z-10">
      
      {/* 
         FIX FOR DRAGGING BUG:
         Instead of letting the blob position itself off-screen freely,
         we wrap it in a container that has `overflow-hidden`.
         This container matches the section size.
      */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-0 right-0 w-125 h-125 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>
      
      {/* 
         BOTTOM CLOUD EDGE
         This is OUTSIDE the overflow-hidden wrapper above.
         So it can hang down (translate-y-99%) and cover the footer top.
      */}
      <div 
        className="absolute bottom-0 left-0 w-full h-16 sm:h-24 translate-y-[99%] z-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%239D84B7'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.9]">
              Let&apos;s make <br />
              <span className="text-ink/80 font-display tracking-wide">magic</span> happen.
            </h2>
            <p className="mt-8 text-xl text-white/90 max-w-lg leading-relaxed font-medium">
              Ready to hand over the chaos? Whether you need a full inbox detox or just someone to keep the ship afloat while you sleep. I&apos;m here.
            </p>
            
            <div className="mt-12 inline-flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/20 w-fit">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-white text-sm font-semibold tracking-wide uppercase">
                Available for new projects
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-8 md:p-10 shadow-dream">
              <div className="space-y-8">
                
                <div>
                  <label className="text-white/60 text-sm font-mono uppercase tracking-widest mb-2 block">
                    Drop me a line
                  </label>
                  <a 
                    href="mailto:hello@francescalabig.com" 
                    className="text-2xl md:text-3xl font-bold text-white hover:text-ink transition-colors break-all"
                  >
                    hello@francescalabig.com
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                  <div>
                    <label className="text-white/60 text-sm font-mono uppercase tracking-widest mb-2 block">
                      Socials
                    </label>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-white font-medium hover:text-ink transition-colors">LinkedIn ↗</a>
                      </li>
                      <li>
                        <a href="#" className="text-white font-medium hover:text-ink transition-colors">Instagram ↗</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm font-mono uppercase tracking-widest mb-2 block">
                      Based In
                    </label>
                    <p className="text-white font-medium">
                      Manila, PH (GMT+8)
                    </p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-white text-cheshire! hover:bg-ink! hover:text-white mt-4 font-bold h-14 text-lg shadow-none"
                >
                  Book a Discovery Call
                </Button>

              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
