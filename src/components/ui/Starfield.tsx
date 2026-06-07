import { motion } from 'motion/react';
import { useMemo } from 'react';

export function Starfield() {
  // Generate 100 twinkling stars with memoization to prevent re-renders
  const twinklingStars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="starfield fixed inset-0 z-[-10] overflow-hidden pointer-events-none bg-workspace-warm">
      {/* Existing Drifting Background Layers */}
      <div className="stars-layer stars-1" />
      <div className="stars-layer stars-2" />
      <div className="stars-layer stars-3" />

      {/* Dynamic Twinkling Stars */}
      <div className="absolute inset-0">
        {twinklingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              filter: `blur(${star.size / 2}px)`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.2, 1],
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
