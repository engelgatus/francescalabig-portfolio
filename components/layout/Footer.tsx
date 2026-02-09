export default function Footer() {
  return (
    <footer 
      className="fixed bottom-0 left-0 w-full h-100 bg-ink text-white -z-10 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--color-cheshire)_0%,transparent_70%)]" />
      
      <div className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce">✨</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-pulse-slow">🌙</div>

      <div className="relative z-10 text-center">
        <h2 className="text-9xl md:text-[12rem] font-bold text-white/5 tracking-tighter select-none leading-none">
          FRANCES
        </h2>
        
        <div className="mt-8 flex flex-col gap-4 text-white/60 font-medium">
          <p>
            © 2026 Frances Calabig. All rights reserved.
          </p>
          <div className="flex gap-4 justify-center text-sm uppercase tracking-widest">
            <a href="#" className="hover:text-heart transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-heart transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
