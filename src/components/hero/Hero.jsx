import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Github, Twitter, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';
import Magnetic from '../common/Magnetic';
import ScrollIndicator from './ScrollIndicator';
import HeroCanvas from './HeroCanvas';
import { useCursor } from '../../context/CursorContext';
import { personalData } from '../../data/portfolioData';

export const Hero = () => {
  const { setCursor, resetCursor } = useCursor();

  // Physics-driven gravity drop variants: names and elements fall from top into their places
  const dropFromTop = {
    hidden: { y: -160, opacity: 0, scale: 0.94 },
    visible: (delay = 0) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 110,
        mass: 0.85,
        delay,
      },
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1],
        delay,
      },
    }),
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] lg:min-h-screen w-full flex flex-col justify-center lg:justify-between pt-16 sm:pt-24 lg:pt-32 pb-6 sm:pb-10 px-4 sm:px-12 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Three.js Interactive Particle Sphere Canvas */}
      <HeroCanvas />

      {/* Atmospheric Radial Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-accent-violet/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Hero Main Content Area: Responsive Grid */}
      {/* Desktop: Text on Left (col-span-7), Big Profile Picture on Right (col-span-5) */}
      {/* Mobile: Big Profile Picture FIRST on Top (order-1), then Name & Role directly downside (order-2) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center lg:my-auto">
        {/* ============================================================ */}
        {/* PROFILE PICTURE: Order-1 on Mobile (Centered), Right on Desktop */}
        {/* ============================================================ */}
        <motion.div
          custom={0.15}
          variants={dropFromTop}
          initial="hidden"
          animate="visible"
          className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center w-full"
        >
          {/* Glowing Aura & Profile Picture */}
          <div className="relative group">
            {/* Ambient Radial Glow */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-tr from-accent-violet/50 via-accent-cyan/40 to-accent-emerald/30 blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Profile Avatar Frame - Large, prominent, and bold */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full p-[4px] bg-gradient-to-tr from-accent-violet via-accent-cyan to-accent-emerald shadow-[0_0_45px_rgba(6,182,212,0.35)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-obsidian-deep">
                <img
                  src={personalData.avatar || "/profile.jpg"}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                  }}
                  alt={personalData.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
              </div>
            </div>

            {/* Online Green Pulsing Indicator Badge */}
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-4 lg:right-4 flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-obsidian/90 border border-white/20 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-emerald" />
              </span>
              <span className="font-mono text-[10px] text-accent-emerald font-semibold uppercase tracking-wider hidden sm:inline">
                Available
              </span>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* TEXT CONTENT: Order-2 on Mobile (Downside of pic), Left on Desktop */}
        {/* ============================================================ */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4 w-full">
          {/* Eyebrow location badge */}
          <motion.div
            custom={0.2}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-grotesk tracking-wider uppercase text-accent-cyan"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            <span>{personalData.location}</span>
          </motion.div>

          {/* Gravity Drop Heading: MUCHU falls first, then MAHADEV */}
          <div className="overflow-visible space-y-0.5 w-full flex flex-col items-center lg:items-start">
            {/* MUCHU drops from top */}
            <motion.div
              custom={0.25}
              variants={dropFromTop}
              initial="hidden"
              animate="visible"
              className="font-syne font-extrabold text-[clamp(2.35rem,8.5vw,5.5rem)] leading-[0.92] tracking-tight text-white uppercase break-words"
            >
              MUCHU
            </motion.div>

            {/* MAHADEV drops from top */}
            <motion.div
              custom={0.4}
              variants={dropFromTop}
              initial="hidden"
              animate="visible"
              className="font-syne font-extrabold text-[clamp(2.35rem,8.5vw,5.5rem)] leading-[0.92] tracking-tight uppercase break-words text-gradient-violet"
            >
              MAHADEV
            </motion.div>
          </div>

          {/* Clean Single Role: Software Developer */}
          <motion.div
            custom={0.55}
            variants={dropFromTop}
            initial="hidden"
            animate="visible"
            className="font-syne font-bold text-base sm:text-xl md:text-2xl tracking-wide text-accent-cyan uppercase"
          >
            Software Developer
          </motion.div>

          {/* Clean Summary to cover gap with proper spacing */}
          <motion.p
            custom={0.65}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="max-w-md text-xs sm:text-sm text-slate-300 font-sans leading-relaxed font-light"
          >
            Computer Science undergraduate at SRKR Engineering College engineering resilient web applications, secure backend APIs, and modern systems.
          </motion.p>

          {/* Clean 2-Button Hero CTAs: Side-by-Side Equal Width on Mobile */}
          <motion.div
            custom={0.75}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="pt-2 grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-4 w-full sm:w-auto justify-center lg:justify-start"
          >
            <Magnetic strength={0.3} className="w-full sm:w-auto">
              <button
                onClick={scrollToProjects}
                onMouseEnter={() => setCursor('button', 'WORK')}
                onMouseLeave={resetCursor}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 sm:px-8 py-3 sm:py-3.5 rounded-2xl sm:rounded-full bg-white text-obsidian font-grotesk font-bold text-xs uppercase tracking-wider hover:bg-accent-cyan transition-all duration-300 shadow-glow-cyan"
              >
                <span>Projects</span>
                <ArrowDownRight size={15} />
              </button>
            </Magnetic>

            <Magnetic strength={0.3} className="w-full sm:w-auto">
              <button
                onClick={scrollToContact}
                onMouseEnter={() => setCursor('button', 'CONTACT')}
                onMouseLeave={resetCursor}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 sm:px-8 py-3 sm:py-3.5 rounded-2xl sm:rounded-full bg-surface-elevated/90 border border-white/15 hover:border-accent-violet/60 text-white font-grotesk font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-glow-violet backdrop-blur-md"
              >
                <span>Contact</span>
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Meta & Scroll Prompt - Desktop Bar */}
      <div className="w-full mt-6 sm:mt-8 lg:mt-0 pt-4 sm:pt-6 border-t border-white/[0.08] hidden lg:flex items-end justify-between">
        {/* Social Coordinates on Desktop */}
        <div className="flex items-center space-x-3">
          {personalData.socials.slice(0, 4).map((social) => (
            <Magnetic key={social.name} strength={0.3}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor('pointer', social.name.slice(0, 4))}
                onMouseLeave={resetCursor}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 hover:text-accent-cyan hover:border-accent-cyan/50 hover:bg-white/[0.08] transition-all duration-200"
                aria-label={social.name}
              >
                {social.name === 'GitHub' && <Github size={16} />}
                {social.name.includes('Twitter') && <Twitter size={16} />}
                {social.name === 'LinkedIn' && <Linkedin size={16} />}
                {social.name === 'Email' && <Mail size={16} />}
                {social.name === 'Phone' && <Phone size={16} />}
                {social.name !== 'GitHub' && !social.name.includes('Twitter') && social.name !== 'LinkedIn' && social.name !== 'Email' && social.name !== 'Phone' && <ExternalLink size={16} />}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Central Scroll Indicator */}
        <div className="mx-auto">
          <ScrollIndicator />
        </div>

        {/* Tech Stack Highlights */}
        <div className="flex items-center space-x-4 text-xs font-grotesk text-slate-400 uppercase tracking-widest">
          <span>Node.js</span>
          <span>•</span>
          <span>Express</span>
          <span>•</span>
          <span>React</span>
          <span>•</span>
          <span>PostgreSQL</span>
          <span>•</span>
          <span>MongoDB</span>
          <span>•</span>
          <span>Docker</span>
        </div>
      </div>

      {/* Mobile Scroll Indicator Only (Social icons row removed as requested) */}
      <div className="flex lg:hidden justify-center w-full pt-4 pb-2">
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default Hero;
