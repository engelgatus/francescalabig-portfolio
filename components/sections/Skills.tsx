'use client';

import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { SKILLS } from '@/lib/constants';

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-amber-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What I Can Do</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A versatile skill set built through years of supporting diverse businesses and teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {SKILLS.map((skillGroup, index) => (
            <Card key={index} hover className="flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2 flex-1">
                {skillGroup.items.map((skill, skillIndex) => (
                  <li 
                    key={skillIndex}
                    className="text-gray-600 flex items-start"
                  >
                    <span className="text-pink-500 mr-2">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
