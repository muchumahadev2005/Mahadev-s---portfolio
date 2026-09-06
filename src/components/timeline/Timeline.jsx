import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Briefcase, CheckCircle2, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

export const Timeline = () => {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1:1 Direct scroll velocity tracking: moves directly with scroll speed without any spring lag
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Desktop: -140px / +140px. Mobile: -20px / +20px so text is never cut off
  const leftOffset = isDesktop ? -140 : -20;
  const rightOffset = isDesktop ? 140 : 20;

  // Fast, punchy entrance: completes in the first 14% of scroll directly following scroll velocity
  const leftX = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [leftOffset, 0, 0, leftOffset]);
  const rightX = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [rightOffset, 0, 0, rightOffset]);

  // Subtle layered vertical parallax
  const leftY = useTransform(scrollYProgress, [0, 0.5, 1], [isDesktop ? 25 : 10, 0, isDesktop ? -25 : -10]);
  const rightY = useTransform(scrollYProgress, [0, 0.5, 1], [isDesktop ? 35 : 15, 0, isDesktop ? -15 : -10]);

  // Dynamic opacity and scale
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.97, 1, 1, 0.97]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-accent-violet/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <SectionHeader
        index="03"
        category="CAREER"
        title="WORK EXPERIENCE."
        subtitle="Software engineering internships across scalable MERN systems and AICTE research."
      />

      {/* 2-Column Experience Grid with dynamic scroll-linked physics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* ============================================================ */}
        {/* 1. SocioClub SuperApp MERN Stack Internship (From Left)       */}
        {/* ============================================================ */}
        <motion.div
          style={{ x: leftX, y: leftY, opacity, scale }}
          className="group relative rounded-3xl bg-surface-elevated/85 border border-white/10 hover:border-accent-cyan/50 p-6 sm:p-8 backdrop-blur-2xl shadow-glass transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-cyan flex flex-col justify-between"
        >
          {/* Subtle Top Glowing Line */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div>
            {/* Top Meta: Dates & Category Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-accent-cyan animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan font-bold">
                  Apr 2026 — Jun 2026
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-[11px] font-grotesk text-accent-cyan font-medium">
                Full-Stack MERN
              </span>
            </div>

            {/* Role & Company */}
            <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white group-hover:text-accent-cyan transition-colors">
              MERN Stack Intern
            </h3>
            <div className="flex items-center space-x-2 text-slate-300 font-grotesk text-sm font-medium mt-1 mb-4">
              <Briefcase size={15} className="text-accent-violet flex-shrink-0" />
              <span>SocioClub SuperApp • No Ball Entertainments</span>
            </div>

            {/* Concise Impact Points (Theory removed) */}
            <div className="space-y-2 mb-5">
              {[
                'Built scalable RESTful APIs and optimized PostgreSQL schemas',
                'Integrated secure JWT authentication and RBAC permissions',
                'Developed interactive gamification features for the superapp',
              ].map((achievement, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 size={15} className="text-accent-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300 font-sans">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Badges Row */}
          <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-white/[0.08]">
            {['React.js', 'Node.js', 'Express', 'PostgreSQL', 'JWT'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-grotesk text-slate-400 group-hover:text-slate-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 2. AICTE IDEALab AI/ML Research Internship (From Right)      */}
        {/* ============================================================ */}
        <motion.div
          style={{ x: rightX, y: rightY, opacity, scale }}
          className="group relative rounded-3xl bg-surface-elevated/85 border border-white/10 hover:border-accent-violet/50 p-6 sm:p-7 backdrop-blur-2xl shadow-glass transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-violet flex flex-col justify-between"
        >
          {/* Subtle Top Glowing Line */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-accent-violet/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div>
            {/* Top Meta: Dates & Category Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-accent-violet animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-accent-violet font-bold">
                  Dec 2025 — Feb 2026
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-[11px] font-grotesk text-accent-violet font-medium">
                AICTE Research Lab
              </span>
            </div>

            {/* Role & Company */}
            <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white group-hover:text-accent-violet transition-colors">
              AI/ML Research Intern
            </h3>
            <div className="flex items-center space-x-2 text-slate-300 font-grotesk text-sm font-medium mt-1 mb-4">
              <Sparkles size={15} className="text-accent-cyan flex-shrink-0" />
              <span>AICTE IDEALab • SRKR Engineering College</span>
            </div>

            {/* Concise Impact Points (Theory removed) */}
            <div className="space-y-2 mb-5">
              {[
                'Engineered fraud detection pipeline resolving dataset class imbalance',
                'Applied Random Forest algorithms and feature selection benchmarks',
                'Presented and certified at Technology Centre I-Hub',
              ].map((achievement, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 size={15} className="text-accent-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300 font-sans">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Badges Row */}
          <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-white/[0.08]">
            {['Python', 'scikit-learn', 'Pandas', 'Random Forest'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-grotesk text-slate-400 group-hover:text-slate-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
