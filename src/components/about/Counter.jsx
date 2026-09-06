import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export const Counter = ({ targetValue, suffix = '', duration = 1.8, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(targetValue);
      return;
    }

    let start = 0;
    const end = parseInt(targetValue, 10);
    if (isNaN(end)) return;

    const totalSteps = 60;
    const stepTime = (duration * 1000) / totalSteps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Easing out curve
      const progress = step / totalSteps;
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easedProgress * end);

      setCount(current);

      if (step >= totalSteps) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetValue, duration]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="flex items-baseline font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl text-white">
        <span className="tabular-nums">{count}</span>
        <span className="text-accent-cyan ml-1 text-3xl sm:text-4xl">{suffix}</span>
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest font-grotesk text-slate-400 font-medium">
        {label}
      </div>
    </div>
  );
};

export default Counter;
