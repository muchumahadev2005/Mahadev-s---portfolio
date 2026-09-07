import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Awwwards-grade kinetic preloader:
 * Smoothly interpolates counter from 00 to 100%, displays system status,
 * and performs a dual curtain split reveal.
 */
export const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, finish almost immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsFinished(true);
      onComplete?.();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      // Non-linear acceleration for dynamic pacing
      const increment = Math.max(1, Math.floor((100 - current) / 7));
      current += increment;

      if (current >= 100) {
        current = 100;
        setCount(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 400);
      } else {
        setCount(current);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col justify-between p-8 sm:p-16 bg-[#060608] text-white select-none pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between font-grotesk text-xs tracking-[0.25em] text-slate-400 uppercase">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-accent-violet animate-ping" />
              <span>Muchu Mahadev // Portfolio 2026</span>
            </div>
            <div className="hidden sm:block text-slate-500">
              Software Developer & Full-Stack Engineer
            </div>
          </div>

          {/* Center Title & Counter */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="overflow-hidden mb-2">
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-xs uppercase tracking-[0.4em] text-accent-cyan font-grotesk"
              >
                Initializing Experience
              </motion.div>
            </div>

            <div className="font-grotesk sm:font-syne font-extrabold text-7xl sm:text-9xl tracking-tighter text-white flex items-baseline">
              <span className="tabular-nums">
                {count < 10 ? `0${count}` : count}
              </span>
              <span className="text-2xl sm:text-4xl text-accent-violet ml-2">%</span>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-emerald"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between font-grotesk text-[11px] text-slate-500 uppercase tracking-widest">
            <span>Awwwards SOTD Standards</span>
            <span>WebGL • GSAP • Lenis</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
