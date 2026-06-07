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

  return (
    <SmoothScroll>
      <CustomCursor />
      
      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-workspace-highlight z-[9999] origin-left shadow-[0_0_10px_rgba(245,158,11,0.5)]"
        style={{ scaleX }}
      />

      {/* Dynamic Starfield Background */}
      <Starfield />

      <div className="fixed inset-0 pixel-grid pointer-events-none opacity-[0.02] z-[9999]" />
      
      {/* Drifting Background Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
           key={i}
           className="fixed w-1 h-1 bg-white/10 rounded-full blur-[1px] pointer-events-none z-0"
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
        <Hero />
        
        <ScrollReveal>
          <ParallaxSection offset={100}>
            <InsideWorkspace />
          </ParallaxSection>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <ParallaxSection offset={80}>
            <DeveloperDNA />
          </ParallaxSection>
        </ScrollReveal>
        
        <ScrollReveal>
          <ProjectLaboratory />
        </ScrollReveal>

        <ScrollReveal>
          <GithubWarRoom />
        </ScrollReveal>

        <ScrollReveal>
          <ParallaxSection offset={120}>
            <DeveloperJourney />
          </ParallaxSection>
        </ScrollReveal>

        <ScrollReveal>
          <ParallaxSection offset={100}>
            <AchievementShowcase />
          </ParallaxSection>
        </ScrollReveal>

        <ScrollReveal>
          <ParallaxSection offset={60}>
            <CommunicationTerminal />
          </ParallaxSection>
        </ScrollReveal>
      </main>
    </SmoothScroll>
  );
}

