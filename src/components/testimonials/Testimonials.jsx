import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Award, Star } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Magnetic from '../common/Magnetic';
import { useCursor } from '../../context/CursorContext';
import { testimonials } from '../../data/portfolioData';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setCursor, resetCursor } = useCursor();
  const sectionRef = useRef(null);

  // 1:1 Scroll-linked physics: scales, floats, and reacts continuously
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });

  const cardScale = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.92]);
  const cardY = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [50, 0, 0, -35]);
  const cardRotateX = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [6, 0, 0, -4]);
  const quoteY = useTransform(smoothProgress, [0, 1], [-40, 40]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.22, 0.78, 1], [0.25, 1, 1, 0.25]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto slide every 8 seconds if not reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(nextTestimonial, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-14 sm:py-24 px-4 sm:px-12 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-accent-cyan/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Section Header */}
      <SectionHeader
        index="05"
        category="RECOMMENDATIONS"
        title="ENDORSEMENTS."
        subtitle="Feedback from internship mentors and lab project leads."
      />

      {/* Testimonial Showcase Container */}
      <div className="relative mt-6 sm:mt-12 max-w-4xl mx-auto">
        {/* Quote Icon Backdrop with dynamic parallax */}
        <motion.div
          style={{ y: quoteY }}
          className="absolute -top-10 -left-6 sm:-left-10 text-white/[0.04] pointer-events-none -z-10 select-none will-change-transform"
        >
          <Quote size={140} />
        </motion.div>

        {/* Dynamic Card with Animated Transition and Scroll-Linked 3D Physics */}
        <motion.div
          style={{
            scale: cardScale,
            y: cardY,
            rotateX: cardRotateX,
            opacity: cardOpacity,
            transformPerspective: 1000,
          }}
          onMouseEnter={() => setCursor('drag', 'SLIDE')}
          onMouseLeave={resetCursor}
          className="relative min-h-[360px] flex flex-col justify-between p-8 sm:p-12 rounded-3xl bg-surface-elevated/85 border border-white/10 backdrop-blur-2xl shadow-glass will-change-transform"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-8"
            >
              {/* Star Rating & Recognition Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-1 text-accent-amber">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-violet/15 border border-accent-violet/30 text-accent-cyan text-xs font-grotesk tracking-wider">
                  <Award size={14} className="text-accent-violet" />
                  <span>{current.badge}</span>
                </div>
              </div>

              {/* Quote Text */}
              <p className="font-grotesk sm:font-syne text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-100 sm:text-white font-medium leading-relaxed">
                "{current.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-14 h-14 rounded-2xl object-cover border border-white/20"
                />
                <div>
                  <div className="font-grotesk sm:font-syne font-bold text-base sm:text-lg text-white">
                    {current.author}
                  </div>
                  <div className="font-grotesk text-xs uppercase tracking-wider text-accent-cyan">
                    {current.role} • {current.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/[0.08]">
            {/* Pagination Dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-accent-cyan shadow-glow-cyan'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center space-x-3">
              <Magnetic strength={0.25}>
                <button
                  onClick={prevTestimonial}
                  onMouseEnter={() => setCursor('pointer', 'PREV')}
                  onMouseLeave={resetCursor}
                  className="p-3 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <button
                  onClick={nextTestimonial}
                  onMouseEnter={() => setCursor('pointer', 'NEXT')}
                  onMouseLeave={resetCursor}
                  className="p-3 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
