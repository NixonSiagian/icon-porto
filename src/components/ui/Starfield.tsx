import { motion } from 'motion/react';
import { useMemo } from 'react';

export function Starfield({ isMobile = false }: { isMobile?: boolean }) {
  // Reduction star count on mobile for performance
  const starCount = isMobile ? 30 : 100;
  
  const twinklingStars = useMemo(() => {
    return Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 4, // Slower for better battery/CPU
      delay: Math.random() * 5,
    }));
  }, [starCount]);

  return (
    <div className="starfield fixed inset-0 z-[-10] overflow-hidden pointer-events-none bg-workspace-warm">
      {/* Background Layers - Subtler on mobile */}
      <div className={`stars-layer stars-1 ${isMobile ? 'opacity-10' : 'opacity-30'}`} />
      {!isMobile && <div className="stars-layer stars-2 opacity-20" />}
      {!isMobile && <div className="stars-layer stars-3 opacity-15" />}

      {/* Dynamic Twinkling Stars */}
      <div className="absolute inset-0">
        {twinklingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white will-change-[transform,opacity]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              filter: `blur(${star.size / 2}px)`,
              transform: 'translateZ(0)' // Force GPU
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
