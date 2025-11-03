"use client";

import { useRef, type RefObject } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import ParallaxBackground from "@/components/ParallaxBackground";
import { HeroScene } from "@/components/sections/hero";
import { AboutScene } from "@/components/sections/about";
import Skills from "@/components/sections/skills";

export interface HeroAboutStageProps {
  className?: string;
  containerRef?: RefObject<HTMLElement | null>;
}

export default function HeroAboutStage({
  className = "",
  containerRef,
}: HeroAboutStageProps) {
  const blockRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: blockRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const prog = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  /* phase markers (just for readability) */
  const H_END = 0.33;  // hero ends
  const A_END = 0.66;  // about ends / skills begin

  /* ---------------- HERO ---------------- */
  // fully visible until ~80% of hero phase, then fade to 0 by H_END
  const heroOpacity = useTransform(prog, [0, H_END * 0.8, H_END], [1, 1, 0]);

  /* ---------------- ABOUT ---------------- */
  // slide up from 100% offscreen bottom -> in place by H_END
  // stay put through about phase, then fade out before skills
  const aboutY = useTransform(prog, [H_END * 0.4, H_END, A_END], ["100%", "0%", "0%"]);
  const aboutOpacity = useTransform(
    prog,
    [H_END * 0.6, H_END, A_END * 0.88, A_END],
    [0, 1, 1, 0]
  );

  // internal staggers once in view; keep light
  const aboutImgY = useTransform(prog, [H_END, H_END + 0.08], [40, 0]);
  const aboutTextY = useTransform(prog, [H_END + 0.02, H_END + 0.1], [40, 0]);

  /* ---------------- SKILLS ---------------- */
  // comes up after about fades
  const skillsY = useTransform(prog, [A_END, 1], ["100%", "0%"]);
  const skillsOpacity = useTransform(prog, [A_END + 0.04, 1], [0, 1]);

  return (
    <div ref={blockRef} className={relative h-[300vh] ${className}}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <ParallaxBackground className="absolute inset-0 -z-10" />

        {/* HERO (simple fade) */}
        <HeroScene outerStyle={{ opacity: heroOpacity }} />

        {/* ABOUT (rises, then fades) */}
        <AboutScene
          wrapperStyle={{ y: aboutY, opacity: aboutOpacity }}
          imgStyle={{ y: aboutImgY }}
          textStyle={{ y: aboutTextY }}
        />

        {/* SKILLS (rises after about) */}
        <motion.div
          id="skills"
          className="absolute inset-0 px-6 flex items-center justify-center"
          style={{ y: skillsY, opacity: skillsOpacity }}
        >
          <div className="w-full max-w-6xl">
            <Skills />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
