import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={cn(
        "glass p-6 rounded-2xl hover:bg-white/10 transition-colors duration-500",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
