import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  isMobile?: boolean;
}

export function ParallaxSection({ children, offset = 50, className = "", isMobile = false }: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scrollOffset = isMobile ? offset * 0.3 : offset;
  const y = useTransform(scrollYProgress, [0, 1], [scrollOffset, -scrollOffset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, transform: 'translate3d(0,0,0)' }}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
}
