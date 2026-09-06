import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, CheckCircle2, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

// ─── Experience Data ────────────────────────────────────────────────────────
const experiences = [
  {
    id: 'mern-intern',
    period: 'Apr 2026 — Jun 2026',
    badge: 'Full-Stack MERN',
    role: 'MERN Stack Intern',
    company: 'SocioClub SuperApp • No Ball Entertainments',
    Icon: Briefcase,
    accentColor: 'cyan',
    achievements: [
      'Built scalable RESTful APIs and optimized PostgreSQL schemas',
      'Integrated secure JWT authentication and RBAC permissions',
      'Developed interactive gamification features for the superapp',
    ],
    tags: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
  },
  {
    id: 'aiml-intern',
    period: 'Dec 2025 — Feb 2026',
    badge: 'AICTE Research Lab',
    role: 'AI/ML Research Intern',
    company: 'AICTE IDEALab • SRKR Engineering College',
    Icon: Sparkles,
    accentColor: 'violet',
    achievements: [
      'Engineered fraud detection pipeline resolving dataset class imbalance',
      'Applied Random Forest algorithms and feature selection benchmarks',
      'Presented and certified at Technology Centre I-Hub',
    ],
    tags: ['Python', 'scikit-learn', 'Pandas', 'Random Forest'],
  },
];

// ─── Color Map ───────────────────────────────────────────────────────────────
const colorMap = {
  cyan: {
    pulse: 'bg-accent-cyan',
    text: 'text-accent-cyan',
    badge: 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan',
    border: 'hover:border-accent-cyan/50',
    glow: 'hover:shadow-glow-cyan',
    line: 'via-accent-cyan/50',
    hover: 'group-hover:text-accent-cyan',
  },
  violet: {
    pulse: 'bg-accent-violet',
    text: 'text-accent-violet',
    badge: 'bg-accent-violet/10 border-accent-violet/30 text-accent-violet',
    border: 'hover:border-accent-violet/50',
    glow: 'hover:shadow-glow-violet',
    line: 'via-accent-violet/50',
    hover: 'group-hover:text-accent-violet',
  },
};

// ─── Single Experience Card ──────────────────────────────────────────────────
const ExperienceCard = ({ exp }) => {
  const c = colorMap[exp.accentColor];
  return (
    <div
      className={`group relative rounded-3xl bg-[#101016] border border-white/10 ${c.border} ${c.glow} p-6 sm:p-8 backdrop-blur-2xl shadow-[0_-16px_36px_rgba(0,0,0,0.92),0_12px_32px_rgba(0,0,0,0.6)] transition-all duration-300 w-full h-full flex flex-col justify-between`}
    >
      {/* Top glow line on hover */}
      <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent ${c.line} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div>
        {/* Top Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center space-x-2">
            <span className={`flex h-2.5 w-2.5 rounded-full ${c.pulse} animate-pulse`} />
            <span className={`font-mono text-xs uppercase tracking-widest ${c.text} font-bold`}>
              {exp.period}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full border text-[11px] font-grotesk font-medium ${c.badge}`}>
            {exp.badge}
          </span>
        </div>

        {/* Role & Company */}
        <h3 className={`font-syne font-extrabold text-2xl sm:text-3xl text-white ${c.hover} transition-colors`}>
          {exp.role}
        </h3>
        <div className="flex items-center space-x-2 text-slate-300 font-grotesk text-sm font-medium mt-1 mb-5">
          <exp.Icon size={15} className={`${c.text} flex-shrink-0`} />
          <span>{exp.company}</span>
        </div>

        {/* Achievements */}
        <div className="space-y-2.5 mb-5">
          {exp.achievements.map((a, i) => (
            <div key={i} className="flex items-start space-x-2.5">
              <CheckCircle2 size={15} className="text-accent-emerald flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300 font-sans">{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.08]">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-grotesk text-slate-400 group-hover:text-slate-200 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Main Timeline Component ─────────────────────────────────────────────────
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

  // Desktop scroll-linked animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const leftX  = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [-140, 0, 0, -140]);
  const rightX = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [140, 0, 0, 140]);
  const leftY  = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const rightY = useTransform(scrollYProgress, [0, 0.5, 1], [35, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.5, 1, 1, 0.5]);
  const scale  = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.97, 1, 1, 0.97]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-x-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-accent-violet/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <SectionHeader
        index="03"
        category="CAREER"
        title="WORK EXPERIENCE."
        subtitle="Software engineering internships across scalable MERN systems and AICTE research."
      />

      {/* ── Desktop: side-by-side animated 2-col grid ── */}
      {isDesktop && (
        <div className="grid grid-cols-2 gap-6 sm:gap-8 items-stretch">
          <motion.div style={{ x: leftX, y: leftY, opacity, scale }} className="h-full">
            <ExperienceCard exp={experiences[0]} />
          </motion.div>
          <motion.div style={{ x: rightX, y: rightY, opacity, scale }} className="h-full">
            <ExperienceCard exp={experiences[1]} />
          </motion.div>
        </div>
      )}

      {/* ── Mobile: sticky stacking overlay cards ── */}
      {!isDesktop && (
        <div className="relative flex flex-col pb-4">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              style={{
                top: `calc(4.5rem + ${idx * 1.5}rem)`,
                zIndex: (idx + 1) * 10,
                marginBottom: idx === experiences.length - 1 ? '0' : '2.5rem',
              }}
              className="sticky will-change-transform"
            >
              <ExperienceCard exp={exp} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Timeline;
