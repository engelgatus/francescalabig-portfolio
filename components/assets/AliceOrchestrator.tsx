'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
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

export default function AliceOrchestrator() {
  const { scrollY } = useScroll();

  const [mode, setMode] = useState<Mode>('SCROLL');
  const [aboutTop, setAboutTop] = useState<number | null>(null);
  const [skillsTop, setSkillsTop] = useState<number | null>(null);
  const [vh, setVh] = useState<number>(0);

  // 1. Mouse Tracking (Matches PerpetualAlice: Raw centered value, spring dampens it)
  const mouseX = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 30, damping: 20 });
  
  const loopTicker = useMotionValue(0);
  const bobTicker = useMotionValue(0); // Added for bob animation

  useEffect(() => {
    const measure = () => {
      setVh(window.innerHeight);

      const aboutEl = document.getElementById('about');
      const skillsEl = document.getElementById('skills');

      if (!aboutEl || !skillsEl) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const aboutRect = aboutEl.getBoundingClientRect();
      const skillsRect = skillsEl.getBoundingClientRect();

      setAboutTop(aboutRect.top + scrollTop);
      setSkillsTop(skillsRect.top + scrollTop);
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
      mouseX.set(centered); // Use raw centered pixel value like PerpetualAlice
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mode, mouseX]);

  useEffect(() => {
    if (mode !== 'LOOP') return;

    // A. Frame Loop (Exact same timing as PerpetualAlice)
    const frameControls = animate(loopTicker, ALICE_FRAMES.length, {
      duration: ALICE_FRAMES.length * 0.12, // 120ms per frame
      ease: 'linear',
      repeat: Infinity,
    });

    // B. Bobbing (Exact same timing as PerpetualAlice y: [0, 15, 0])
    const bobControls = animate(bobTicker, 1, {
      duration: 3, 
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror" // 0 -> 1 -> 0
    });

    return () => {
      frameControls.stop();
      bobControls.stop();
    };
  }, [mode, loopTicker, bobTicker]);

  const safeAboutTop = aboutTop ?? 0;
  const safeSkillsTop = skillsTop ?? safeAboutTop + 1;

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (skillsTop == null) return;
    setMode(latest >= safeSkillsTop ? 'LOOP' : 'SCROLL');
  });

  const scrollFrameIndex = useTransform(
    scrollY,
    [safeAboutTop, safeSkillsTop],
    [0, ALICE_FRAMES.length * 3]
  );

  const baseYScroll = useTransform(
    scrollY,
    [safeAboutTop, safeSkillsTop],
    [140, Math.max(180, vh * 0.22)]
  );

  // Map 0-1 ticker to 0-15px bob (Matches PerpetualAlice y: [0, 15, 0])
  const bobOffset = useTransform(bobTicker, [0, 1], [0, 15]);

  // Combined Y Logic: Preserves your scroll logic, adds bob ONLY in LOOP
  const y = useTransform([baseYScroll, bobOffset], ([scrollYVal, bob]: number[]) =>
    mode === 'LOOP' ? (vh ? vh * 0.22 + bob : 220 + bob) : scrollYVal
  );

  // X Logic: Map -1000/1000 screen width to -50/50px movement (Matches PerpetualAlice)
  const xLoop = useTransform(mouseXSpring, [-1000, 1000], [-50, 50]);
  const x = mode === 'LOOP' ? xLoop : 0;

  const scaleScroll = useTransform(scrollY, [safeAboutTop, safeSkillsTop], [1, 1.12]);
  const scaleRaw = useTransform(scaleScroll, (s) => (mode === 'LOOP' ? 1.18 : s));
  const scale = useSpring(scaleRaw, { stiffness: 120, damping: 20 });

  const zIndexRaw = useTransform(
    scrollY,
    [safeAboutTop, safeAboutTop + 300],
    [10, 50]
  );
  const zIndex = useTransform(zIndexRaw, (v) => Math.round(v));

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex }}
    >
      <div className="relative h-full w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="absolute right-6 md:right-12"
          style={{ x, y, scale }}
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
