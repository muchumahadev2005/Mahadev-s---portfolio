import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';
import { useCursor } from '../../context/CursorContext';

export const ScrollIndicator = () => {
  const { setCursor, resetCursor } = useCursor();

  const handleScrollDown = () => {
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Magnetic strength={0.3}>
        <button
          onClick={handleScrollDown}
          onMouseEnter={() => setCursor('button', 'DOWN')}
          onMouseLeave={resetCursor}
          className="group flex flex-col items-center space-y-3 cursor-pointer select-none focus:outline-none"
          aria-label="Scroll to explore portfolio"
        >
          {/* Animated Mouse Capsule */}
          <div className="w-6 h-10 rounded-full border border-white/20 group-hover:border-accent-cyan transition-colors duration-300 flex justify-center p-1.5 bg-surface/40 backdrop-blur-sm">
            <motion.div
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0.2, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
            />
          </div>

          {/* Micro text */}
          <span className="text-[10px] font-grotesk uppercase tracking-[0.3em] text-slate-400 group-hover:text-accent-cyan transition-colors duration-300">
            Scroll to explore
          </span>
        </button>
      </Magnetic>
    </div>
  );
};

export default ScrollIndicator;
