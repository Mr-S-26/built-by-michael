
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring } from 'framer-motion';

// Import all components
import LoadingScreen from '@/components/LoadingScreen';
import ParallaxBackground from '@/components/ParallaxBackground';
import Navbar from '@/components/layout/navbar';
import HeroSection from '@/components/sections/hero';
import SkillsSection from '@/components/sections/skills';
import PortfolioSection from '@/components/sections/portfolio';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/layout/footer';

const App = () => {
  const [loadingDone, setLoadingDone] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Mouse position for custom cursor (useMotionValue avoids re-renders)
  const rawCursorX = useMotionValue(0);
  const rawCursorY = useMotionValue(0);
  const cursorX = useSpring(rawCursorX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(rawCursorY, { stiffness: 500, damping: 28 });

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

    // Attach event listeners after loading is done
    if (loadingDone) {
      document.addEventListener('click', handleSmoothScroll);
    }

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, [loadingDone]);

  // Cursor follower — update motion values (no re-renders)
  useEffect(() => {
    if (!loadingDone) return;

    const moveCursor = (e: MouseEvent) => {
      rawCursorX.set(e.clientX);
      rawCursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [loadingDone, rawCursorX, rawCursorY]);

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

              {/* Skills Section */}
              <SkillsSection />

              {/* Portfolio Section */}
              <PortfolioSection />

              {/* Contact Section */}
              <ContactSection />

              {/* Footer */}
              <Footer />
            </main>

            {/* Custom cursor (hidden on touch devices via CSS) */}
            <motion.div
              className="custom-cursor"
              style={{
                left: cursorX,
                top: cursorY,
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
