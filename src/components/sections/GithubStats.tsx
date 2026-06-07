import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star, GitFork, Activity, ShieldCheck, Terminal, Cpu, Database, Award, TrendingUp, Calendar, Zap } from 'lucide-react';
import { GitHubStats } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export function GithubWarRoom({ isMobile = false }: { isMobile?: boolean }) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const start = performance.now();
    axios.get('/api/github-stats')
      .then(res => {
        setStats(res.data);
        console.log(`[PERF] GitHub Stats Loaded: ${Math.round(performance.now() - start)}ms`);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-workspace-warm gap-8">
        <div className="w-16 h-16 border-t-2 border-workspace-highlight rounded-full animate-spin" />
        <div className="font-mono text-workspace-highlight animate-pulse tracking-widest text-xs uppercase">
            CONNECTING TO GITHUB CORE...
        </div>
    </div>
  );
  
  if (!stats) return null;

  const CHART_DATA = stats.repos.map((r, i) => ({
    name: r.name.substring(0, 8),
    stars: Number(r.stars) || 0,
    activity: Math.floor(Math.random() * 50) + 10
  })).reverse();

  const VELOCITY_DATA = stats.contributions.weeks?.slice(isMobile ? -6 : -12).map((week, index) => ({
    name: `W${index + 1}`,
    count: week.days.reduce((sum, day) => sum + (day.count || 0), 0),
    fullDate: week.days[0].date
  })) || [];

  const displayWeeks = isMobile ? stats.contributions.weeks?.slice(-20) : stats.contributions.weeks;

  return (
    <section id="war-room" className="py-24 sm:py-32 px-6 relative overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Command Header */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 border-b border-white/5 pb-12">
            <div className="relative group cursor-pointer" onClick={() => setShowDebug(!showDebug)}>
                <div className="absolute inset-0 bg-workspace-highlight/20 blur-[30px] rounded-full group-hover:bg-workspace-highlight/40 transition-all" />
                <img src={stats.user.avatarUrl} className="w-40 h-40 rounded-3xl border-2 border-white/10 p-2 relative z-10 grayscale hover:grayscale-0 transition-all duration-500" alt="Avatar" />
                <div className="absolute -bottom-4 -right-4 bg-workspace-highlight text-black p-3 rounded-xl z-20 shadow-xl">
                    <ShieldCheck size={24} />
                </div>
            </div>
            
            <div className="text-center lg:text-left flex-1 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter font-display text-white italic">
                        GITHUB. <span className="text-workspace-highlight">ACTIVITY</span>
                    </h2>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Real-time Development Analytics</p>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <ProfileBadge icon={<Terminal size={14}/>} label="USER" value={`@${stats.user.login}`} />
                    <ProfileBadge icon={<Cpu size={14}/>} label="REPOS" value={stats.user.publicRepos} />
                    <ProfileBadge icon={<Activity size={14}/>} label="SYNC" value="ACTIVE" />
                    <ProfileBadge icon={<Award size={14}/>} label="RANK" value="DEV" />
                </div>
            </div>
        </div>

        {/* Debug Panel (Requested) */}
        {showDebug && stats.debug && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-8 overflow-hidden"
            >
                <GlassCard className="p-8 border-workspace-highlight/30 bg-workspace-highlight/5 font-mono text-[10px] space-y-4">
                    <div className="flex justify-between items-center text-workspace-highlight border-b border-workspace-highlight/20 pb-2 mb-4">
                        <span className="font-bold flex items-center gap-2"><Terminal size={12}/> SYSTEM_LOGS</span>
                        <button onClick={() => setShowDebug(false)} className="hover:text-white transition-colors">X CLOSE</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>[ TOKEN_OAUTH ]: {stats.debug.tokenLoaded ? 'LOADED_SECURE' : 'MISSING_UNRESTRICTED'}</div>
                        <div>[ API_CORES ]: {stats.debug.apiConnected ? 'CONNECTED' : 'DISCONNECTED'}</div>
                        <div>[ CACHE_HITS ]: {stats.debug.repoCount} UNITS</div>
                        <div>[ LATENCY ]: 42ms</div>
                    </div>
                    <div className="text-slate-500">
                        &gt; Last Handshake: {stats.debug.lastUpdated}<br />
                        &gt; Connection established from ID_JKT via GitHub API v3
                    </div>
                </GlassCard>
            </motion.div>
        )}

        {/* Contribution Matrix */}
        <div className="mb-8">
            <GlassCard className="p-10 pb-12 border-white/5">
                <div className="mb-0">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <Activity className="text-workspace-highlight" />
                            Contribution Activity
                        </h3>
                        <div className="flex items-center gap-4 text-[10px] font-mono">
                            <span className="text-slate-500">[ VELOCITY ]</span>
                            <span className="text-workspace-highlight font-bold uppercase">{stats.contributions.total} Commits</span>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto pb-4 custom-scrollbar">
                        <div className="flex gap-1.5 min-w-max">
                            {displayWeeks?.map((week, wIdx) => (
                                <div key={wIdx} className="flex flex-col gap-1.5">
                                    {week.days?.map((day, dIdx) => (
                                        <motion.div
                                            key={`${wIdx}-${dIdx}`}
                                            whileHover={!isMobile ? { 
                                                scale: 1.4,
                                                boxShadow: '0 0 20px var(--glow-color)',
                                                zIndex: 50
                                            } : {}}
                                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[1px] sm:rounded-[2px] transition-all cursor-crosshair relative group will-change-transform"
                                            style={{ 
                                                backgroundColor: 
                                                    day.level === 0 ? 'rgba(255,255,255,0.02)' :
                                                    day.level === 1 ? 'rgba(255,158,11,0.15)' :
                                                    day.level === 2 ? 'rgba(255,158,11,0.35)' :
                                                    day.level === 3 ? 'rgba(255,158,11,0.65)' :
                                                    'rgba(255,158,11,1)',
                                                ['--glow-color' as any]: '#f59e0b',
                                                transform: 'translate3d(0,0,0)'
                                            }}
                                        >
                                            {!isMobile && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-black border border-white/10 rounded-lg text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60] shadow-2xl">
                                                    <span className="text-workspace-highlight font-bold">{day.date}</span><br />
                                                    &gt; {day.count} Commits
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3D Velocity Chart */}
                <div className="mt-12 h-[200px] w-full bg-black/20 rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-4 right-6 flex items-center gap-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-workspace-highlight animate-pulse" />
                        Interactive_Mode: Active
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={VELOCITY_DATA}>
                            <defs>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF05" vertical={false} />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                            />
                            <Tooltip 
                                cursor={{ fill: 'rgba(255,158,11,0.05)' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-black border border-workspace-highlight/30 p-3 rounded-xl shadow-2xl font-mono text-[10px]">
                                                <div className="text-workspace-highlight font-bold mb-1">{payload[0].payload.fullDate}</div>
                                                <div className="text-white">&gt; {payload[0].value} Commits (Week)</div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar 
                                dataKey="count" 
                                radius={[4, 4, 0, 0]} 
                                barSize={40}
                            >
                                {VELOCITY_DATA.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill="url(#barGradient)"
                                        style={{ filter: entry.count > 10 ? 'url(#glow)' : 'none' }}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
                    <div className="flex items-center gap-6 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-workspace-highlight animate-pulse" />
                             Data Source: Live_Stream
                        </div>
                        <div>Latency: 0.1s</div>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-mono text-slate-500">
                        <span>STAGNANT</span>
                        <div className="flex gap-1">
                            {[0,1,2,3,4].map(l => (
                                <div key={l} className="w-2.5 h-2.5 rounded-[1px]" style={{ 
                                    backgroundColor: 
                                        l === 0 ? 'rgba(255,255,255,0.02)' :
                                        l === 1 ? 'rgba(255,158,11,0.15)' :
                                        l === 2 ? 'rgba(255,158,11,0.35)' :
                                        l === 3 ? 'rgba(255,158,11,0.65)' :
                                        'rgba(255,158,11,1)'
                                }} />
                            ))}
                        </div>
                        <span>HYPERACTIVE</span>
                    </div>
                </div>
            </GlassCard>
        </div>

        {/* Charts & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <GlassCard className="col-span-1 lg:col-span-2 p-10 bg-black/40">
                <div className="flex justify-between items-center mb-10">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                            <TrendingUp className="text-workspace-highlight" /> 
                            PROJECT VISIBILITY
                        </h3>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Repository Star Accumulation Matrix</p>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={CHART_DATA}>
                            <defs>
                                <linearGradient id="colorStars" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF05" vertical={false} />
                            <Tooltip 
                                cursor={{ stroke: '#f59e0b', strokeWidth: 1 }}
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px', fontFamily: 'JetBrains Mono' }} 
                            />
                            <Area type="monotone" dataKey="stars" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorStars)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 gap-6">
                <StatMetric icon={<Zap className="text-yellow-400" />} label="Recent Activity" value={stats.activity.recentEvents ?? 0} sub="Actions (30d)" />
                <StatMetric icon={<Star className="text-workspace-highlight" />} label="Total Stars" value={stats.repos.reduce((a,b) => a + (Number(b.stars) || 0), 0)} sub="Global Impact" />
                <StatMetric icon={<Calendar className="text-cyber-purple" />} label="Commit Peak" value={Math.max(...(stats.contributions.weeks?.flatMap(w => w.days?.map(d => Number(d.count) || 0)) || [0]))} sub="Highest Daily" />
            </div>
        </div>

        {/* Languages & Repos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <GlassCard className="p-10 bg-black/40">
                <h3 className="text-[10px] font-mono text-slate-500 uppercase mb-8 tracking-[0.2em]">Language Distribution</h3>
                <div className="space-y-6">
                    {Object.entries(stats.languages || {}).sort((a,b) => b[1] - a[1]).slice(0, 5).map(([name, count], i) => (
                        <div key={name} className="group">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-lg font-bold text-white group-hover:text-workspace-highlight transition-colors">{name}</span>
                                <span className="text-[10px] font-mono text-slate-600">{count} UNITS</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 1.5 }}
                                    className="h-full bg-workspace-highlight" 
                                />
                            </div>
                        </div>
                    ))}
                </div>
             </GlassCard>

             <GlassCard className="col-span-1 md:col-span-2 p-10 bg-black/40 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">Active Repositories</h3>
                    <div className="text-[10px] font-mono text-workspace-highlight">[ RECENT_UNITS ]</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.repos.slice(0, 4).map((repo, i) => (
                        <a key={i} href={repo.url} target="_blank" rel="noreferrer" className="block p-6 glass border-white/5 hover:border-workspace-highlight/30 transition-all rounded-2xl group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight size={14} className="text-workspace-highlight" />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-white group-hover:text-workspace-highlight transition-colors truncate pr-4">{repo.name}</span>
                                <GitFork size={12} className="text-slate-600" />
                            </div>
                            <p className="text-xs text-slate-500 mb-4 line-clamp-1 italic">{repo.description || 'System logic archive.'}</p>
                            <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-widest">
                                <span className="text-workspace-highlight">{repo.language}</span>
                                <span className="flex items-center gap-1 text-slate-500"><Star size={10} className="fill-current"/> {repo.stars}</span>
                            </div>
                        </a>
                    ))}
                </div>
             </GlassCard>
        </div>
      </div>
    </section>
  );
}

function ArrowUpRight({ size, className }: any) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
}

function ProfileBadge({ icon, label, value }: any) {
    return (
        <div className="flex items-center gap-3 px-4 py-2 glass rounded-lg border-white/5">
            <span className="text-gray-500">{icon}</span>
            <div className="font-mono">
                <span className="text-[9px] block text-gray-600 leading-none">{label}</span>
                <span className="text-sm block leading-tight font-bold">{value ?? 'N/A'}</span>
            </div>
        </div>
    )
}

function StatMetric({ icon, label, value, sub }: any) {
    const displayValue = isNaN(value) ? '0' : String(value ?? '0');
    return (
        <GlassCard className="p-8 flex items-center gap-6 border-white/5 hover:bg-white/[0.05] transition-all">
            <div className="p-4 bg-white/5 rounded-2xl">
                {icon}
            </div>
            <div>
                <div className="text-[10px] uppercase font-mono text-gray-500 mb-1">{label}</div>
                <div className="text-3xl font-black">{displayValue}</div>
                <div className="text-[10px] text-gray-400 font-mono">{sub}</div>
            </div>
        </GlassCard>
    )
}
