"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Mr-S-26', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/michael-ryan-sia-a1a75028b/', label: 'LinkedIn' },
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      <motion.div 
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        style={{ y, opacity }}
      >
        {/* Image Section */}
        <motion.div
          className="relative order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative w-80 h-80 mx-auto">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Image container */}
            <div className="relative w-full h-full bg-gray-900 rounded-3xl overflow-hidden border-2 border-yellow-400/20">
              {/* Replace with actual image */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <span className="text-8xl font-bold text-yellow-400">MR</span>
              </div>
              {<Image
                src="/profile.jpg"
                alt="Michael Ryan"
                fill
                className="object-cover"
                priority
              /> }
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400/20 rounded-full backdrop-blur-sm border border-yellow-400/30"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400/20 rounded-full backdrop-blur-sm border border-orange-400/30"
              animate={{
                y: [0, 10, 0],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-yellow-400/20 hover:border-yellow-400 hover:bg-yellow-400/10 text-gray-400 hover:text-yellow-400 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  viewport={{ once: true }}
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
        
        {/* Content Section */}
        <motion.div
          className="order-1 md:order-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get to know me
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Me</span>
          </h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            I&apos;m a Full-Stack Developer with a Bachelor&apos;s degree in Information Technology, 
            specializing in programming. After gaining valuable professional experience in government 
            service, I pursued my passion for web development and have successfully delivered production-ready 
            applications for satisfied clients.
          </p>
          
          <p className="text-gray-300 mb-8 leading-relaxed">
            My journey combines formal IT education with hands-on development experience. I specialize 
            in building modern, scalable web applications using cutting-edge technologies. From complex 
            backend systems to polished user interfaces, I bring dedication, attention to detail, and 
            problem-solving skills to every project.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;