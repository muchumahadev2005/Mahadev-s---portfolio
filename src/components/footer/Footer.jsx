import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import Magnetic from '../common/Magnetic';
import { useCursor } from '../../context/CursorContext';
import { personalData } from '../../data/portfolioData';

export const Footer = () => {
  const { setCursor, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-obsidian-deep pt-6 sm:pt-8 pb-12 overflow-hidden select-none">
      {/* Giant Kinetic Footer Marquee Strip */}
      <div className="w-full overflow-hidden py-5 sm:py-6 border-b border-white/[0.06] mb-12">
        <div className="flex w-max space-x-8 animate-marquee">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="flex items-center space-x-8 text-white/20 whitespace-nowrap">
              <span className="font-syne font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter hover:text-white transition-colors duration-300">
                MUCHU MAHADEV
              </span>
              <span className="text-accent-violet text-3xl">✦</span>
              <span className="font-syne font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter hover:text-accent-cyan transition-colors duration-300">
                SOFTWARE DEVELOPER
              </span>
              <span className="text-accent-cyan text-3xl">✦</span>
              <span className="font-syne font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter hover:text-accent-emerald transition-colors duration-300">
                FULL-STACK & SYSTEMS
              </span>
              <span className="text-accent-violet text-3xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand Monogram & Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
          <div className="flex items-center space-x-2 font-syne font-bold text-xl text-white">
            <span className="w-3 h-3 rounded-full bg-accent-violet" />
            <span>{personalData.name}</span>
          </div>
          <p className="text-xs font-grotesk text-slate-500">
            © {new Date().getFullYear()} Muchu Mahadev. Engineered with React 18, Three.js, GSAP & Lenis.
          </p>
        </div>

        {/* Center: Recognition Note */}
        <div className="hidden lg:flex items-center space-x-2 text-xs font-grotesk text-slate-400 bg-white/[0.03] px-4 py-2 rounded-full border border-white/[0.08]">
          <Sparkles size={14} className="text-accent-cyan" />
          <span>Awwwards Site of the Day Standard Architecture</span>
        </div>

        {/* Right: Magnetic Back to Top Trigger */}
        <Magnetic strength={0.4}>
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursor('button', 'TOP')}
            onMouseLeave={resetCursor}
            className="group flex items-center space-x-3 px-6 py-3 rounded-full bg-surface-elevated border border-white/10 hover:border-accent-cyan text-white text-xs uppercase tracking-widest font-grotesk font-semibold transition-all duration-300 hover:shadow-glow-cyan"
            aria-label="Back to top of page"
          >
            <span>Back To Top</span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent-cyan group-hover:text-obsidian transition-colors">
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </Magnetic>
      </div>
    </footer>
  );
};

export default Footer;
