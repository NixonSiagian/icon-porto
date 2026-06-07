import { motion } from 'motion/react';
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

export function DeveloperJourney() {
  return (
    <section id="journey" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase">
                   <History size={12} /> Temporal Sequence
                </div>
                <h2 className="text-5xl md:text-7xl font-black font-display tracking-tight text-white uppercase leading-none">Developer. <br /><span className="text-workspace-highlight">Journey</span></h2>
                <p className="text-slate-500 font-mono text-sm max-w-xl italic">The evolutionary timeline of technical intelligence and system deployment.</p>
            </div>
            <div className="hidden lg:block font-mono text-[10px] text-slate-700 tracking-[0.5em]">
                [ LOG_SCAN: 100% COMPLETE ]
            </div>
        </div>
        
        <div className="relative">
            {/* Horizontal Timeline Line */}
            <div className="absolute top-[120px] left-0 w-full h-px bg-white/5 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {MILESTONES.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="relative"
                    >
                        {/* Desktop Connector Dot */}
                        <div className="absolute top-[113px] left-1/2 -translate-x-1/2 z-20 hidden lg:block">
                            <div className="w-4 h-4 rounded-full bg-workspace-warm border-2 border-slate-800 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-workspace-highlight animate-pulse" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center lg:items-start">
                            <div className="text-workspace-highlight font-mono text-lg font-black mb-16 tracking-widest bg-workspace-highlight/10 px-6 py-2 rounded-xl border border-workspace-highlight/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                                {item.year}
                            </div>
                            
                            <motion.div 
                                whileHover={{ y: -10 }}
                                className="w-full bg-black/40 p-8 glass-premium rounded-3xl border-white/5 hover:border-workspace-highlight/30 transition-all duration-500 group"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3 font-display tracking-tight">{item.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed font-light">
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
