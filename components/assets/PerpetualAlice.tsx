'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// EXACT SAME ASSETS as About section for continuity
const ALICE_FRAMES = [
  'images/alice/alice-1.png',
  'images/alice/alice-2.png',
  'images/alice/alice-3.png',
  'images/alice/alice-4.png',
];

export default function PerpetualAlice({ className }: { className?: string }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  
  // 1. Mouse Tracking Logic (The "Elite" Interactive Feel)
  const mouseX = useMotionValue(0);
  // Soft spring physics so she doesn't jitter
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  
  // Map screen width to movement range (-50px to 50px)
  const x = useTransform(springX, [-1000, 1000], [-50, 50]);

  // 2. Perpetual Frame Loop (Auto-flail)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % ALICE_FRAMES.length);
    }, 120); // 120ms = ~8fps (classic animation feel)
    return () => clearInterval(interval);
  }, []);

  // 3. Global Mouse Listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 0 is center of screen
      const centeredX = e.clientX - window.innerWidth / 2;
      mouseX.set(centeredX);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX]);

  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ x }} // Apply horizontal parallax
      animate={{ 
        y: [0, 15, 0], // Gentle vertical bobbing (floating in zero-g)
      }}
      transition={{ 
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <div className="relative w-75 h-100">
        {ALICE_FRAMES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="Alice Perpetual Fall"
            fill
            sizes="300px"
            className={`object-contain transition-opacity duration-0 ${
              index === currentFrame ? 'opacity-100' : 'opacity-0'
            }`}
            priority
          />
        ))}
      </div>
    </motion.div>
  );
}
