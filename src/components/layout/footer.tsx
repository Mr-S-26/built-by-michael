"use client";

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Mr-S-26', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/michael-ryan-sia-a1a75028b/', label: 'LinkedIn' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 px-6 py-16">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Large back to top */}
        <motion.button
          onClick={scrollToTop}
          className="group block w-full text-left mb-16"
          whileHover="hover"
        >
          <motion.span
            className="block text-5xl md:text-7xl lg:text-8xl font-bold text-white/10 group-hover:text-yellow-400/30 transition-colors duration-500 leading-[0.9]"
            variants={{ hover: { y: -10 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            Back to top
          </motion.span>
        </motion.button>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Michael Ryan. All rights reserved.
          </p>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-500 hover:text-yellow-400 text-sm transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-yellow-400/50 hover:text-yellow-400 text-gray-500 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;