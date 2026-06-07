import { motion, AnimatePresence } from 'motion/react';
import { Award, Shield, Target, Zap, Cpu, Code2, Star, Trophy, Medal } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useState, useRef, useEffect } from 'react';

const ACHIEVEMENTS = [
  { title: 'Full Stack Master', tier: 'Legendary', desc: 'Successfully architected and deployed multiple enterprise-grade systems.', icon: <Trophy className="text-workspace-highlight" />, color: 'from-workspace-highlight/20 to-transparent' },
  { title: 'System Architect', tier: 'Gold', desc: 'Optimized backbone infrastructure for high-concurrency game systems.', icon: <Shield className="text-cyber-blue" />, color: 'from-cyber-blue/10 to-transparent' },
  { title: 'Logic Specialist', tier: 'Silver', desc: 'Crafted complex algorithms for real-time data synchronization.', icon: <Target className="text-cyber-purple" />, color: 'from-cyber-purple/10 to-transparent' },
  { title: 'Rapid Prototyper', tier: 'Elite', desc: 'Maintained a consistent 200+ contribution streak during peak development.', icon: <Zap className="text-yellow-400" />, color: 'from-yellow-400/10 to-transparent' },
];

function ParticleExplosion({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: any[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#f59e0b' : '#38bdf8',
        life: 1.0
      });
    }

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      if (particles.some(p => p.life > 0)) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [active]);

  return (
    <canvas 
        ref={canvasRef} 
        width={300} 
        height={300} 
        className="absolute inset-0 pointer-events-none z-50 mix-blend-screen opacity-60"
    />
  );
}

export function AchievementShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="achievements" className="py-32 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-slate-500 tracking-widest uppercase border border-white/5">
               Protocol: Achievement_Relay
            </div>
            <h2 className="text-5xl md:text-7xl font-black font-display tracking-tight text-white uppercase leading-none">
                Core. <span className="text-workspace-highlight">Showcase</span>
            </h2>
            <p className="text-slate-500 font-mono text-xs max-w-xl">
               Validated technical milestones and system architecture designations.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ACHIEVEMENTS.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative group h-full"
                >
                    <AnimatePresence>
                        {hoveredIndex === i && <ParticleExplosion active={true} />}
                    </AnimatePresence>

                    <GlassCard className={`relative h-full overflow-hidden p-10 text-center border-white/5 hover:border-workspace-highlight/40 bg-gradient-to-br ${item.color} transition-all duration-500 group-hover:-translate-y-2`}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-workspace-highlight/30 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                        
                        <div className="w-20 h-20 mx-auto bg-black/60 rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5">
                            {item.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{item.title}</h3>
                        <div className="text-[10px] font-mono text-slate-600 uppercase mb-4 tracking-[0.3em]">{item.tier} Rank</div>
                        <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>

                        <div className="mt-8 flex justify-center gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                            {[1, 2, 3].map(s => (
                                <Star 
                                    key={s} 
                                    size={10} 
                                    className="text-workspace-highlight fill-workspace-highlight group-hover:animate-pulse" 
                                />
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}
