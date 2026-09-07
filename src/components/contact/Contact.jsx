import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, Clock, MapPin, Copy, Check, FileDown, ArrowUpRight, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import ContactForm from './ContactForm';
import Magnetic from '../common/Magnetic';
import { useCursor } from '../../context/CursorContext';
import { personalData } from '../../data/portfolioData';

export const Contact = () => {
  const { setCursor, resetCursor } = useCursor();
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1:1 Continuous scroll-linked motion: reacts to scroll up and down
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Snappy responsive physics: locks directly to scroll speed without dragging lag
  const snappyProgress = useSpring(scrollYProgress, {
    stiffness: 380,
    damping: 38,
    mass: 0.35,
    restDelta: 0.0005,
  });

  // Desktop: -100px / +100px. Mobile: -16px / +16px
  const leftOffset = isDesktop ? -100 : -16;
  const rightOffset = isDesktop ? 100 : 16;

  // Fast responsive entrance, settles quickly and stays locked for reading
  const leftX = useTransform(snappyProgress, [0, 0.12, 0.88, 1], [leftOffset, 0, 0, leftOffset]);
  const rightX = useTransform(snappyProgress, [0, 0.12, 0.88, 1], [rightOffset, 0, 0, rightOffset]);
  const contactOpacity = useTransform(snappyProgress, [0, 0.08, 0.92, 1], [0.4, 1, 1, 0.4]);
  const contactScale = useTransform(snappyProgress, [0, 0.12, 0.88, 1], [0.97, 1, 1, 0.97]);

  // Live San Francisco Clock
  useEffect(() => {
    const updateClock = () => {
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: personalData.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date());
      setLocalTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative pt-10 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-violet/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Section Header */}
      <SectionHeader
        index="06"
        category="CONTACT"
        title="LET'S CONNECT."
        subtitle="Available for software developer roles and technical collaborations."
      />

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        {/* Left Column: Direct Coordinates & Status (5 cols) - Glides from Left */}
        <motion.div
          style={{ x: leftX, opacity: contactOpacity, scale: contactScale }}
          className="lg:col-span-5 space-y-5 will-change-transform"
        >
          {/* Direct Email Card with Copy Trigger */}
          <div className="p-5 sm:p-7 rounded-3xl bg-surface-elevated/80 border border-white/10 backdrop-blur-xl shadow-glass space-y-3">
            <span className="text-[11px] font-grotesk uppercase tracking-wider text-slate-400">
              Direct Contact Line
            </span>
            <div className="flex items-center justify-between gap-4">
              <a
                href={`mailto:${personalData.email}`}
                className="font-grotesk sm:font-syne font-bold text-base sm:text-base md:text-lg text-white hover:text-accent-cyan transition-colors truncate"
              >
                {personalData.email}
              </a>
              <Magnetic strength={0.3}>
                <button
                  onClick={copyEmail}
                  onMouseEnter={() => setCursor('pointer', copied ? 'COPIED' : 'COPY')}
                  onMouseLeave={resetCursor}
                  className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-accent-emerald" /> : <Copy size={16} />}
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Direct Phone Card */}
          {personalData.phone && (
            <div className="p-6 sm:p-8 rounded-3xl bg-surface/60 border border-white/10 backdrop-blur-xl space-y-4">
              <span className="text-[11px] font-grotesk uppercase tracking-wider text-slate-400">
                Direct Phone / WhatsApp
              </span>
              <div className="flex items-center justify-between gap-4">
                <a
                  href={`tel:${personalData.phone.replace(/\s+/g, '')}`}
                  className="font-grotesk sm:font-syne font-bold text-base sm:text-base md:text-lg text-white hover:text-accent-emerald transition-colors"
                >
                  {personalData.phone}
                </a>
                <Magnetic strength={0.3}>
                  <a
                    href={`tel:${personalData.phone.replace(/\s+/g, '')}`}
                    onMouseEnter={() => setCursor('pointer', 'CALL')}
                    onMouseLeave={resetCursor}
                    className="p-3 rounded-xl bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 text-accent-emerald transition-colors flex-shrink-0"
                    aria-label="Call direct phone"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </Magnetic>
              </div>
            </div>
          )}

          {/* Timezone & Location Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface/60 border border-white/10 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between text-xs font-grotesk">
              <div className="flex items-center space-x-2 text-slate-400">
                <Clock size={15} className="text-accent-cyan" />
                <span>India Standard Time (IST)</span>
              </div>
              <span className="font-mono text-white font-bold tracking-wider">
                {localTime || '11:05 PM IST'}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs font-grotesk text-slate-400 pt-2 border-t border-white/[0.08]">
              <MapPin size={14} className="text-accent-violet" />
              <span>{personalData.location}</span>
            </div>
          </div>

          {/* Resume / CV Direct Download Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-elevated/60 border border-accent-violet/30 backdrop-blur-xl flex items-center justify-between gap-4 group">
            <div>
              <h4 className="font-grotesk sm:font-syne font-bold text-white text-base">
                Curriculum Vitae
              </h4>
              <p className="text-xs text-slate-400 font-grotesk mt-0.5">
                PDF • Complete Full-Stack & Academic Portfolio
              </p>
            </div>

            <Magnetic strength={0.3}>
              <a
                href={personalData.resumeUrl}
                download="Muchu_Mahadev_Resume.pdf"
                onMouseEnter={() => setCursor('pointer', 'PDF')}
                onMouseLeave={resetCursor}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-accent-violet/20 hover:bg-accent-violet border border-accent-violet/50 text-white font-grotesk text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:shadow-glow-violet"
              >
                <FileDown size={14} />
                <span>Download</span>
              </a>
            </Magnetic>
          </div>

          {/* Social Links Matrix */}
          <div className="pt-2">
            <span className="text-[11px] font-grotesk uppercase tracking-wider text-slate-400 block mb-3">
              Social Networks
            </span>
            <div className="flex flex-wrap gap-2.5">
              {personalData.socials.map((s) => (
                <Magnetic key={s.name} strength={0.25}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setCursor('pointer', s.name.slice(0, 4))}
                    onMouseLeave={resetCursor}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-accent-cyan/50 text-slate-300 hover:text-white text-xs font-grotesk transition-all duration-200"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight size={12} className="text-slate-500" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form (7 cols) - Glides from Right */}
        <motion.div
          style={{ x: rightX, opacity: contactOpacity, scale: contactScale }}
          className="lg:col-span-7 will-change-transform"
        >
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-elevated/85 border border-white/10 backdrop-blur-2xl shadow-glass">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
