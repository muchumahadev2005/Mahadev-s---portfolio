import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({ index, category, title, subtitle }) => {
  return (
    <div className="mb-6 sm:mb-10">
      {/* Index & Category Badge — only shown when index is provided */}
      {index && (
        <div className="flex items-center space-x-2.5 mb-2 sm:mb-3 font-grotesk text-[11px] sm:text-xs uppercase tracking-widest text-accent-cyan font-semibold">
          <span className="text-accent-violet font-mono font-bold">[{index}]</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
          <span className="text-slate-400">{category}</span>
        </div>
      )}

      {/* Main Responsive Heading - Modern Space Grotesk on mobile, Syne on desktop */}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        className="font-grotesk md:font-syne text-[1.85rem] xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-normal [word-spacing:0.12em] uppercase leading-[1.15] sm:leading-tight"
      >
        <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 md:to-white bg-clip-text text-transparent md:text-white">
          {title}
        </span>
      </motion.h2>

      {/* Optional Concise Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-400 font-sans max-w-xl font-normal leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Subtle Horizontal Divider */}
      <div className="mt-4 sm:mt-6 w-full h-[1px] bg-gradient-to-r from-white/15 via-accent-violet/30 to-transparent" />
    </div>
  );
};

export default SectionHeader;
