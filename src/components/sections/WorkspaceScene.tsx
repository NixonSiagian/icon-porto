import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { cn } from '../../lib/utils';

const ASSETS = {
  COZY: '/Pixel_art_developer_workspace_night_202606071933.jpeg',
  TYPING: '/Pixel_art_developer_typing_code_202606071933.jpeg',
  RAINY: '/Rainy_city_outside_office_window_202606071933.jpeg',
};

const LAYERS = [
  { src: ASSETS.RAINY, depth: 0.2, opacity: 0.9, alt: 'Rainy City Background', scrollDepth: 0.1 },
  { src: ASSETS.COZY, depth: 0.4, opacity: 1, alt: 'Workspace Midground', scrollDepth: 0.3 },
  { src: ASSETS.TYPING, depth: 0.8, opacity: 1, alt: 'Developer Foreground', scrollDepth: 0.6 },
];

export function WorkspaceScene({ isMobile = false }: { isMobile?: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    setMousePos({ x, y });
  };

  const handleImageError = (src: string) => {
    console.error(`[PERF][IMAGE_ERROR] Failed to load: ${src}`);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0 will-change-transform"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {LAYERS.map((layer, index) => {
            const scrollY = useTransform(scrollYProgress, [0, 0.5], [0, -600 * layer.scrollDepth]);
            const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1 + (layer.depth * 0.1)]);
            
            return (
                <motion.div
                    key={index}
                    className="absolute inset-[-20%] pointer-events-none will-change-transform"
                    style={{ y: scrollY, scale, transform: 'translate3d(0,0,0)' }}
                    animate={!isMobile ? {
                        x: [
                          mousePos.x * layer.depth * 120,
                          (mousePos.x * layer.depth * 120) + (Math.sin(Date.now() / 4000 + index) * 5)
                        ],
                        y: [
                          0,
                          Math.cos(Date.now() / 4000 + index) * 10
                        ]
                    } : {}}
                    transition={{ 
                      x: { type: "spring", stiffness: 15, damping: 40 },
                      y: { duration: 8 + index, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <img 
                        src={layer.src} 
                        alt={layer.alt}
                        loading="eager" // Hero critical
                        onError={() => handleImageError(layer.src)}
                        className="w-full h-full object-cover select-none brightness-[0.85]"
                        style={{ opacity: layer.opacity }}
                        width={1920}
                        height={1080}
                    />
                </motion.div>
            );
        })}
      </div>

      {/* Visual Effects Overlay - Simplified on Mobile */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className={`absolute top-[40%] left-[20%] w-[60%] h-[40%] bg-workspace-highlight/5 blur-[120px] rounded-full opacity-40 mix-blend-screen ${!isMobile ? 'animate-pulse' : ''}`} />
        
        {/* Soft Vignette and Gradient Blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-workspace-warm" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60" />
        
        {!isMobile && (
          <>
            <div className="dust-particles absolute inset-0 opacity-[0.1]" />
            <div className="rain-container absolute inset-0 opacity-[0.05] mix-blend-overlay" />
          </>
        )}
      </div>

      {/* Grid Texture */}
      {!isMobile && <div className="absolute inset-0 opacity-[0.03] scanlines z-20 pointer-events-none" />}
    </div>
  );
}

