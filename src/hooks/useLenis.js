import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to manage scrolling:
 * - On desktop mouse wheels: buttery smooth Lenis damping.
 * - On mobile & touch screens: 100% normal native touch scroll with instant 1:1 finger tracking,
 *   native inertia, rubber-banding, and zero touch hijacking.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Normal touch scroll detection: Detect touchscreens or mobile viewports
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 1024;

    // If reduced motion is preferred or user is on mobile/touch device,
    // use 100% native mobile touch scroll!
    if (prefersReducedMotion || (isTouch && isMobile)) {
      ScrollTrigger.refresh();
      return;
    }

    // Initialize Lenis strictly for mouse wheel smoothing on desktop
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Critical: do NOT intercept or hijack touch scroll
      touchMultiplier: 0, // Zero artificial touch multipliers
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Synchronize Lenis scroll position with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Integrate with GSAP ticker for 60fps / 120fps synchronization
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  return lenisRef;
}

export default useLenis;
