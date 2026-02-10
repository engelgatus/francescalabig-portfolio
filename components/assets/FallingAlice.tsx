'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const ALICE_FRAMES = [
  'images/alice/alice-1.png',
  'images/alice/alice-2.png',
  'images/alice/alice-3.png',
  'images/alice/alice-4.png',
];

export default function FallingAlice({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Physics: Fall distance and Rotation
  const y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 15]);

  // Frame Indexer: Maps 0-1 scroll to 0-12 (cycling through 4 frames, 3 times)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, ALICE_FRAMES.length * 3]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Updated to canonical classes per linter */}
      <motion.div style={{ y, rotate }} className="relative w-75 h-100">
        {ALICE_FRAMES.map((src, index) => (
          <Frame 
            key={src} 
            src={src} 
            index={index} 
            totalFrames={ALICE_FRAMES.length} 
            inputRange={frameIndex} 
          />
        ))}
      </motion.div>
    </div>
  );
}

// Sub-component to isolate the transform logic per frame
function Frame({ 
  src, 
  index, 
  totalFrames, 
  inputRange 
}: { 
  src: string; 
  index: number; 
  totalFrames: number; 
  inputRange: MotionValue<number>;
}) {
  // Direct Transform: Returns 1 if this is the active frame, 0 otherwise
  // Runs purely on the animation loop (no React renders)
  const opacity = useTransform(inputRange, (latest) => {
    const currentFrame = Math.floor(latest) % totalFrames;
    return currentFrame === index ? 1 : 0;
  });

  return (
    <motion.div 
      style={{ opacity }} 
      className="absolute inset-0 w-full h-full"
    >
      <Image
        src={src}
        alt="Alice Falling"
        fill
        sizes="300px"
        className="object-contain"
        priority // Load all frames immediately to prevent whitespace blinking
      />
    </motion.div>
  );
}
