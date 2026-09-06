import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

export const CustomCursor = () => {
  const { cursorText, cursorVariant } = useCursor();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device or reduced motion is preferred
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (checkTouch() || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const isExpanded = cursorVariant === 'project' || cursorVariant === 'drag' || cursorVariant === 'view';
  const isPointer = cursorVariant === 'pointer' || cursorVariant === 'button';

  return (
    <>
      {/* Center dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-accent-cyan mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isExpanded ? 0 : isPointer ? 1.5 : 1,
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
      />

      {/* Trailing Outer Ring / Badge */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full border will-change-transform ${
          isExpanded
            ? 'border-accent-violet/60 bg-obsidian-surface/90 text-[10px] font-grotesk font-bold tracking-widest text-accent-cyan shadow-glow-violet backdrop-blur-md'
            : isPointer
            ? 'border-accent-cyan/80 bg-accent-cyan/10'
            : 'border-white/30'
        }`}
        animate={{
          x: isExpanded ? mousePosition.x - 44 : isPointer ? mousePosition.x - 24 : mousePosition.x - 18,
          y: isExpanded ? mousePosition.y - 44 : isPointer ? mousePosition.y - 24 : mousePosition.y - 18,
          width: isExpanded ? 88 : isPointer ? 48 : 36,
          height: isExpanded ? 88 : isPointer ? 48 : 36,
          scale: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 300,
          mass: 0.2,
        }}
      >
        {isExpanded && cursorText && (
          <span className="uppercase select-none animate-pulse">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
