import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal, Camera, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';

const NAV_LINKS = [
  { name: 'Profile', href: '#workspace' },
  { name: 'Skills', href: '#dna' },
  { name: 'Projects', href: '#laboratory' },
  { name: 'Activity', href: '#war-room' },
  { name: 'Journey', href: '#journey' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-8",
      isScrolled ? "bg-workspace-warm/80 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-workspace-highlight rounded-lg flex items-center justify-center font-black text-black group-hover:scale-110 transition-transform duration-500 font-display">
            NS
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-sans">Nixon Siagian</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 hover:text-workspace-highlight transition-all relative group font-bold"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-workspace-highlight transition-all group-hover:w-full" />
            </a>
          ))}
          <div className="h-6 w-px bg-white/10 mx-2" />
          <div className="flex gap-5">
            <a href="https://github.com/nixonsiagian" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors"><Terminal size={18} /></a>
            <a href="https://instagram.com/nixonsiagian_" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-pink-500 transition-colors"><Camera size={18} /></a>
          </div>
        </div>

        <button className="lg:hidden text-white p-2 glass rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-workspace-warm border-b border-white/10 overflow-hidden lg:hidden"
          >
            <div className="p-8 flex flex-col gap-6 text-white">
                {NAV_LINKS.map(link => (
                <a 
                    key={link.name} 
                    href={link.href}
                    className="text-xl font-black font-display uppercase tracking-widest text-slate-400 hover:text-workspace-highlight transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {link.name}
                </a>
                ))}
                <div className="h-px w-full bg-white/5 my-2" />
                <div className="flex gap-8">
                    <a href="https://github.com/nixonsiagian" className="text-slate-500 hover:text-white"><Terminal size={24} /></a>
                    <a href="https://instagram.com/nixonsiagian_" className="text-slate-500 hover:text-pink-500"><Camera size={24} /></a>
                    <a href="mailto:nixonsiagian49@gmail.com" className="text-slate-500 hover:text-workspace-highlight"><Mail size={24} /></a>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
