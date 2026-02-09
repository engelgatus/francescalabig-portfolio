'use client';

import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { SKILLS } from '@/lib/constants';

export default function Skills() {
  return (
    // bg-canvas matches the site's main theme (Off-white)
    <section id="skills" className="relative py-24 bg-canvas z-10">
      
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ink">What I Can Do</h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
            A versatile toolkit to help your business thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {SKILLS.map((skillGroup, index) => (
            <Card 
              key={index} 
              hover 
              className="flex flex-col h-full bg-paper border border-ink/5 hover:border-alice/20 transition-colors"
            >
              {/* Card Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-ink">
                  {skillGroup.category}
                </h3>
                <div className="h-1 w-12 bg-heart/30 rounded-full mt-3" />
              </div>

              {/* Skills as "Pills" instead of List */}
              <div className="flex flex-wrap gap-2 content-start flex-1">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="
                      inline-flex items-center px-3 py-1.5 
                      rounded-lg text-sm font-medium
                      bg-alice/5 text-ink/80
                      hover:bg-alice/10 hover:text-alice
                      transition-colors cursor-default
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
