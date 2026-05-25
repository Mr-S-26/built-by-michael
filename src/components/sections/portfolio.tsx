"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa';

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 hover:border-yellow-400/40 transition-all duration-500 cursor-pointer ${
        project.featured && index === 0
          ? 'md:col-span-2 md:row-span-2'
          : project.featured
          ? 'md:col-span-2'
          : ''
      }`}
    >
      {/* Full-bleed image with fallback */}
      {!imgError ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
          <span className="text-4xl font-bold text-white/10">
            {project.title.split(' ').map(w => w[0]).join('').slice(0, 3)}
          </span>
        </div>
      )}

      {/* Permanent bottom gradient with title */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 transition-opacity duration-300 group-hover:opacity-0">
        <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-lg font-semibold mt-1 text-white">{project.title}</h3>
      </div>

      {/* Hover overlay — full info */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-xl font-bold mt-1 mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 items-center">
          <Link
            href={`/case-studies/${project.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-full text-xs font-semibold hover:bg-yellow-300 transition-colors"
          >
            <FaBookOpen size={12} />
            Case Study
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
            >
              <FaGithub size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
            >
              <FaExternalLinkAlt size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-yellow-400/90 text-black text-xs font-semibold rounded-full">
            Featured
          </span>
        </div>
      )}
    </motion.div>
  );
};

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Full-Stack', 'Frontend', 'Mobile'];

  const projects: Project[] = [
    {
      id: 1,
      slug: 'hello-better-credit',
      title: 'Hello Better Credit',
      category: 'Full-Stack',
      description: 'An affiliate marketing platform connecting credit card issuers with affiliates. Features click/conversion tracking, commission management, embeddable widgets, and an approval database.',
      image: '/hellobettercredit.png',
      tags: ['Next.js', 'Prisma', 'MySQL', 'NextAuth', 'Bootstrap'],
      liveUrl: 'https://hellobettercredit.com',
      featured: true
    },
    {
      id: 2,
      slug: 'credit-admiral-app',
      title: 'Credit Admiral Mobile App',
      category: 'Mobile',
      description: 'A white-label credit monitoring mobile app for iOS and Android. Tracks scores across 3 bureaus, dispute status, action plans, and includes live chat with advisors.',
      image: '/creditadmiral-app.png',
      tags: ['React Native', 'Expo', 'Redux Toolkit', 'Firebase', 'TypeScript'],
      featured: true
    },
    {
      id: 3,
      slug: 'credit-admiral-site',
      title: 'Credit Admiral Website',
      category: 'Frontend',
      description: 'Marketing website for a credit repair SaaS platform. Features GSAP animations, pricing tiers, training video library, and referral tracking system.',
      image: '/creditadmiral-site.png',
      tags: ['Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    },
    {
      id: 4,
      slug: 'ootb-creatives',
      title: 'OOTB Creatives',
      category: 'Full-Stack',
      description: 'Agency website for a full-service creative & marketing firm. Includes snap-scroll sections, video hero, team profiles, case studies, careers page, and contact forms with email integration.',
      image: '/ootb.png',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Nodemailer'],
      liveUrl: 'https://ootbcreatives.asia/',
      featured: true
    },
    {
      id: 5,
      slug: 'pudci',
      title: 'PUDCI Platform',
      category: 'Full-Stack',
      description: 'Healthcare portal for a diagnostic center chain with 7 branches. Features an interactive body-map symptom checker, searchable test catalog, branch maps, and Sanity CMS for content management.',
      image: '/pudci.png',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Leaflet'],
      liveUrl: 'https://www.pudci.ph/',
    },
    {
      id: 6,
      slug: 'acca-membership',
      title: 'ACCA Membership Portal',
      category: 'Full-Stack',
      description: 'Membership management site for the American Credit Counselor Association. Features recurring billing, e-signatures, PDF generation, and an interactive US member map.',
      image: '/acca.png',
      tags: ['WordPress', 'WooCommerce', 'REST API', 'NMI Gateway'],
    }
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="relative px-6 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Header — asymmetric: title left, filters right */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9]">
              Selected{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Work
              </span>
            </h2>
            <p className="text-gray-400 mt-3 text-lg">
              Production-ready applications built with modern tech
            </p>
          </div>

          {/* Filter buttons with layoutId indicator */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="relative px-5 py-2 rounded-full font-medium text-sm transition-colors duration-300"
              >
                {selectedCategory === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${
                  selectedCategory === category ? 'text-black' : 'text-gray-400 hover:text-white'
                }`}>
                  {category}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] gap-4 grid-flow-row-dense"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="col-span-full text-center py-20"
              >
                <p className="text-gray-400 text-lg">More projects coming soon.</p>
              </motion.div>
            )}
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/Mr-S-26"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-yellow-400/30 text-yellow-400 rounded-full font-semibold hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
