"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import type { CaseStudy } from '@/data/case-studies';
import Navbar from '@/components/layout/navbar';
import ParallaxBackground from '@/components/ParallaxBackground';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function CaseStudyContent({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="min-h-screen relative">
      <ParallaxBackground />
      <Navbar showBrand={true} />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <motion.div {...fadeUp}>
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm mb-12"
            >
              <FaArrowLeft size={12} />
              Back to Portfolio
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-block px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-6">
              {caseStudy.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl">
              {caseStudy.subtitle}
            </p>

            {/* Action links */}
            <div className="flex gap-4 mt-8">
              {caseStudy.liveUrl && (
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300"
                >
                  <FaExternalLinkAlt size={14} />
                  Visit Live Site
                </a>
              )}
              {caseStudy.githubUrl && (
                <a
                  href={caseStudy.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
                >
                  <FaGithub size={16} />
                  View Code
                </a>
              )}
            </div>
          </motion.div>

          {/* Overview */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
              {caseStudy.overview}
            </p>
          </motion.section>

          {/* Problem & Solution */}
          <motion.section
            className="grid md:grid-cols-2 gap-12 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                The Challenge
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                The Solution
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-6">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {caseStudy.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Key Features */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-8">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudy.features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-yellow-400 font-bold text-lg shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Results */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-8">
              Results & Outcomes
            </h2>
            <div className="space-y-4">
              {caseStudy.results.map((result, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0" />
                  <p className="text-gray-300">{result}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Footer */}
          <motion.div
            className="border-t border-white/10 pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-gray-400 text-sm mb-1">Like what you see?</p>
              <Link
                href="/#contact"
                className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
              >
                Let&apos;s work together &rarr;
              </Link>
            </div>
            <Link
              href="/#portfolio"
              className="px-6 py-3 border border-white/20 text-white rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300 text-sm font-medium"
            >
              View More Projects
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
