import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import DraggableMarqueeTracks from './DraggableMarqueeTracks';
import { skills } from '../../data/portfolioData';

export const Skills = () => {
  const [row1Items, setRow1Items] = useState([...skills.marquee1]);
  const [row2Items, setRow2Items] = useState([...skills.marquee2]);

  const handleMoveSkill = (skillName, fromRow, toRow) => {
    if (fromRow === 'top' && toRow === 'bottom') {
      setRow1Items((prev) => prev.filter((item) => item !== skillName));
      setRow2Items((prev) => (prev.includes(skillName) ? prev : [skillName, ...prev]));
    } else if (fromRow === 'bottom' && toRow === 'top') {
      setRow2Items((prev) => prev.filter((item) => item !== skillName));
      setRow1Items((prev) => (prev.includes(skillName) ? prev : [skillName, ...prev]));
    }
  };

  const handleResetTracks = () => {
    setRow1Items([...skills.marquee1]);
    setRow2Items([...skills.marquee2]);
  };

  return (
    <section id="skills" className="relative py-12 sm:py-20 overflow-hidden select-none">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-accent-violet/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Container */}
      <div className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <SectionHeader
          index="04"
          category="TECH STACK"
          title="SKILLS & TOOLS."
          subtitle="Battle-tested production technologies and frameworks."
        />
      </div>

      {/* Interactive Draggable Scrolling Tracks (Upside & Downside) */}
      <div className="my-6 sm:my-8">
        <DraggableMarqueeTracks
          row1Items={row1Items}
          row2Items={row2Items}
          onMoveSkill={handleMoveSkill}
          onReset={handleResetTracks}
        />
      </div>
    </section>
  );
};

export default Skills;
