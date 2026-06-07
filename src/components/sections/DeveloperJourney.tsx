import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Terminal, Shield, Zap, Rocket, Award, Star, History, Flag } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const MILESTONES = [
  {
    year: '2020',
    title: 'Logical Inception',
    desc: 'Initiated the core architecture of the digital universe. Established deep foundations in JavaScript, HTML, and CSS systems.',
    icon: <Terminal className="text-cyber-blue"/>
  },
  {
    year: '2021',
    title: 'Infrastructure Mastery',
    desc: 'Integrated advanced server-side protocols with PHP. Built robust application backends and database synchronization layers.',
    icon: <Shield className="text-cyber-purple"/>
  },
  {
    year: '2022',
    title: 'Cross-Unit Expansion',
    desc: 'Successfully deployed high-performance mobile units using Swift and optimized multiplayer game logic systems.',
    icon: <Rocket className="text-workspace-highlight"/>
  },
  {
    year: '2023',
    title: 'System Optimization',
    desc: 'Refined architectural intelligence. Focused on microservice scalability and reactive high-fidelity web experiences.',
    icon: <Zap className="text-yellow-400"/>
  },
  {
    year: '2024+',
    title: 'Next Gen Synchronization',
    desc: 'Pushing the boundaries of immersive web experiences and exploring neural-link AI integration patterns.',
    icon: <Star className="text-white"/>
  }
];

export function DeveloperJourney({ isMobile = false }: { isMobile?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let rafId: number;
    
    const updateProgress = () => {
      if (sectionRef.current && progressBarRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress based on how much of the section is above the bottom of the viewport
        // 0% when top of section enters, 100% when bottom leaves or top is way past
        // We'll target "percentage of section scrolled through"
        const scrollStart = rect.top;
        const totalHeight = rect.height;
        
        // Progress = percentage of the section height that has scrolled past the top of the viewport
        let progress = -scrollStart / (totalHeight - (isMobile ? windowHeight * 0.5 : windowHeight * 0.2));
        progress = Math.max(0, Math.min(1, progress));
        
        // Direct DOM manipulation for maximum efficiency
        progressBarRef.current.style.transform = `scaleX(${progress})`;
        if (progressTextRef.current) {
          progressTextRef.current.innerText = `${Math.round(progress * 100)}%`;
        }
      }
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    return () => cancelAnimationFrame(rafId);
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="journey" className="py-32 px-6 relative overflow-hidden bg-workspace-warm/50">
      {/* Subtle Section Progress Indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50 overflow-hidden">
        <div 
          ref={progressBarRef}
          className="h-full bg-workspace-highlight transition-transform duration-75 ease-out origin-left shadow-[0_0_15px_rgba(245,158,11,0.5)]"
          style={{ transform: 'scaleX(0)', willChange: 'transform' }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-workspace-highlight/10 border border-workspace-highlight/20 rounded-full text-[10px] font-mono text-workspace-highlight tracking-[0.3em] uppercase">
                   <History size={12} /> Temporal Sequence | <span ref={progressTextRef}>0%</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-display tracking-tight text-white uppercase leading-none">Developer. <br /><span className="text-workspace-highlight">Journey</span></h2>
                <p className="text-slate-500 font-mono text-xs md:text-sm max-w-xl italic">The evolutionary timeline of technical intelligence and system deployment.</p>
            </div>
            <div className="hidden lg:block font-mono text-[10px] text-slate-700 tracking-[0.5em]">
                [ EVOLUTION_LOG_INIT: ACTIVE ]
            </div>
        </div>
        
        <div className="relative">
            {/* Horizontal Timeline Line - Now adaptive to scroll */}
            <div className="absolute top-[120px] left-0 w-full h-px bg-white/5 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {MILESTONES.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: isMobile ? 0 : i * 0.1, duration: 0.8 }}
                        className="relative will-change-transform"
                    >
                        {/* Desktop Connector Dot */}
                        <div className="absolute top-[113px] left-1/2 -translate-x-1/2 z-20 hidden lg:block">
                            <div className="w-4 h-4 rounded-full bg-workspace-warm border-2 border-slate-800 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-workspace-highlight animate-pulse" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center lg:items-start">
                            <div className="text-workspace-highlight font-mono text-base sm:text-lg font-black mb-12 sm:mb-16 tracking-widest bg-workspace-highlight/10 px-6 py-2 rounded-xl border border-workspace-highlight/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                                {item.year}
                            </div>
                            
                            <motion.div 
                                whileHover={!isMobile ? { y: -10 } : {}}
                                className="w-full bg-black/40 p-6 sm:p-8 glass-premium rounded-3xl border-white/5 hover:border-workspace-highlight/30 transition-all duration-500 group will-change-transform"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform will-change-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-white mb-3 font-display tracking-tight">{item.title}</h3>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
