'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';

const ALICE_FRAMES = [
  'images/alice/alice-1.png',
  'images/alice/alice-2.png',
  'images/alice/alice-3.png',
  'images/alice/alice-4.png',
];

type Mode = 'SCROLL' | 'LOOP';

function AliceContent() {
  const { scrollY } = useScroll();

  const [mode, setMode] = useState<Mode>('SCROLL');
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash on mobile
  const [aboutTop, setAboutTop] = useState<number | null>(null);
  const [aboutBottom, setAboutBottom] = useState<number | null>(null);
  const [skillsTop, setSkillsTop] = useState<number | null>(null);
  const [skillsBottom, setSkillsBottom] = useState<number | null>(null);
  const [contactTop, setContactTop] = useState<number | null>(null);
  const [vh, setVh] = useState<number>(0);

  const mouseX = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 30, damping: 20 });
  
  const loopTicker = useMotionValue(0);
  const bobTicker = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      setVh(window.innerHeight);
      setIsMobile(window.innerWidth < 768); // Detect mobile

      const aboutEl = document.getElementById('about');
      const skillsEl = document.getElementById('skills');
      const contactEl = document.getElementById('contact');

      if (!aboutEl || !skillsEl || !contactEl) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      const aboutRect = aboutEl.getBoundingClientRect();
      const skillsRect = skillsEl.getBoundingClientRect();
      const contactRect = contactEl.getBoundingClientRect();

      setAboutTop(aboutRect.top + scrollTop);
      setAboutBottom(aboutRect.bottom + scrollTop);
      setSkillsTop(skillsRect.top + scrollTop);
      setSkillsBottom(skillsRect.bottom + scrollTop);
      setContactTop(contactRect.top + scrollTop);
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (mode !== 'LOOP') return;
      const centered = e.clientX - window.innerWidth / 2;
      mouseX.set(centered);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mode, mouseX]);

  useEffect(() => {
    if (mode !== 'LOOP') return;

    const frameControls = animate(loopTicker, ALICE_FRAMES.length, {
      duration: ALICE_FRAMES.length * 0.12,
      ease: 'linear',
      repeat: Infinity,
    });

    const bobControls = animate(bobTicker, 1, {
      duration: 3, 
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror"
    });

    return () => {
      frameControls.stop();
      bobControls.stop();
    };
  }, [mode, loopTicker, bobTicker]);

  const safeAboutTop = aboutTop ?? 0;
  const safeAboutBottom = aboutBottom ?? safeAboutTop + 800;
  const safeSkillsTop = skillsTop ?? safeAboutBottom;
  const safeSkillsBottom = skillsBottom ?? safeSkillsTop + 1000;
  const safeContactTop = contactTop ?? safeSkillsBottom;

  const aboutMiddle = safeAboutTop + ((safeAboutBottom - safeAboutTop) * 0.4);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (skillsTop == null) return;
    setMode(latest >= safeSkillsTop ? 'LOOP' : 'SCROLL');
  });

  const scrollFrameIndex = useTransform(
    scrollY,
    [safeAboutTop, safeSkillsTop],
    [0, ALICE_FRAMES.length * 3]
  );

  const landingY = vh * 0.22; 

  const baseYScroll = useTransform(
    scrollY,
    [safeAboutTop, safeSkillsTop],
    [140, landingY] 
  );

  const bobOffset = useTransform(bobTicker, [0, 1], [0, 15]);

  const y = useTransform([baseYScroll, bobOffset], ([scrollYVal, bob]: number[]) =>
    mode === 'LOOP' ? landingY + bob : scrollYVal
  );

  const xLoop = useTransform(mouseXSpring, [-1000, 1000], [-50, 50]);
  
  const xRaw = useTransform([mouseXSpring], () => {
     return mode === 'LOOP' ? xLoop.get() : -20; 
  });
  const x = useSpring(xRaw, { stiffness: 60, damping: 15 });

  const scaleScroll = useTransform(
    scrollY,
    [safeAboutTop, safeSkillsTop - 300, safeSkillsTop, safeSkillsBottom],
    [1, 1, 1.35, 0.9]
  );
  const scaleRaw = useTransform(scaleScroll, (s) => (mode === 'LOOP' ? s : s));
  const scale = useSpring(scaleRaw, { stiffness: 120, damping: 20 });

  // --- ADDED ROTATION LOGIC ---
  // Mimics FallingAlice: rotates from -5 to 15 degrees during the fall
  const rotateScroll = useTransform(
    scrollY,
    [safeAboutTop, safeSkillsTop],
    [-5, 15] 
  );
  
  // FIXED: Maintain 15 degrees (the landing angle) when in LOOP mode
  const rotateRaw = useTransform(rotateScroll, (r) => (mode === 'LOOP' ? 15 : r));
  
  // Apply spring for that "buttery smooth" feel
  const rotate = useSpring(rotateRaw, { stiffness: 60, damping: 20 });
  // ----------------------------

  const zIndexRaw = useTransform(
    scrollY,
    [
      safeAboutTop,
      aboutMiddle,
      safeContactTop - 200,
      safeContactTop
    ],
    [
      -20,
      20,
      20,
      -20
    ]
  );
  
  const zIndex = useTransform(zIndexRaw, (v) => Math.round(v));

  // --- MOBILE DISABLE FIX ---
  // If isMobile is true, return null immediately. 
  // This completely unmounts Alice on mobile screens.
  if (isMobile) return null;

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex }}
    >
      <div className="relative h-full w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="absolute right-6 md:right-40" 
          style={{ x, y, scale, rotate }}
        >
          <div className="relative w-75 h-100">
            {ALICE_FRAMES.map((src, index) => (
              <SpriteFrame
                key={src}
                src={src}
                index={index}
                mode={mode}
                scrollFrameIndex={scrollFrameIndex}
                loopTicker={loopTicker}
                total={ALICE_FRAMES.length}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SpriteFrame(props: {
  src: string;
  index: number;
  total: number;
  mode: Mode;
  scrollFrameIndex: MotionValue<number>;
  loopTicker: MotionValue<number>;
}) {
  const { src, index, total, mode, scrollFrameIndex, loopTicker } = props;

  const opacityScroll = useTransform(scrollFrameIndex, (v: number) => {
    const frame = Math.floor(v) % total;
    return frame === index ? 1 : 0;
  });

  const opacityLoop = useTransform(loopTicker, (v: number) => {
    const frame = Math.floor(v) % total;
    return frame === index ? 1 : 0;
  });

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity: mode === 'LOOP' ? opacityLoop : opacityScroll }}
    >
      <Image
        src={src}
        alt="Alice"
        fill
        sizes="300px"
        className="object-contain"
        priority
      />
    </motion.div>
  );
}

export default function AliceOrchestrator() {
  if (typeof window === 'undefined') return null;

  return createPortal(<AliceContent />, document.body);
}
