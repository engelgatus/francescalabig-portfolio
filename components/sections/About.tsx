'use client';

import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import CloudEdge from '@/components/decorative/CloudEdge'; // Import CloudEdge
import { STATS } from '@/lib/constants';

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-paper z-20"> 
      {/* 
        CLOUD VISIBILITY FIX:
        We wrap the cloud in a div that sits at the very top (top-0) 
        and pushes itself UP by ~100% of its height (-translate-y-[99%]).
        
        This makes the white cloud sit ON TOP of this white section, 
        creating a jagged "cloud" leading edge as it scrolls up over the blue Hero.
      */}
      <div className="absolute top-0 left-0 w-full -translate-y-[99%] z-20 pointer-events-none">
        <CloudEdge position="top" fillColor="var(--color-paper)" />
      </div>

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
