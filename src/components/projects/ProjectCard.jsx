import React, { useRef, useState } from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import Magnetic from '../common/Magnetic';
import { useCursor } from '../../context/CursorContext';

export const ProjectCard = ({ project, index, onSelect, isStacked = false }) => {
  const cardRef = useRef(null);
  const { setCursor, resetCursor } = useCursor();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D Card Tilt Physics — desktop only
  const handleMouseMove = (e) => {
    if (isStacked || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -7;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 7;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setCursor('project', 'VIEW');
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    resetCursor();
    setIsHovered(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = () => setIsHovered(true);
  const handleTouchEnd = () => setTimeout(() => setIsHovered(false), 300);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => onSelect(project)}
      style={{
        transform: isStacked ? undefined : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`group relative cursor-pointer select-none rounded-3xl border transition-all duration-300 ${
        isStacked
          ? `w-full bg-[#101016] p-5 sm:p-7 shadow-[0_-16px_36px_rgba(0,0,0,0.92),0_12px_32px_rgba(0,0,0,0.6)] ${isHovered ? 'border-accent-cyan/80' : 'border-white/15'}`
          : 'w-[85vw] sm:w-[540px] md:w-[620px] flex-shrink-0 bg-surface-elevated/80 border-white/10 hover:border-accent-violet/50 p-6 sm:p-8 backdrop-blur-xl shadow-glass'
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center space-x-3 text-xs uppercase tracking-widest font-grotesk text-slate-400">
          <span className="font-mono text-accent-cyan font-bold">0{index + 1} //</span>
          <span>{project.category}</span>
        </div>
        <span className="font-mono text-xs text-slate-500">{project.year}</span>
      </div>

      {/* Image */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-obsidian-deep border border-white/[0.06]">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-30' : 'opacity-60'}`} />

        {/* Metrics Pill */}
        {project.metrics && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-obsidian/70 backdrop-blur-md border border-white/10 text-[11px] font-grotesk text-accent-emerald flex items-center space-x-1.5">
            <Award size={13} />
            <span>{project.metrics.split('•')[0]}</span>
          </div>
        )}
      </div>

      {/* ── Mobile only: full card content ── */}
      {isStacked && (
        <>
          {/* Title — color changes on hover/touch via isHovered state */}
          <h3
            className="font-grotesk sm:font-syne font-bold sm:font-extrabold text-xl sm:text-xl md:text-2xl tracking-normal [word-spacing:0.06em] transition-colors duration-300 flex items-center justify-between mb-2 leading-snug"
            style={{ color: isHovered ? '#06B6D4' : '#ffffff' }}
          >
            <span>{project.title}</span>
            <ArrowUpRight
              size={20}
              className="flex-shrink-0 ml-2 transition-all duration-300"
              style={{
                color: isHovered ? '#06B6D4' : '#64748b',
                transform: isHovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
              }}
            />
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-sm font-sans line-clamp-2 leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Tags + Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-2 flex-wrap">
            <div className="flex flex-wrap gap-1.5">
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
                  onClick={(e) => { e.stopPropagation(); onSelect(project); }}
                  className="text-xs uppercase tracking-widest font-grotesk font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Details →
                </button>
              </Magnetic>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectCard;
