'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const AliceOrchestrator = dynamic(
  () => import('./AliceOrchestrator'),
  { ssr: false }
);

export default function AliceOrchestratorWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Satisfy linter by pushing update to next tick
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AliceOrchestrator />,
    document.body
  );
}
