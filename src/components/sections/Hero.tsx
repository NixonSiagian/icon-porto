import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, ChevronDown } from 'lucide-react';
import { WorkspaceScene } from './WorkspaceScene';
import { Nebula } from '../ui/Nebula';

export function Hero({ isMobile = false }: { isMobile?: boolean }) {
  useEffect(() => {
    const start = performance.now();
    return () => console.log(`[PERF] Hero Render Time: ${Math.round(performance.now() - start)}ms`);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center px-6 overflow-hidden bg-workspace-warm">
      {/* Immersive Environment Background - Optimized for Mobile */}
      <WorkspaceScene isMobile={isMobile} />
      {!isMobile && <Nebula />}

      {/* Content Overlay */}
      <div className="max-w-7xl mx-auto w-full relative z-30">
        <motion.div
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 lg:gap-8 items-center lg:items-start text-center lg:text-left"
        >
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 bg-workspace-highlight/10 backdrop-blur-md rounded-full border border-workspace-highlight/30"
            >
              <div className={`w-2 h-2 rounded-full bg-workspace-highlight ${!isMobile ? 'animate-pulse' : ''}`} />
              <span className="text-xs md:text-sm font-bold text-workspace-highlight tracking-widest uppercase font-mono">
                Full Stack Developer
              </span>
            </motion.div>
            
            <motion.h1 
              whileHover={!isMobile ? { scale: 1.02, x: 10 } : {}}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] font-display text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-default transition-all duration-300 hover:text-workspace-highlight will-change-transform"
            >
              NIXON<br />
              <span className="text-white/40">SIAGIAN</span>
            </motion.h1>
          </div>

          <motion.p 
            whileHover={!isMobile ? { x: 5 } : {}}
            className="text-base sm:text-lg lg:text-2xl text-slate-200 leading-relaxed max-w-2xl font-light drop-shadow-md cursor-default"
          >
            Building modern web applications, robust backend systems, 
            multiplayer game experiences, and specialized mobile solutions from my digital workshop.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-4">
            <button 
              onClick={() => document.getElementById('laboratory')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-workspace-highlight text-black font-bold rounded-2xl hover:bg-white transition-all duration-300 text-sm uppercase tracking-wider shadow-2xl active:scale-95"
            >
              View Projects
            </button>
            <a 
              href="https://github.com/nixonsiagian"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 sm:px-10 sm:py-5 bg-black/40 backdrop-blur-xl text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-500 border border-white/10 flex items-center justify-center gap-3 text-sm uppercase tracking-wider shadow-2xl active:scale-95"
            >
              <Terminal size={18} /> GitHub
            </a>
          </div>
        </motion.div>
      </div>

      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 ${!isMobile ? 'animate-bounce' : ''} opacity-40 pointer-events-none z-30 transition-opacity hover:opacity-100`}>
        <ChevronDown size={32} className="text-white" />
      </div>

      {/* Subtle Visual Vignette - Static on mobile for performance */}
      <div className="absolute inset-0 bg-gradient-to-t from-workspace-warm via-transparent to-black/30 pointer-events-none z-10" />
    </section>
  );
}

function HeroMetric({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono text-slate-500 mb-1 tracking-widest uppercase">{label}</div>
      <div className={`text-xl font-black ${color} tracking-tight`}>{value}</div>
    </div>
  );
}
