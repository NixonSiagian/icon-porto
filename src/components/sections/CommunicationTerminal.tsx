import { motion } from 'motion/react';
import { Mail, Camera, Send, Copy, Check, Terminal, MessageSquare, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useState } from 'react';

export function CommunicationTerminal() {
  const [copied, setCopied] = useState(false);
  const email = "nixonsiagian49@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
          
          {/* Left: Communication Protocol */}
          <div className="flex flex-col gap-12">
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-workspace-highlight/10 text-workspace-highlight rounded-full text-[10px] font-mono tracking-widest font-bold">
                    <Terminal size={12} /> COMMUNICATION_TERMINAL 4.0
                </div>

                <h2 className="text-5xl md:text-8xl font-black font-display tracking-tighter leading-none text-white uppercase">
                    Initiate <br />
                    <span className="text-workspace-highlight">Transmission.</span>
                </h2>
                
                <p className="text-lg text-slate-400 leading-relaxed max-w-lg italic">
                    The encrypted relay is open for high-priority collaborations and technical consultations. Initialize the sequence below.
                </p>
            </div>

            <div className="space-y-6">
                <ContactRelay 
                    icon={<Mail size={20} className="text-workspace-highlight" />} 
                    label="Direct Core Relay" 
                    value={email} 
                    action={
                        <button onClick={copyEmail} className="p-2 transition-all group-hover:scale-125">
                            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-slate-600 hover:text-white" />}
                        </button>
                    }
                />
                <ContactRelay 
                    icon={<Terminal size={20} className="text-workspace-highlight" />} 
                    label="Source Code Access" 
                    value="@nixonsiagian" 
                    href="https://github.com/nixonsiagian"
                />
                <ContactRelay 
                    icon={<Camera size={20} className="text-pink-500" />} 
                    label="Visual Studio Logs" 
                    value="@nixonsiagian_" 
                    href="https://instagram.com/nixonsiagian_"
                />
            </div>

            <div className="pt-12 border-t border-white/5 flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-700 uppercase tracking-widest">
                    <ShieldCheck size={12} className="text-green-500" />
                    Protocol: Encrypted
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-700 uppercase tracking-widest">
                    <MessageSquare size={12} className="text-workspace-highlight" />
                    Status: Acceptive
                </div>
            </div>
          </div>

          {/* Right: Message Sequence Payload */}
          <div className="relative">
              <GlassCard className="p-12 border-white/5 bg-black/40 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                     <div className="w-1 h-12 bg-white/5 rounded-full" />
                </div>

                <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <TerminalInput label="Identity_Designation" type="text" placeholder="Full Name" />
                        <TerminalInput label="Relay_Auth_Port" type="email" placeholder="email@address.com" />
                    </div>
                    
                    <TerminalInput label="Priority_Subject" type="text" placeholder="Project / Inquiry / Sync" />
                    
                    <div className="space-y-4">
                        <label className="text-[10px] uppercase font-mono text-slate-600 tracking-[0.3em] font-bold">Encrypted_Payload_Data</label>
                        <textarea 
                            className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 focus:border-workspace-highlight outline-none transition-all placeholder:text-slate-800 font-light resize-none focus:bg-workspace-highlight/[0.02]"
                            placeholder="Initialize message stream..."
                        />
                    </div>
                    
                    <button className="w-full py-6 bg-workspace-highlight text-black font-black uppercase tracking-[0.4em] text-xs rounded-2xl hover:bg-white transition-all duration-500 flex items-center justify-center gap-4 group/btn">
                       TRANSMIT_DATA <Send size={20} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                    </button>
                </form>
              </GlassCard>
          </div>
        </div>

        <footer className="mt-40 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
             <div className="flex flex-col gap-2">
                <div className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.8em]">NIXON_SIAGIAN // DIGITAL_ARCHITECT</div>
                <div className="font-mono text-[8px] text-slate-800 uppercase tracking-[0.4em]">Optimized for interaction / Built for performance</div>
             </div>
             <div className="flex gap-12 text-[10px] font-mono uppercase tracking-widest text-slate-600">
                <a href="#" className="hover:text-workspace-highlight transition-colors flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-workspace-highlight/30" />
                    V4.0.0
                </a>
                <a href="#" className="hover:text-white transition-colors">Legal_Protocols</a>
                <a href="#" className="hover:text-white transition-colors">Core_Index</a>
             </div>
        </footer>
      </div>
    </section>
  );
}

function ContactRelay({ icon, label, value, href, action }: any) {
    const Content = (
        <div className="flex items-center gap-6 group cursor-pointer p-4 -ml-4 rounded-3xl hover:bg-white/[0.02] transition-all border border-transparent hover:border-white/5">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-workspace-highlight/50 transition-all shadow-xl">
                {icon}
            </div>
            <div className="flex-1">
                <div className="text-[10px] uppercase font-mono text-slate-700 mb-1 tracking-widest">{label}</div>
                <div className="text-xl font-bold text-slate-400 group-hover:text-white transition-colors tracking-tight">{value}</div>
            </div>
            {action}
        </div>
    );

    if (href) return <a href={href} target="_blank" rel="noreferrer" className="block">{Content}</a>;
    return Content;
}

function TerminalInput({ label, type, placeholder }: any) {
    return (
        <div className="space-y-4">
             <label className="text-[10px] uppercase font-mono text-slate-600 tracking-[0.3em] font-bold">{label}</label>
             <input 
                type={type} 
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-workspace-highlight outline-none transition-all placeholder:text-slate-800 font-light focus:bg-workspace-highlight/[0.02]"
             />
        </div>
    )
}
