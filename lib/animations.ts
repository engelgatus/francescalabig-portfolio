import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const setupHeroPinning = (
  heroRef: React.RefObject<HTMLElement | null>,
  contentRef: React.RefObject<HTMLElement | null>
) => {
  if (!heroRef.current || !contentRef.current) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      pinSpacing: false, // Critical: Allows the next section to overlap
    },
  });

  // Optional: Parallax effect for hero content (moves slower than scroll)
  tl.to(contentRef.current, {
    y: 100, // Move content down slightly as we scroll
    opacity: 0, // Fade out content
    scale: 0.95, // Slight shrink
    ease: "none",
  });

  return tl;
};
