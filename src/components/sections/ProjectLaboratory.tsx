import { motion } from 'motion/react';
import { ExternalLink, Filter, Database, Smartphone, Gamepad2, Layout, Terminal, Code2, Globe, Layers, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';

const PROJECTS = [
  {
    title: 'Nexus Infrastructure',
    type: 'Full Stack',
    desc: 'Enterprise monitoring dashboard with real-time telemetry and 3D visualization layers.',
    tech: ['Next.js', 'Go', 'Three.js'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    links: { github: 'https://github.com/nixonsiagian', live: '#' }
  },
  {
    title: 'Aura Core Mobile',
    type: 'Mobile',
    desc: 'High-performance meditation engine built with native Swift optimizations.',
    tech: ['Swift', 'Combine', 'SwiftUI'],
    image: 'https://images.unsplash.com/photo-1616469829581-7399211fb5b2?auto=format&fit=crop&q=80&w=1200',
    links: { github: 'https://github.com/nixonsiagian', live: '#' }
  },
  {
    title: 'Void Game System',
    type: 'Game Dev',
    desc: 'Massive multiplayer synchronizer for custom sandbox game worlds.',
    tech: ['Pawn', 'C++', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200',
    links: { github: 'https://github.com/nixonsiagian', live: '#' }
  },
  {
    title: 'Lumina API',
    type: 'Backend',
    desc: 'Distributed microservice handler capable of processing 10k+ requests per second.',
    tech: ['Node.js', 'Redis', 'Docker'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
    links: { github: 'https://github.com/nixonsiagian', live: '#' }
  }
];

export function ProjectLaboratory() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter);

  return (
    <section id="laboratory" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 border-b border-white/5 pb-12">
            <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-workspace-highlight/10 text-workspace-highlight rounded-full text-[10px] font-mono tracking-widest font-bold">
              <Layers size={12} /> FEATURED PROJECTS
            </div>
            <h2 className="text-6xl font-black font-display tracking-tight text-white uppercase italic tracking-tighter">Project Showcase.</h2>
            <p className="text-slate-400 text-base max-w-xl leading-relaxed font-light">
              A collection of selected works exploring web infrastructure, mobile ecosystems, and high-performance engineering.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['All', 'Frontend', 'Backend', 'Game Dev', 'Mobile', 'Full Stack'].map(f => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2.5 rounded-xl border text-[10px] font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                        filter === f ? "bg-workspace-highlight text-black border-workspace-highlight shadow-[0_0_20px_rgba(245,158,11,0.2)]" : "glass border-white/5 text-slate-500 hover:border-white/20 hover:text-white"
                    }`}
                >
                    {f}
                </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <GlassCard className="p-0 overflow-hidden border-white/5 hover:border-workspace-highlight/30 transition-all duration-700 bg-black/40 group-hover:bg-workspace-warm/40 glitch-hover">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
          />
          {/* Glitch Overlays */}
          <img 
            src={project.image} 
            alt="glitch-red"
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-0 glitch-overlay pointer-events-none"
            style={{ filter: 'hue-rotate(90deg) brightness(1.5)' }}
          />
          <img 
            src={project.image} 
            alt="glitch-blue"
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-0 glitch-overlay pointer-events-none"
            style={{ filter: 'hue-rotate(270deg) brightness(1.5)', animationDelay: '0.15s' }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          <div className="absolute top-6 right-6">
            <div className="flex gap-2">
                <a href={project.links.github} className="p-3 glass-premium rounded-xl text-slate-400 hover:text-white hover:border-workspace-highlight/50 transition-all">
                  <Code2 size={18} />
                </a>
                <a href={project.links.live} className="p-3 glass-premium rounded-xl text-slate-400 hover:text-workspace-highlight hover:border-workspace-highlight/50 transition-all">
                  <Globe size={18} />
                </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[8px] font-mono text-white/50 mb-4 border border-white/5 uppercase tracking-widest">
              Category: {project.type}
            </div>
            <h3 className="text-3xl font-black text-white group-hover:text-workspace-highlight transition-colors flex items-center gap-3">
              {project.title}
              <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 translate-x-2 group-hover:translate-x-0 transition-all" />
            </h3>
          </div>
        </div>
        
        <div className="p-10">
          <p className="text-slate-400 text-lg font-light leading-relaxed mb-8 h-20 line-clamp-3">
            {project.desc}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t: string) => (
              <span key={t} className="px-4 py-1.5 bg-white/5 rounded-lg text-[9px] font-mono text-slate-500 border border-white/5 group-hover:border-workspace-highlight/20 transition-all uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
