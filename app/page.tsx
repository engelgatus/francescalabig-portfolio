import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      
      <div className="relative z-10 bg-paper shadow-2xl">
        <About />
        <Skills />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
