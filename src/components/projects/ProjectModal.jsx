import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';
import Magnetic from '../common/Magnetic';
import { useCursor } from '../../context/CursorContext';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  const { setCursor, resetCursor } = useCursor();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-obsidian-deep/85 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            data-lenis-prevent="true"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-elevated/95 border border-white/15 p-6 sm:p-10 shadow-2xl z-10 custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6">
              <Magnetic strength={0.3}>
                <button
                  onClick={onClose}
                  onMouseEnter={() => setCursor('pointer', 'CLOSE')}
                  onMouseLeave={resetCursor}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </Magnetic>
            </div>

            {/* Top Category & Year */}
            <div className="flex items-center space-x-3 mb-3 text-xs uppercase tracking-[0.25em] font-grotesk text-accent-cyan">
              <span>{project.category}</span>
              <span className="text-white/20">•</span>
              <span className="text-slate-400">{project.year}</span>
            </div>

            {/* Title */}
            <h3 className="font-grotesk sm:font-syne text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal [word-spacing:0.08em] mb-4 leading-tight">
              {project.title}
            </h3>

            {/* Metrics Highlight Pill */}
            {project.metrics && (
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-accent-violet/15 border border-accent-violet/30 text-accent-cyan text-xs font-grotesk tracking-wide mb-6">
                <Award size={14} className="text-accent-violet" />
                <span>{project.metrics}</span>
              </div>
            )}

            {/* Featured Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8 group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
            </div>

            {/* Description & Technical Deep Dive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2 space-y-4">
                <h4 className="font-grotesk sm:font-syne font-bold text-lg text-white">
                  Architectural Overview
                </h4>
                <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base font-light">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Technologies List */}
              <div className="space-y-3">
                <h4 className="font-grotesk sm:font-syne font-bold text-sm text-slate-400 uppercase tracking-wider">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-grotesk text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              {project.liveUrl && (
                <Magnetic strength={0.3}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setCursor('pointer', 'LAUNCH')}
                    onMouseLeave={resetCursor}
                    className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white text-obsidian font-grotesk font-bold text-xs uppercase tracking-widest hover:bg-accent-cyan transition-colors duration-200"
                  >
                    <span>Launch Live Site</span>
                    <ArrowUpRight size={16} />
                  </a>
                </Magnetic>
              )}

              {project.githubUrl && (
                <Magnetic strength={0.3}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setCursor('pointer', 'CODE')}
                    onMouseLeave={resetCursor}
                    className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-surface border border-white/15 hover:border-white/30 text-white font-grotesk text-xs uppercase tracking-widest transition-colors duration-200"
                  >
                    <Github size={16} />
                    <span>View Repository</span>
                  </a>
                </Magnetic>
              )}

              <button
                onClick={onClose}
                className="ml-auto text-xs uppercase tracking-widest font-grotesk text-slate-400 hover:text-white transition-colors"
              >
                Close Details [ESC]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
