import { useState, useEffect } from 'react';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { CustomCursor } from './components/ui/CustomCursor';
import { Hero } from './components/sections/Hero';
import { InsideWorkspace } from './components/sections/InsideWorkspace';
import { DeveloperDNA } from './components/sections/DeveloperDNA';
import { ProjectLaboratory } from './components/sections/ProjectLaboratory';
import { GithubWarRoom } from './components/sections/GithubStats';
import { AchievementShowcase } from './components/sections/AchievementShowcase';
import { DeveloperJourney } from './components/sections/DeveloperJourney';
import { CommunicationTerminal } from './components/sections/CommunicationTerminal';
import { ParallaxSection } from './components/ui/ParallaxSection';
import { motion, useScroll, useSpring } from 'motion/react';

import { ScrollReveal } from './components/ui/ScrollReveal';
import { Starfield } from './components/ui/Starfield';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    console.log(`[PERF] Page Load Time: ${Math.round(performance.now() - startTime)}ms`);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SmoothScroll>
      {!isMobile && <CustomCursor />}
      
      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-workspace-highlight z-[9999] origin-left shadow-[0_0_10px_rgba(245,158,11,0.5)]"
        style={{ scaleX }}
      />

      {/* Dynamic Starfield Background - Optimized */}
      <Starfield isMobile={isMobile} />

      <div className="fixed inset-0 pixel-grid pointer-events-none opacity-[0.01] z-[9999]" />
      
      {/* Drifting Background Particles - Reduced on mobile */}
      {[...Array(isMobile ? 5 : 15)].map((_, i) => (
        <motion.div
           key={i}
           className="fixed w-1 h-1 bg-white/10 rounded-full blur-[1px] pointer-events-none z-0 will-change-transform"
           initial={{ 
             x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
             y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
             opacity: Math.random() * 0.4 
           }}
           animate={{ 
             y: [null, -100, 1200],
             opacity: [0, 1, 0]
           }}
           transition={{ 
             duration: 15 + Math.random() * 15, 
             repeat: Infinity, 
             ease: "linear",
             delay: Math.random() * 5
           }}
        />
      ))}

      <Navbar />
      <main className="relative flex flex-col w-full bg-workspace-warm min-h-screen">
        <Hero isMobile={isMobile} />
        
        <ScrollReveal>
          <ParallaxSection offset={100} isMobile={isMobile}>
            <InsideWorkspace />
          </ParallaxSection>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <ParallaxSection offset={80} isMobile={isMobile}>
            <DeveloperDNA />
          </ParallaxSection>
        </ScrollReveal>
        
        <ScrollReveal>
          <ProjectLaboratory isMobile={isMobile} />
        </ScrollReveal>

        <ScrollReveal>
          <GithubWarRoom isMobile={isMobile} />
        </ScrollReveal>

        <ScrollReveal>
          <ParallaxSection offset={120} isMobile={isMobile}>
            <DeveloperJourney />
          </ParallaxSection>
        </ScrollReveal>

        <ScrollReveal>
          <ParallaxSection offset={100} isMobile={isMobile}>
            <AchievementShowcase />
          </ParallaxSection>
        </ScrollReveal>

        <ScrollReveal>
          <ParallaxSection offset={60} isMobile={isMobile}>
            <CommunicationTerminal />
          </ParallaxSection>
        </ScrollReveal>
      </main>
    </SmoothScroll>
  );
}

