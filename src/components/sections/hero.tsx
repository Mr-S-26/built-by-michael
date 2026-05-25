"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
  SiTailwindcss, SiFirebase, SiWordpress, SiExpo,
  SiPrisma, SiRedux, SiMysql, SiSanity
} from 'react-icons/si';

const titles = ['Full-Stack Developer', 'UI/UX Enthusiast', 'Problem Solver'];

const marqueeIcons = [
  { Component: SiReact, color: '#61DAFB', label: 'React' },
  { Component: SiNextdotjs, color: '#FFFFFF', label: 'Next.js' },
  { Component: SiTypescript, color: '#3178C6', label: 'TypeScript' },
  { Component: SiNodedotjs, color: '#339933', label: 'Node.js' },
  { Component: SiTailwindcss, color: '#06B6D4', label: 'Tailwind' },
  { Component: SiFirebase, color: '#FFCA28', label: 'Firebase' },
  { Component: SiWordpress, color: '#21759B', label: 'WordPress' },
  { Component: SiExpo, color: '#FFFFFF', label: 'Expo' },
  { Component: SiPrisma, color: '#2D3748', label: 'Prisma' },
  { Component: SiRedux, color: '#764ABC', label: 'Redux' },
  { Component: SiMysql, color: '#4479A1', label: 'MySQL' },
  { Component: SiSanity, color: '#F03E2F', label: 'Sanity' },
];

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);

  // Duplicate icons for seamless marquee
  const doubleIcons = [...marqueeIcons, ...marqueeIcons];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <motion.div
        className="flex flex-col items-center text-center"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Small intro */}
        <motion.span
          className="inline-block px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-semibold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome to my portfolio
        </motion.span>

        {/* Massive name */}
        <h1 className="font-black leading-[0.85] tracking-tighter">
          <motion.span
            className="block text-[14vw] md:text-[10vw] text-white"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            MICHAEL
          </motion.span>
          <motion.span
            className="block text-[14vw] md:text-[10vw] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-gradient"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            RYAN
          </motion.span>
        </h1>

        {/* Cycling subtitle */}
        <motion.div
          className="h-10 mt-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <CyclingTitle titles={titles} />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.a
            href="#portfolio"
            className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-yellow-400/50 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400/10 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Tech icon marquee strip */}
      <motion.div
        className="absolute bottom-0 left-0 w-full overflow-hidden py-5 border-t border-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="flex gap-16 items-center w-max"
          animate={{ x: [0, -(marqueeIcons.length * 96)] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {doubleIcons.map((icon, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0 opacity-20 hover:opacity-80 transition-opacity duration-300">
              <icon.Component size={28} color={icon.color} />
              <span className="text-xs text-gray-500 font-medium hidden md:block">{icon.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ opacity: heroOpacity }}
      >
        <div className="w-6 h-10 border-2 border-yellow-400/40 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-yellow-400/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// Separate component for cycling titles to isolate re-renders
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const CyclingTitle = ({ titles }: { titles: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={titles[index]}
        className="text-xl md:text-2xl text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {titles[index]}
      </motion.p>
    </AnimatePresence>
  );
};

export default HeroSection;
