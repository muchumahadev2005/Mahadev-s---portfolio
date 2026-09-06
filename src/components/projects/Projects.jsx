import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../common/SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktop(desktop && !prefersReduced);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const scrollDistance = () => track.scrollWidth - window.innerWidth + 140;

    const tween = gsap.to(track, {
      x: () => -scrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance() + 400}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isDesktop]);

  return (
    <section
      id="projects"
      className={`relative pt-4 sm:pt-8 pb-4 sm:pb-8 ${isDesktop ? 'overflow-hidden' : 'overflow-x-clip'}`}
    >
      {/* Container: Pinned Full-viewport on Desktop / Natural Sticky Flow on Mobile */}
      <div
        ref={containerRef}
        className={isDesktop ? 'h-screen w-full flex flex-col justify-start pt-4 sm:pt-6 overflow-hidden' : 'w-full'}
      >
        {/* Section Header */}
        <div className="px-4 sm:px-12 max-w-7xl mx-auto w-full mb-3 sm:mb-6">
          <SectionHeader
            index="02"
            category="PORTFOLIO"
            title="FEATURED WORK."
            subtitle="Production web applications, voice ledgers, and secure messaging systems."
          />
        </div>

        {/* Desktop Horizontal Scroll Track OR Mobile Vertical Sticky Stacking Cards */}
        {isDesktop ? (
          <div
            ref={trackRef}
            className="flex items-center space-x-8 pl-6 sm:pl-12 will-change-transform"
          >
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <div className="relative flex flex-col px-4 sm:px-8 max-w-2xl mx-auto pb-4">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                style={{
                  top: `calc(4.5rem + ${idx * 1.5}rem)`,
                  zIndex: (idx + 1) * 10,
                  marginBottom: idx === projects.length - 1 ? '0' : '2.5rem',
                }}
                className="sticky will-change-transform transition-all duration-300"
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  onSelect={setSelectedProject}
                  isStacked={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Deep Dive Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
