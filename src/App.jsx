import React, { useState } from 'react';
import useLenis from './hooks/useLenis';
import CustomCursor from './components/common/CustomCursor';
import NoiseOverlay from './components/common/NoiseOverlay';
import ScrollProgress from './components/common/ScrollProgress';
import Preloader from './components/common/Preloader';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Projects from './components/projects/Projects';
import Timeline from './components/timeline/Timeline';
import Skills from './components/skills/Skills';
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

export function App() {
  useLenis();
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="relative min-h-screen bg-obsidian text-slate-100 font-sans selection:bg-accent-violet selection:text-white">
      <Preloader onComplete={() => setLoadingComplete(true)} />
      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Timeline />
        <Skills />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
