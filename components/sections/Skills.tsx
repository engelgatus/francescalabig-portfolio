'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import { SKILLS } from '@/lib/constants';
import PerpetualAlice from '@/components/assets/PerpetualAlice'; // Import Alice

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Matches lg breakpoint
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalSkills = SKILLS.length;
    const newIndex = Math.min(
      Math.floor(latest * totalSkills),
      totalSkills - 1
    );
    setActiveIndex(newIndex);
  });

  const currentSkillGroup = SKILLS[activeIndex] || SKILLS[0];

  return (
    <section ref={containerRef} id="skills" className="relative h-[300vh] bg-canvas z-10">
      
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <Container className="w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full relative">
            
            <div className="col-span-1 lg:col-span-6 lg:pl-12 z-20">
               <div className="mb-12">
                  <h2 className="text-xl font-primary uppercase tracking-widest text-ink/40 mb-4">
                    What I Can Do
                  </h2>
                  
                  <AnimatePresence mode="wait">
                    <motion.h3 
                      key={currentSkillGroup.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="text-5xl md:text-6xl font-primary font-bold text-ink"
                    >
                      {currentSkillGroup.category}
                    </motion.h3>
                  </AnimatePresence>
               </div>

               <div className="min-h-50">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
                      }}
                      className="flex flex-wrap gap-3"
                    >
                      {currentSkillGroup.items.map((skill) => (
                        <motion.span 
                          key={skill}
                          variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: { opacity: 1, scale: 1 }
                          }}
                          className="
                            px-4 py-2 rounded-lg
                            bg-white/80 border border-ink/10 backdrop-blur-sm
                            text-ink/80 font-medium
                            shadow-sm
                          "
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                 </AnimatePresence>
               </div>
            </div>

            {/* Right Column: Background Glow + Mobile Alice */}
            <div className="col-span-1 lg:col-span-6 flex justify-center items-center h-full relative z-10">
              <div className="absolute w-150 h-150 bg-gradient-radial from-alice/10 to-transparent opacity-50 blur-3xl" />
              
              {/* MOBILE ONLY ALICE:
                  - Only renders if isMobile is true (width < 1024px)
                  - Placed exactly where the Orchestrator Alice WOULD have been on desktop
              */}
              {isMobile && (
                <div className="relative z-20 mt-8 lg:mt-0 scale-200 top-[-70] right-[-40]">
                  <PerpetualAlice className="opacity-90" />
                </div>
              )}
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
}
