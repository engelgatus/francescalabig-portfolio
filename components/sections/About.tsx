'use client';

import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { STATS } from '@/lib/constants';

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-canvas z-20"> 
      <div 
        className="absolute top-0 left-0 w-full h-16 sm:h-24 -translate-y-[98%] z-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23FDFCF8'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          transform: 'rotate(180deg)'
        }}
      />

      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ink">About Me</h2>
            <div className="space-y-4 text-lg text-ink/80 leading-relaxed">
              <p>
                For over 6 years, I&apos;ve been the behind-the-scenes support for overseas companies, 
                helping them stay organized and efficient across time zones.
              </p>
              <p>
                From managing inboxes and handling HR tasks to creating social media content and supporting customers, 
                I bring calm to chaos and keep operations running smoothly.
              </p>
              <p className="text-base text-cheshire italic font-medium mt-4">
                Based in Manila, Philippines 🇵🇭 • Working across time zones with a smile ☕
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-dream transition-shadow">
                <div className="text-3xl md:text-4xl font-bold text-heart mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-ink/70 font-medium">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
