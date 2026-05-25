"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaBriefcase } from 'react-icons/fa';

const RevealParagraph = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 50%"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.p
      ref={ref}
      className="text-gray-300 mb-6 leading-relaxed text-lg"
      style={{ opacity, y }}
    >
      {children}
    </motion.p>
  );
};

const AboutSection = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Mr-S-26', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/michael-ryan-sia-a1a75028b/', label: 'LinkedIn' },
    { icon: FaBriefcase, href: 'https://v2.onlinejobs.ph/jobseekers/info/4459675', label: 'OnlineJobs.ph' },
  ];

  return (
    <section id="about" className="relative px-6 py-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 md:gap-16 items-start">
        {/* Left column — sticky image (2/5) */}
        <motion.div
          className="md:col-span-2 order-2 md:order-1 md:sticky md:top-[20vh]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative w-72 h-72 md:w-full md:h-auto md:aspect-square mx-auto">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Image container */}
            <div className="relative w-full h-full bg-gray-900 rounded-3xl overflow-hidden border-2 border-yellow-400/20">
              <Image
                src="/profile.jpg"
                alt="Michael Ryan"
                fill
                className="object-cover"
                priority
              />
            </div>
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

        {/* Right column — content (3/5) */}
        <div className="md:col-span-3 order-1 md:order-2">
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-10 leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Me
            </span>
          </motion.h2>

          <RevealParagraph>
            I&apos;m a Full-Stack Developer with a Bachelor&apos;s degree in Information Technology,
            specializing in programming. After gaining valuable professional experience in government
            service, I pursued my passion for web development and have successfully delivered production-ready
            applications for satisfied clients.
          </RevealParagraph>

          <RevealParagraph>
            My journey combines formal IT education with hands-on development experience. I specialize
            in building modern, scalable web applications using cutting-edge technologies. From complex
            backend systems to polished user interfaces, I bring dedication, attention to detail, and
            problem-solving skills to every project.
          </RevealParagraph>

          <RevealParagraph>
            Whether it&apos;s an affiliate marketing platform, a credit monitoring mobile app,
            a healthcare portal, or a membership management system — I approach every project
            with the same level of commitment and craftsmanship.
          </RevealParagraph>

          {/* CTA Button */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;