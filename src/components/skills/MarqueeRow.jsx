import React from 'react';

/**
 * High-performance infinite scrolling marquee row.
 * Respects prefers-reduced-motion (stops moving on hover).
 * Clickable to select skill directly.
 */
export const MarqueeRow = ({ items, reverse = false, speed = '30s', onSelectSkill, activeSkill }) => {
  return (
    <div className="relative w-full overflow-hidden select-none py-2">
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

      <div
        className={`flex w-max space-x-4 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } hover:[animation-play-state:paused]`}
        style={{ animationDuration: speed }}
      >
        {/* Render triple for seamless infinite loop */}
        {[...items, ...items, ...items].map((item, idx) => {
          const isSelected = activeSkill && (
            activeSkill.name?.toLowerCase() === item.toLowerCase() ||
            item.toLowerCase().includes(activeSkill.id?.toLowerCase())
          );

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSkill && onSelectSkill(item)}
              title={`Select ${item}`}
              className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border transition-all duration-300 backdrop-blur-md group text-left cursor-pointer ${
                isSelected
                  ? 'bg-accent-cyan/20 border-accent-cyan shadow-glow-cyan scale-105 z-20 text-white'
                  : 'bg-surface/70 border-white/[0.08] hover:border-accent-cyan/50 hover:bg-surface-elevated/90 text-slate-300 hover:text-white'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  isSelected
                    ? 'bg-accent-cyan shadow-[0_0_8px_#06B6D4]'
                    : 'bg-accent-violet group-hover:bg-accent-cyan'
                }`}
              />
              <span className="font-syne font-bold text-sm sm:text-base uppercase tracking-wider whitespace-nowrap">
                {item}
              </span>
              {isSelected && (
                <span className="font-mono text-[10px] text-accent-cyan bg-accent-cyan/15 px-1.5 py-0.5 rounded uppercase">
                  ACTIVE
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MarqueeRow;
