import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Terminal, Code2, ShieldCheck, Database, GraduationCap, FileDown, Layers } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Counter from './Counter';
import Magnetic from '../common/Magnetic';
import { useCursor } from '../../context/CursorContext';
import { personalData } from '../../data/portfolioData';

export const About = () => {
  const { setCursor, resetCursor } = useCursor();
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1:1 Direct scroll tracking: moves directly with scroll speed without any spring lag
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Desktop: -160px / +160px. Mobile: -28px / +28px
  const leftOffset = isDesktop ? -160 : -28;
  const rightOffset = isDesktop ? 160 : 28;

  // Direct 1:1 scroll-linked entrance: visibly glides in from left and right as you scroll down into view
  const leftX = useTransform(scrollYProgress, [0.08, 0.46, 0.54, 0.92], [leftOffset, 0, 0, leftOffset]);
  const rightX = useTransform(scrollYProgress, [0.08, 0.46, 0.54, 0.92], [rightOffset, 0, 0, rightOffset]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0.3, 1, 1, 0.3]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative pt-12 sm:pt-16 pb-4 sm:pb-8 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-[380px] h-[380px] bg-accent-violet/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-accent-cyan/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Section Header */}
      <SectionHeader
        index="01"
        category="ABOUT ME"
        title="ENGINEERING FOCUS."
        subtitle="Computer Science undergrad at SRKR Engineering College building scalable web platforms."
      />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Focused Profile, Engineering Pillars, Academic Snapshot & Counters (7 cols) - Slides from LEFT according to scroll */}
        <motion.div
          style={{ x: leftX, opacity }}
          className="lg:col-span-7 flex flex-col space-y-6"
        >
          {/* Punchy Concise Lead Statement */}
          <div className="p-6 rounded-2xl bg-surface-elevated/80 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-glass">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-emerald" />
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-mono text-accent-cyan mb-2.5">
              <Terminal size={14} />
              <span>Full-Stack & Systems Engineering</span>
            </div>
            <p className="font-syne text-base sm:text-lg text-white font-medium leading-relaxed">
              Crafting high-throughput backend services and secure web applications. Focused on Node.js microservices, relational PostgreSQL schemas, and modern React interfaces with AI-integrated workflows.
            </p>
          </div>

          {/* 3 Core Engineering Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              {
                icon: Code2,
                title: 'Backend Systems',
                desc: 'Node.js, Express RESTful microservices, and clean system architecture.',
                color: 'text-accent-cyan',
                border: 'hover:border-accent-cyan/40',
              },
              {
                icon: Database,
                title: 'Database Design',
                desc: 'PostgreSQL schema optimization, MongoDB datastores, and sub-second queries.',
                color: 'text-accent-emerald',
                border: 'hover:border-accent-emerald/40',
              },
              {
                icon: ShieldCheck,
                title: 'Hardened Security',
                desc: 'JWT, RBAC access matrices, OAuth protocols, and data protection.',
                color: 'text-accent-violet',
                border: 'hover:border-accent-violet/40',
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className={`p-4 rounded-xl bg-surface/70 border border-white/[0.08] ${pillar.border} transition-all duration-300 backdrop-blur-md flex flex-col justify-between`}
              >
                <pillar.icon size={20} className={`${pillar.color} mb-2.5`} />
                <div>
                  <h4 className="font-syne font-bold text-white text-sm mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Academic Snapshot Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-elevated/60 border border-white/10 backdrop-blur-md hover:border-accent-cyan/30 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-white text-sm sm:text-base">
                    B.Tech in Computer Science & Engineering (Design)
                  </h4>
                  <p className="text-xs text-slate-400 font-grotesk">
                    SRKR Engineering College • 2023 — Expected Apr 2027
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-2.5 py-1 rounded-full">
                CGPA: 8.30 / 10.0
              </span>
            </div>
          </div>

          {/* Key Metric Counters */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {personalData.stats.map((stat) => (
              <Counter
                key={stat.label}
                targetValue={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Column: Interactive Holographic Developer ID Card (5 cols) - Slides from RIGHT according to scroll */}
        <motion.div
          style={{ x: rightX, opacity }}
          className="lg:col-span-5 relative group"
        >
          {/* Ambient Glow Aura */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-accent-violet/30 via-accent-cyan/20 to-accent-emerald/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

          {/* Card Frame */}
          <div className="rounded-3xl bg-surface-elevated/90 border border-white/15 p-5 sm:p-6 backdrop-blur-2xl shadow-glass flex flex-col space-y-5">
            {/* Header: Verified Status */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <div className="flex items-center space-x-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-accent-emerald animate-pulse" />
                <span className="font-grotesk text-xs uppercase tracking-wider text-slate-300 font-semibold">
                  Identity // Verified
                </span>
              </div>
              <span className="font-mono text-[10px] text-accent-cyan bg-accent-cyan/10 px-2.5 py-0.5 rounded-full border border-accent-cyan/30 font-semibold">
                DEV-SRKR-MM
              </span>
            </div>

            {/* Profile Avatar Frame */}
            <div
              onMouseEnter={() => setCursor('project', 'PROFILE')}
              onMouseLeave={resetCursor}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-accent-violet/50 transition-colors duration-500"
            >
              <img
                src={personalData.avatar || "/profile.jpg"}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                }}
                alt={personalData.name}
                className="w-full h-full object-cover object-center filter contrast-125 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              {/* Subtle vignette gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />

              {/* Floating Bottom Label */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div>
                  <div className="font-syne font-bold text-white text-base tracking-tight">
                    {personalData.name}
                  </div>
                  <div className="font-grotesk text-[11px] text-accent-cyan">
                    {personalData.role} • Bhimavaram, India
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <ShieldCheck size={16} className="text-accent-emerald" />
                </div>
              </div>
            </div>

            {/* Capability Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Node.js & Express.js',
                'React.js & Tailwind',
                'PostgreSQL & MongoDB',
                'Docker & Git',
                'JWT & RBAC Security',
                'RESTful API Architecture',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-grotesk text-slate-300 hover:border-accent-cyan/40 hover:text-accent-cyan transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Resume Download CTA */}
            <div className="pt-2 border-t border-white/10">
              <Magnetic strength={0.3} className="w-full">
                <a
                  href={personalData.resumeUrl}
                  download="Muchu_Mahadev_Resume.pdf"
                  onMouseEnter={() => setCursor('pointer', 'PDF')}
                  onMouseLeave={resetCursor}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-accent-violet/20 hover:bg-accent-violet border border-accent-violet/50 hover:border-accent-violet text-white text-xs uppercase tracking-wider font-grotesk font-semibold transition-all duration-300 hover:shadow-glow-violet"
                >
                  <FileDown size={15} />
                  <span>Download Curriculum Vitae</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
