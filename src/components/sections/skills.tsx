// components/sections/SkillsSection.tsx
"use client";

import { motion } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb,
  SiGit, SiDocker, SiFigma, SiAmazon,
  SiJavascript, SiPython, SiPrisma, SiGraphql
} from 'react-icons/si';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      color: 'from-blue-400 to-cyan-400',
      skills: [
        { name: 'React', icon: SiReact, level: 95 },
        { name: 'Next.js', icon: SiNextdotjs, level: 90 },
        { name: 'TypeScript', icon: SiTypescript, level: 85 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92 }
      ]
    },
    {
      title: 'Backend',
      color: 'from-green-400 to-emerald-400',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, level: 88 },
        { name: 'Express', icon: SiExpress, level: 85 },
        { name: 'Python', icon: SiPython, level: 75 },
        { name: 'GraphQL', icon: SiGraphql, level: 70 }
      ]
    },
    {
      title: 'Database',
      color: 'from-purple-400 to-pink-400',
      skills: [
        { name: 'PostgreSQL', icon: SiPostgresql, level: 80 },
        { name: 'MongoDB', icon: SiMongodb, level: 85 },
        { name: 'Prisma ORM', icon: SiPrisma, level: 78 },
        { name: 'SQL', icon: null, level: 82 }
      ]
    },
    {
      title: 'Tools & Others',
      color: 'from-orange-400 to-red-400',
      skills: [
        { name: 'Git', icon: SiGit, level: 90 },
        { name: 'Docker', icon: SiDocker, level: 75 },
        { name: 'AWS', icon: SiAmazon, level: 70 },
        { name: 'Figma', icon: SiFigma, level: 85 }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="skills" className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Technical Expertise
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and performant web applications
          </p>
        </motion.div>
        
        {/* Skills Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-2 h-8 bg-gradient-to-b ${category.color} rounded-full`} />
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              
              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      className="group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (i * 0.05) }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {Icon ? (
                            <Icon className="text-gray-400 group-hover:text-yellow-400 transition-colors" size={16} />
                          ) : (
                            <div className="w-4 h-4 bg-gray-600 rounded" />
                          )}
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Tags */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">Also familiar with:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Redux', 'Jest', 'Webpack', 'CI/CD', 'Agile', 'REST APIs', 'WebSockets', 'SEO'].map((skill, i) => (
              <motion.span
                key={skill}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-gray-700 rounded-full text-sm text-gray-400 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (i * 0.05) }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;