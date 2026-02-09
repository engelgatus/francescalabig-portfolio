'use client';

import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { STATS } from '@/lib/constants';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                For over 6 years, I&apos;ve been the behind-the-scenes support for overseas companies, 
                helping them stay organized and efficient across time zones.
              </p>
              <p>
                From managing inboxes and handling HR tasks to creating social media content and supporting customers, 
                I bring calm to chaos and keep operations running smoothly.
              </p>
              <p className="text-base text-gray-500 italic">
                Based in Manila, Philippines 🇵🇭 • Working across time zones with a smile ☕
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, index) => (
              <Card key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
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
