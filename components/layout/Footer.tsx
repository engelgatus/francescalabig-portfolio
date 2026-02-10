import Image from "next/image";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-75 md:h-100 bg-ink text-white -z-10 overflow-hidden">
      
      {/* 1. Paper Texture Background */}
      <div 
        className="absolute inset-0 opacity-50 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          filter: 'contrast(150%) brightness(100%)'
        }}
      />

      {/* 2. Content Grid */}
      <div className="relative h-full w-full z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 h-full items-center relative">
          
          {/* LEFT (Cols 1-4): The White Rabbit */}
          {/* Anchored to bottom, dipping 30% down */}
          <div className="col-span-4 h-full relative hidden md:block pointer-events-none">
            <div className="absolute -bottom-60 -left-20 w-[140%] h-auto scale-125">
               <Image 
                 src="/images/white-rabbit.png"
                 alt="The White Rabbit"
                 width={600}
                 height={800}
                 className="object-contain mix-blend-luminosity opacity-90"
                 // mix-blend-luminosity makes it blend beautifully with the dark ink background
               />
            </div>
          </div>

          {/* CENTER-LEFT (Cols 5-8): The Quote */}
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center h-full z-20">
            <h3 className="font-primary font-bold text-3xl md:text-5xl leading-tight text-white/90 tracking-tight">
              &ldquo;All good things <br/> 
              <span className="text-cheshire italic font-display tracking-widest">take time</span>.&rdquo;
            </h3>
            <p className="mt-4 text-white/50 text-sm font-primary uppercase tracking-widest">
              — A reminder for the rush
            </p>
          </div>

          {/* RIGHT (Cols 9-12): The Brand Identity */}
          <div className="col-span-12 md:col-span-3 h-full flex flex-col justify-between py-12 text-right">
             {/* Top Right: Name Signature */}
             <div className="mt-8 md:mt-16">
               <h2 className="font-display text-3xl md:text-4xl text-white/80 tracking-wide origin-right">
                 Frances Calabig
               </h2>
             </div>

             {/* Bottom Right: Copyright & Links */}
             <div className="space-y-4">
               <div className="flex gap-4 justify-end text-xs font-mono uppercase text-white/40 tracking-wider">
                 <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                 <a href="#" className="hover:text-white transition-colors">Instagram</a>
               </div>
               <p className="text-[10px] md:text-xs text-white/30 font-medium max-w-37.5 ml-auto">
                 © 2026. Crafted with magic in Manila by <a href="https://www.engelgatus.com" target="_blank" className="cursor-pointer hover:underline">Engel Gatus</a>.
               </p>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
