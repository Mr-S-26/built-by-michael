"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiWordpress, SiMysql, SiPrisma,
  SiSanity, SiFirebase, SiGit, SiFigma, SiRedux, SiExpo
} from 'react-icons/si';

const skillCategories = [
  {
    title: 'Frontend',
    color: 'from-blue-400 to-cyan-400',
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'React Native', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss }
    ]
  },
  {
    title: 'Backend',
    color: 'from-green-400 to-emerald-400',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'REST APIs', icon: null },
      { name: 'WordPress', icon: SiWordpress },
      { name: 'WP Plugin Dev', icon: SiWordpress },
      { name: 'Nodemailer', icon: null }
    ]
  },
  {
    title: 'Database & CMS',
    color: 'from-purple-400 to-pink-400',
    skills: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'Prisma ORM', icon: SiPrisma },
      { name: 'Sanity CMS', icon: SiSanity },
      { name: 'Firebase', icon: SiFirebase }
    ]
  },
  {
    title: 'Tools & Platforms',
    color: 'from-orange-400 to-red-400',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'Figma', icon: SiFigma },
      { name: 'Redux Toolkit', icon: SiRedux },
      { name: 'Expo', icon: SiExpo }
    ]
  }
];

const additionalSkills = ['GSAP', 'Framer Motion', 'NextAuth.js', 'WooCommerce', 'Leaflet', 'Vercel', 'Payment Gateways', 'Responsive Design'];

const SkillsSection = () => {
  const horizontalRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section id="skills" ref={horizontalRef} className="relative h-auto md:h-[300vh]">
      {/* Desktop: horizontal scroll — hidden on mobile */}
      <div className="hidden md:flex sticky top-0 h-screen items-center overflow-hidden">
        <motion.div className="flex gap-8 pl-16 pr-[20vw]" style={{ x }}>
          {/* Heading panel */}
          <div className="min-w-[35vw] shrink-0 flex flex-col justify-center pr-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9]">
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Skills
              </span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-md text-lg">
              A comprehensive toolkit built across 6+ production projects spanning web and mobile platforms.
            </p>
          </div>

          {/* Category panels */}
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="min-w-[28vw] shrink-0 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-yellow-400/30 transition-all duration-500 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-2 h-10 bg-gradient-to-b ${category.color} rounded-full`} />
                <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
              </div>

              <div className="space-y-5 flex-1">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-3 cursor-default"
                    >
                      {Icon ? (
                        <Icon className="text-gray-500 group-hover:text-yellow-400 transition-colors duration-300 shrink-0" size={22} />
                      ) : (
                        <div className="w-[22px] h-[22px] bg-gradient-to-br from-gray-600 to-gray-700 rounded shrink-0" />
                      )}
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                        {skill.name}
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/0 via-yellow-400/30 to-yellow-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Additional skills panel */}
          <div className="min-w-[28vw] shrink-0 flex flex-col justify-center">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-6">Also experienced with</p>
            <div className="flex flex-wrap gap-3">
              {additionalSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile: vertical stack — hidden on desktop */}
      <div className="md:hidden px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-3">
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Skills
              </span>
            </h2>
            <p className="text-gray-400">
              Built across 6+ production projects spanning web and mobile.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((category, ci) => (
              <motion.div
                key={category.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-2 h-8 bg-gradient-to-b ${category.color} rounded-full`} />
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div key={skill.name} className="flex items-center gap-2">
                        {Icon ? (
                          <Icon className="text-gray-500" size={18} />
                        ) : (
                          <div className="w-4 h-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded" />
                        )}
                        <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tags */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">Also experienced with</p>
            <div className="flex flex-wrap gap-2">
              {additionalSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
