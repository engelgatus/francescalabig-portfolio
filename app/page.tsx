import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="relative z-10 bg-paper">
        <About />
        <Skills />
        {/* Future sections (Projects, Contact) go here */}
      </div>
    </main>
  );
}
