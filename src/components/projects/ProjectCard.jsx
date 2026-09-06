import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import Magnetic from '../common/Magnetic';
import { useCursor } from '../../context/CursorContext';

export const ProjectCard = ({ project, index, onSelect, isStacked = false }) => {
  const cardRef = useRef(null);
  const { setCursor, resetCursor } = useCursor();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // 3D Card Tilt Physics (disabled when stacked)
  const handleMouseMove = (e) => {
    if (isStacked || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    resetCursor();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursor('project', 'VIEW')}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        transform: isStacked ? undefined : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`group relative cursor-pointer select-none rounded-3xl border transition-all duration-300 ${
        isStacked
          ? 'w-full bg-[#101016] border-white/15 p-5 sm:p-7 shadow-[0_-16px_36px_rgba(0,0,0,0.92),0_12px_32px_rgba(0,0,0,0.6)] hover:border-accent-cyan/60'
          : 'w-[85vw] sm:w-[540px] md:w-[620px] flex-shrink-0 bg-surface-elevated/80 border-white/10 hover:border-accent-violet/50 p-6 sm:p-8 backdrop-blur-xl shadow-glass'
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center space-x-3 text-xs uppercase tracking-widest font-grotesk text-slate-400">
          <span className="font-mono text-accent-cyan font-bold">
            0{index + 1} //
          </span>
          <span>{project.category}</span>
        </div>
        <span className="font-mono text-xs text-slate-500">{project.year}</span>
      </div>

      {/* Image Preview Container with Mask Zoom */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-obsidian-deep border border-white/[0.06]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

        {/* Floating Metrics Pill */}
        {project.metrics && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-obsidian/70 backdrop-blur-md border border-white/10 text-[11px] font-grotesk text-accent-emerald flex items-center space-x-1.5">
            <Award size={13} />
            <span>{project.metrics.split('•')[0]}</span>
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="space-y-3">
        <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white group-hover:text-accent-cyan transition-colors duration-300 flex items-center justify-between">
          <span>{project.title}</span>
          <ArrowUpRight
            size={22}
            className="text-slate-500 group-hover:text-accent-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
          />
        </h3>

        <p className="text-slate-400 text-sm font-sans line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tags & Action Button Row */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10 gap-2">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-white/[0.04] text-[11px] font-grotesk text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          {project.liveUrl && (
            <Magnetic strength={0.3}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setCursor('pointer', 'LIVE')}
                onMouseLeave={resetCursor}
                className="px-3 py-1.5 rounded-lg bg-accent-cyan/15 hover:bg-accent-cyan text-accent-cyan hover:text-obsidian text-xs uppercase tracking-wider font-grotesk font-bold transition-all duration-200 border border-accent-cyan/30"
              >
                Live App ↗
              </a>
            </Magnetic>
          )}

          <Magnetic strength={0.3}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
              className="text-xs uppercase tracking-widest font-grotesk font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Details →
            </button>
          </Magnetic>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
