
"use client";

import { useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Mouse tracking via motion values (no re-renders)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX * 0.05);
      rawMouseY.set(e.clientY * 0.05);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  const mouseX = useSpring(rawMouseX, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(rawMouseY, { stiffness: 50, damping: 20 });

  const y1 = useTransform(scrollY, [0, 2000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 2000], [0, -100]);

  // Pre-compute particle positions so they don't change on re-render
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${(i * 8.3 + 4) % 100}%`,
        delay: (i * 0.4) % 5,
        duration: 20 + (i % 5) * 4,
      })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(255, 211, 0, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(220, 38, 127, 0.2) 0%, transparent 50%)
          `,
          y: prefersReducedMotion ? 0 : y1,
        }}
      />

      {!prefersReducedMotion && (
        <>
          {/* Floating orbs with parallax */}
          <motion.div
            style={{ y: y2, x: mouseX }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y3, x: mouseY }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          />
        </>
      )}

      {/* Dynamic grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,211,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,211,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating particles (skipped when user prefers reduced motion) */}
      {!prefersReducedMotion &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            style={{ left: p.left, top: '100%' }}
            animate={{ y: '-120vh' }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          />
        ))}
    </div>
  );
};

export default ParallaxBackground;
