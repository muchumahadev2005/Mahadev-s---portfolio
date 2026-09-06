import React, { useEffect, useState } from 'react';

/**
 * ScrollProgress displays a sleek neon top progress line showing the current scroll depth.
 */
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/[0.03] pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-emerald transition-transform duration-75 ease-out origin-left will-change-transform"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
};

export default ScrollProgress;
