export default function Footer() {
  return (
    // Responsive Height: h-75 (300px) on Mobile, h-100 (400px) on Desktop
    // overflow-hidden prevents any internal spillover
    <footer className="fixed bottom-0 left-0 w-full h-75 md:h-100 bg-ink text-white -z-10 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--color-cheshire)_0%,transparent_70%)]" />

      <div className="relative h-full w-full">
        {/* Centered Name (Responsive Text Size) */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-white/85 tracking-tight text-center leading-none">
            Frances Calabig
          </h2>
        </div>

        {/* Bottom Right Copyright */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 text-right">
          <p className="text-xs sm:text-sm text-white/60 font-medium">
            © 2026 Frances Calabig. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
