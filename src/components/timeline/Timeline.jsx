import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

// ─── Experience Data ────────────────────────────────────────────────────────
const experiences = [
  {
    id: 'mern-intern',
    num: '01',
    period: 'Apr 2026 — Jun 2026',
    badge: 'Full-Stack MERN',
    role: 'MERN Stack Intern',
    company: 'SocioClub SuperApp • No Ball Entertainments',
    location: 'Remote Internship',
    description:
      'Developed scalable full-stack applications using React.js, Node.js, Express.js, and PostgreSQL for an expansive children’s learning and superapp ecosystem.',
    Icon: Briefcase,
    accentColor: 'cyan',
    achievements: [
      'Built scalable RESTful APIs, backend microservices, and optimized PostgreSQL schemas',
      'Integrated secure JWT authentication and Role-Based Access Control (RBAC) permissions',
      'Developed interactive gamification features and AI-assisted workflows for the superapp',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'RBAC', 'REST APIs'],
  },
  {
    id: 'aiml-intern',
    num: '02',
    period: 'Dec 2025 — Feb 2026',
    badge: 'AICTE Research Lab',
    role: 'AI/ML Research Intern',
    company: 'AICTE IDEALab • SRKR Engineering College',
    location: 'Research Lab • Bhimavaram',
    description:
      'Engineered an intelligent credit card fraud detection pipeline through 2 iterative development stages utilizing scikit-learn, Pandas, and feature engineering.',
    Icon: Sparkles,
    accentColor: 'violet',
    achievements: [
      'Engineered fraud detection pipeline resolving severe dataset class imbalance via SMOTE',
      'Applied Random Forest algorithms and benchmarked ROC-AUC and precision-recall metrics',
      'Presented and certified at Technology Centre I-Hub to faculty and industry evaluators',
    ],
    tags: ['Python', 'scikit-learn', 'Pandas', 'Random Forest', 'Machine Learning', 'Data Science'],
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
    line: 'via-accent-cyan/60',
    hover: 'group-hover:text-accent-cyan',
    chip: 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan',
  },
  violet: {
    pulse: 'bg-accent-violet',
    text: 'text-accent-violet',
    badge: 'bg-accent-violet/10 border-accent-violet/30 text-accent-violet',
    border: 'hover:border-accent-violet/50',
    glow: 'hover:shadow-glow-violet',
    line: 'via-accent-violet/60',
    hover: 'group-hover:text-accent-violet',
    chip: 'bg-accent-violet/10 border-accent-violet/20 text-accent-violet',
  },
};

// ─── Single Experience Card ──────────────────────────────────────────────────
const ExperienceCard = ({ exp, index, total }) => {
  const c = colorMap[exp.accentColor];
  return (
    <div
      className={`group relative rounded-3xl bg-[#0d0d14] border border-white/10 ${c.border} ${c.glow} p-6 sm:p-10 backdrop-blur-2xl shadow-[0_-20px_48px_rgba(0,0,0,0.92),0_24px_48px_rgba(0,0,0,0.85)] transition-all duration-300 w-full`}
    >
      {/* Top glow line on hover */}
      <div
        className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent ${c.line} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 sm:pb-5 mb-5 sm:mb-6">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs text-slate-500 font-bold tracking-wider">
            {exp.num} / {String(total).padStart(2, '0')}
          </span>
          <span className="text-white/20">•</span>
          <div className="flex items-center space-x-2">
            <span className={`flex h-2.5 w-2.5 rounded-full ${c.pulse} animate-pulse`} />
            <span className={`font-mono text-xs uppercase tracking-widest ${c.text} font-bold`}>
              {exp.period}
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full border text-xs font-grotesk font-medium ${c.badge}`}>
          {exp.badge}
        </span>
      </div>

      {/* Role & Company Details */}
      <div className="mb-5">
        <h3 className={`font-syne font-extrabold text-2xl sm:text-3xl text-white ${c.hover} transition-colors tracking-tight`}>
          {exp.role}
        </h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300 font-grotesk text-sm font-medium mt-1.5">
          <div className="flex items-center space-x-2">
            <exp.Icon size={16} className={`${c.text} flex-shrink-0`} />
            <span className="text-slate-200">{exp.company}</span>
          </div>
          {exp.location && (
            <div className="flex items-center space-x-1 text-slate-400 text-xs">
              <MapPin size={13} className="text-slate-500 flex-shrink-0" />
              <span>{exp.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description Summary */}
      {exp.description && (
        <p className="text-sm text-slate-300/90 font-sans leading-relaxed mb-5">
          {exp.description}
        </p>
      )}

      {/* Key Achievements */}
      <div className="space-y-2.5 mb-6">
        <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
          Key Contributions & Impact
        </h4>
        {exp.achievements.map((item, i) => (
          <div key={i} className="flex items-start space-x-2.5">
            <CheckCircle2 size={16} className="text-accent-emerald flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300 font-sans leading-normal">{item}</span>
          </div>
        ))}
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-grotesk text-slate-300 group-hover:text-white transition-colors"
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
  return (
    <section
      id="timeline"
      className="relative pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-x-clip"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-accent-violet/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <SectionHeader
        index="03"
        category="CAREER"
        title="WORK EXPERIENCE."
        subtitle="Software engineering internships across scalable MERN systems and AICTE research."
      />

      {/* ── Sticky Stacking Overlay Cards Deck ── */}
      <div className="relative max-w-4xl mx-auto flex flex-col pt-2 pb-8">
        {experiences.map((exp, idx) => (
          <div
            key={exp.id}
            style={{
              top: `calc(5.5rem + ${idx * 28}px)`,
              zIndex: idx + 10,
              marginBottom: idx === experiences.length - 1 ? '0' : '6rem',
            }}
            className="sticky will-change-transform"
          >
            <ExperienceCard exp={exp} index={idx} total={experiences.length} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
