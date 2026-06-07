import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GitHubStats } from '../../types';
import { Target, Monitor, Cpu, Sparkles, Coffee, Code2, Globe2 } from 'lucide-react';

export function InsideWorkspace() {
    const [stats, setStats] = useState<GitHubStats | null>(null);

    useEffect(() => {
        axios.get('/api/github-stats').then(res => setStats(res.data)).catch(() => {});
    }, []);

    return (
        <section id="workspace" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
                    {/* Left: Content Panels */}
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-workspace-highlight/10 text-workspace-highlight border border-workspace-highlight/20 rounded-full text-xs font-bold font-mono">
                                <Monitor size={12} /> PROFILE OVERVIEW
                            </div>
                            <h2 className="text-5xl font-black font-display tracking-tight">CRAFTING DIGITAL EXPERIENCES.</h2>
                            <p className="text-xl text-slate-400 font-light leading-relaxed">
                                Beyond the pixels and code is a commitment to precision and performance. 
                                I build scalable software solutions that bridge the gap between complex logic and intuitive design.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Panel 
                                title="Who I Am" 
                                content="A Full Stack visionary blending technical precision with creative production."
                                icon={<Target className="text-workspace-highlight" />} 
                            />
                            <Panel 
                                title="What I Build" 
                                content="Scalable backends, immersive frontends, and multiplayer game engines."
                                icon={<Cpu className="text-cyber-blue" />} 
                            />
                            <Panel 
                                title="Technologies" 
                                content="TypeScript, Node.js, PHP, C++, and modern frontend frameworks."
                                icon={<Code2 className="text-cyber-purple" />} 
                            />
                            <Panel 
                                title="Current Focus" 
                                content="Optimizing distributed systems and high-fidelity web experiences."
                                icon={<Sparkles className="text-yellow-400" />} 
                            />
                        </div>
                    </div>

                    {/* Right: Interactive Glass Boards */}
                    <div className="grid grid-cols-2 gap-6">
                        <GlassCard className="col-span-2 p-10 flex flex-col justify-between border-white/5 bg-gradient-to-br from-workspace-highlight/[0.05] to-transparent">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 bg-workspace-highlight/10 rounded-2xl">
                                    <Globe2 className="text-workspace-highlight" size={32} />
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Open Source</div>
                                    <div className="text-2xl font-black">{stats?.user?.publicRepos !== undefined && !isNaN(stats.user.publicRepos) ? stats.user.publicRepos : '20+'} PROJECTS</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                                    <span>CODE QUALITY</span>
                                    <span>99.9%</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '99.9%' }}
                                        transition={{ duration: 1.5 }}
                                        className="h-full bg-workspace-highlight shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-premium p-8 rounded-3xl border-white/5 flex flex-col items-center justify-center text-center gap-4"
                        >
                            <Coffee size={32} className="text-orange-400" />
                            <div>
                                <div className="text-2xl font-black">∞</div>
                                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Coffee/Code Ratio</div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-premium p-8 rounded-3xl border-white/5 flex flex-col items-center justify-center text-center gap-4"
                        >
                            <Sparkles size={32} className="text-cyber-blue" />
                            <div>
                                <div className="text-2xl font-black">7+</div>
                                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Tech Stacks</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Panel({ title, content, icon }: { title: string, content: string, icon: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 glass border-white/5 rounded-2xl hover:border-white/10 transition-all flex flex-col gap-4"
        >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-white mb-1">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{content}</p>
            </div>
        </motion.div>
    );
}
