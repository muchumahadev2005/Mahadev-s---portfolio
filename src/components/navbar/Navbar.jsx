import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, Menu, X, ArrowUpRight } from 'lucide-react';
import Magnetic from '../common/Magnetic';
import { useCursor } from '../../context/CursorContext';
import { personalData } from '../../data/portfolioData';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Experience', href: '#timeline' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];


export const Navbar = () => {
  const { setCursor, resetCursor } = useCursor();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Track active section based on scroll
      const sections = ['projects', 'about', 'timeline', 'skills', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-4 px-4 sm:px-8 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo Monogram */}
          <Magnetic strength={0.25}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={() => setCursor('pointer', 'TOP')}
              onMouseLeave={resetCursor}
              className="group flex items-center space-x-2 text-white font-syne font-extrabold text-xl tracking-tighter"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-elevated border border-white/10 group-hover:border-accent-violet/60 transition-all duration-300 shadow-glass">
                <span className="text-gradient-violet font-black">{personalData.initials || 'MM'}</span>
              </span>
              {/* muchu.dev text hidden — MM only */}
            </a>
          </Magnetic>

          {/* Desktop Glassmorphic Nav Pill */}
          <nav className="hidden md:flex items-center gap-0.5 px-2 py-2 rounded-full bg-surface/75 border border-white/10 backdrop-blur-xl shadow-glass">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <Magnetic key={link.name} strength={0.2}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    onMouseEnter={() => setCursor('pointer')}
                    onMouseLeave={resetCursor}
                    className={`relative px-5 py-2 text-xs uppercase tracking-widest font-grotesk font-medium transition-colors duration-200 rounded-full ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-accent-violet/20 border border-accent-violet/40 -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                </Magnetic>
              );
            })}
          </nav>

          {/* Right Action Stack: Availability Badge & Resume Button */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Status Pill */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-grotesk tracking-wide text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
              </span>
              <span>Available for projects</span>
            </div>

            {/* Resume / CV Button */}
            <Magnetic strength={0.3}>
              <a
                href={personalData.resumeUrl}
                download="Muchu_Mahadev_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor('pointer', 'PDF')}
                onMouseLeave={resetCursor}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-accent-violet/15 hover:bg-accent-violet/30 border border-accent-violet/40 text-accent-cyan text-xs uppercase tracking-wider font-grotesk font-semibold transition-all duration-300 hover:shadow-glow-cyan"
              >
                <FileDown size={14} className="animate-bounce" />
                <span>Resume</span>
              </a>
            </Magnetic>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <Magnetic strength={0.25}>
              <a
                href={personalData.resumeUrl}
                download="Muchu_Mahadev_Resume.pdf"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-grotesk text-slate-300"
              >
                <FileDown size={13} />
                <span>CV</span>
              </a>
            </Magnetic>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-surface/80 border border-white/10 text-white hover:border-accent-violet/50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl bg-surface-elevated/95 border border-white/10 backdrop-blur-2xl p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10 text-xs font-grotesk text-accent-emerald">
                <span className="h-2 w-2 rounded-full bg-accent-emerald animate-pulse" />
                <span>Available for Select Q1 2027 Projects</span>
              </div>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="flex items-center justify-between text-lg font-syne font-bold text-white hover:text-accent-cyan py-2 transition-colors border-b border-white/[0.05]"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={18} className="text-slate-500" />
                </a>
              ))}

              <div className="pt-2">
                <a
                  href={personalData.resumeUrl}
                  download="Alex_Vance_Resume.pdf"
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-accent-violet text-white font-grotesk font-semibold text-sm shadow-glow-violet"
                >
                  <FileDown size={16} />
                  <span>Download Full Resume (.PDF)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
