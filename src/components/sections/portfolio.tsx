
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'Mobile'];

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Full-Stack',
      description: 'A modern e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
      image: '🛍️',
      tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'Frontend',
      description: 'Collaborative task management application with drag-and-drop functionality and real-time updates.',
      image: '✅',
      tags: ['React', 'TypeScript', 'Tailwind', 'Firebase'],
      githubUrl: '#',
      liveUrl: '#'
    },
    {
      id: 3,
      title: 'Real-time Chat App',
      category: 'Full-Stack',
      description: 'Secure messaging platform with end-to-end encryption and video calling features.',
      image: '💬',
      tags: ['Socket.io', 'Express', 'MongoDB', 'WebRTC'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Portfolio Website',
      category: 'Frontend',
      description: 'Modern portfolio website with smooth animations and responsive design.',
      image: '🎨',
      tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      githubUrl: '#',
      liveUrl: '#'
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      category: 'Frontend',
      description: 'Beautiful weather dashboard with location-based forecasts and interactive maps.',
      image: '🌤️',
      tags: ['React', 'Weather API', 'Chart.js', 'Mapbox'],
      githubUrl: '#',
      liveUrl: '#'
    },
    {
      id: 6,
      title: 'Blog Platform',
      category: 'Full-Stack',
      description: 'Full-featured blog platform with markdown support, comments, and SEO optimization.',
      image: '📝',
      tags: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL'],
      githubUrl: '#',
      liveUrl: '#'
    },
    {
      id: 7,
      title: 'API Gateway',
      category: 'Backend',
      description: 'Scalable API gateway with rate limiting, authentication, and monitoring.',
      image: '🔧',
      tags: ['Node.js', 'Redis', 'Docker', 'Kubernetes'],
      githubUrl: '#'
    },
    {
      id: 8,
      title: 'Mobile Banking App',
      category: 'Mobile',
      description: 'Secure mobile banking application with biometric authentication.',
      image: '📱',
      tags: ['React Native', 'TypeScript', 'Node.js'],
      liveUrl: '#'
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="relative min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
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
            Featured Work
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Portfolio</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for web development
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border ${
                  project.featured ? 'border-yellow-400/40' : 'border-yellow-400/20'
                } hover:border-yellow-400/60 transition-all duration-300`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Project Image */}
                <div className="relative aspect-video bg-gradient-to-br from-yellow-400/10 to-orange-500/10 flex items-center justify-center text-6xl overflow-hidden">
                  {/* Placeholder emoji - replace with actual image */}
                  <motion.div
                    animate={{
                      scale: hoveredProject === project.id ? 1.1 : 1,
                      rotate: hoveredProject === project.id ? 5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.image}
                  </motion.div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub size={20} />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt size={18} />
                      </motion.a>
                    )}
                  </motion.div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 border border-gray-700 rounded-md text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Animated gradient border on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  animate={{
                    backgroundPosition: hoveredProject === project.id ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%'
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-yellow-400/30 text-yellow-400 rounded-full font-semibold hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
