
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// Import all components
import LoadingScreen from '@/components/LoadingScreen';
import ParallaxBackground from '@/components/ParallaxBackground';
import Navbar from '@/components/layout/navbar';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import SkillsSection from '@/components/sections/skills';
import PortfolioSection from '@/components/sections/portfolio';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/layout/footer';

const App = () => {
  const [loadingDone, setLoadingDone] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Handle smooth scroll for anchor links
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('href');
      
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    };

    // Add scroll listener
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Attach event listeners after loading is done
    if (loadingDone) {
      document.addEventListener('click', handleSmoothScroll);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadingDone]);

  // Cursor follower effect (optional enhancement)
  useEffect(() => {
    if (!loadingDone) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cursor.remove();
    };
  }, [loadingDone]);

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        {!loadingDone ? (
          <LoadingScreen 
            key="loading"
            onDone={() => setLoadingDone(true)} 
          />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background - Fixed position */}
            <ParallaxBackground />
            
            {/* Navigation */}
            <Navbar showBrand={true} />
            
            {/* Main Content */}
            <main ref={mainRef} className="relative z-10">
              {/* Hero Section */}
              <HeroSection />
              
              {/* About Section with Parallax */}
              <motion.div
                style={{
                  transform: `translateY(${scrollY * 0.05}px)`,
                }}
              >
                <AboutSection />
              </motion.div>
              
              {/* Skills Section */}
              <SkillsSection />
              
              {/* Portfolio Section */}
              <PortfolioSection />
              
              {/* Contact Section */}
              <ContactSection />
              
              {/* Footer */}
              <Footer />
            </main>
            
            {/* Floating Action Buttons */}
            <motion.div
              className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              {/* Theme Toggle (if implemented) */}
              <motion.button
                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-full flex items-center justify-center text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  // Toggle theme logic here
                }}
              >
                🌙
              </motion.button>
              
              {/* Scroll to Top */}
              <motion.button
                className={`w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  scrollY > 200 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.button>
            </motion.div>
            
            {/* Page Progress Indicator */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 z-[60] origin-left"
              style={{
                scaleX: scrollY / (document.documentElement.scrollHeight - window.innerHeight)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global Styles */}
      <style jsx global>{`
        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 211, 0, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease;
          mix-blend-mode: difference;
        }
        
        @media (hover: hover) {
          .custom-cursor {
            display: block;
          }
        }
        
        @media (hover: none) {
          .custom-cursor {
            display: none;
          }
        }
        
        /* Smooth scroll for the entire page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f97316);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f59e0b, #ea580c);
        }
        
        /* Animation for gradient text */
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </LayoutGroup>
  );
};

export default App;
