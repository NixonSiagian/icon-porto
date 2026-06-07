import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { Library, Code2, Database, Smartphone, Gamepad2, Layout, Zap, Star } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const SKILLS = [
  { name: 'JavaScript', level: 95, icon: <Code2 />, color: 'from-yellow-400 to-orange-500', sub: 'Full Stack Mastery' },
  { name: 'PHP', level: 85, icon: <Database />, color: 'from-indigo-400 to-purple-600', sub: 'Backend Architecture' },
  { name: 'Swift', level: 80, icon: <Smartphone />, color: 'from-blue-400 to-cyber-blue', sub: 'Native Mobile' },
  { name: 'C++', level: 75, icon: <Zap />, color: 'from-pink-500 to-rose-600', sub: 'System Logic' },
  { name: 'Pawn', level: 90, icon: <Gamepad2 />, color: 'from-green-400 to-emerald-600', sub: 'Game Engine Scripting' },
  { name: 'React / Next.js', level: 98, icon: <Layout />, color: 'from-cyan-400 to-blue-500', sub: 'Modern Web' },
];

const RADAR_DATA = [
  { subject: 'Frontend', A: 98, fullMark: 100 },
  { subject: 'Backend', A: 85, fullMark: 100 },
  { subject: 'Mobile', A: 80, fullMark: 100 },
  { subject: 'UI/UX', A: 90, fullMark: 100 },
  { subject: 'DevOps', A: 75, fullMark: 100 },
  { subject: 'Architecture', A: 92, fullMark: 100 },
];

export function DeveloperDNA() {
  return (
    <section id="dna" className="py-32 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-24">
            <div className="space-y-4">
            <div className="h-0.5 w-12 bg-workspace-highlight/30" />
            <h2 className="text-5xl font-black font-display tracking-tight text-white uppercase tracking-tighter leading-none">SKILLS & EXPERTISE</h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-xl font-light">
              A comprehensive toolkit for building robust, scalable, and immersive digital solutions.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-10 items-center w-full lg:w-auto">
             <div className="flex gap-10 items-center">
                <DNAMetric label="LANGUAGES" value="7+" />
                <DNAMetric label="FRAMEWORKS" value="12+" />
                <DNAMetric label="SOLUTIONS" value="100+" />
             </div>
             
             {/* Radar Chart within DNA Header */}
             <div className="h-[250px] w-full md:w-[350px] shrink-0 relative group">
                <div className="absolute inset-0 bg-workspace-highlight/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                        <PolarGrid stroke="#FFFFFF10" />
                        <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                        />
                        <Radar
                            name="Skills"
                            dataKey="A"
                            stroke="#f59e0b"
                            fill="#f59e0b"
                            fillOpacity={0.3}
                        />
                    </RadarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassCard className="p-10 group hover:border-workspace-highlight/20 transition-all duration-500 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.02] to-transparent -z-10 rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex justify-between items-start mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            {skill.icon}
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Proficiency</div>
            <div className="text-3xl font-black text-white">{skill.level}%</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold group-hover:text-workspace-highlight transition-colors">{skill.name}</h3>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">{skill.sub}</p>
          </div>

          <div className="space-y-2">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1.5, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/5">
             <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                   <Star key={star} size={10} className={skill.level >= star * 20 ? 'text-workspace-highlight fill-workspace-highlight' : 'text-slate-700'} />
                ))}
             </div>
             <div className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter">Level: Expert</div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function DNAMetric({ label, value }: { label: string, value: string }) {
    return (
        <div className="text-right">
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1">{label}</div>
            <div className="text-3xl font-black text-white">{value}</div>
        </div>
    )
}
