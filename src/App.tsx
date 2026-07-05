import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export type ThemeKey = 'slate' | 'forest' | 'orchid' | 'rose';

export const THEMES = {
  slate: {
    name: 'Midnight Slate',
    primary: '#06B6D4',
    secondary: '#3B82F6',
    dark: {
      from: '#020617',
      via: '#0F172A',
      to: '#020617',
      glassBg: 'rgba(15, 23, 42, 0.55)',
      glassBorder: 'rgba(59, 130, 246, 0.15)',
      glassShadow: 'rgba(2, 6, 23, 0.4)',
      glassBorderHover: 'rgba(6, 182, 212, 0.35)',
      glassShadowHover: 'rgba(6, 182, 212, 0.1)',
    },
    light: {
      from: '#F8FAFC',
      via: '#F1F5F9',
      to: '#F8FAFC',
      glassBg: 'rgba(255, 255, 255, 0.7)',
      glassBorder: 'rgba(15, 23, 42, 0.08)',
      glassShadow: 'rgba(15, 23, 42, 0.05)',
      glassBorderHover: 'rgba(59, 130, 246, 0.3)',
      glassShadowHover: 'rgba(59, 130, 246, 0.05)',
    }
  },
  forest: {
    name: 'Teal Forest',
    primary: '#10B981',
    secondary: '#059669',
    dark: {
      from: '#02120e',
      via: '#04221b',
      to: '#02120e',
      glassBg: 'rgba(4, 28, 22, 0.55)',
      glassBorder: 'rgba(16, 185, 129, 0.15)',
      glassShadow: 'rgba(2, 18, 14, 0.4)',
      glassBorderHover: 'rgba(16, 185, 129, 0.35)',
      glassShadowHover: 'rgba(16, 185, 129, 0.1)',
    },
    light: {
      from: '#f0fdf4',
      via: '#e8f5e9',
      to: '#f0fdf4',
      glassBg: 'rgba(255, 255, 255, 0.75)',
      glassBorder: 'rgba(6, 78, 59, 0.08)',
      glassShadow: 'rgba(6, 78, 59, 0.05)',
      glassBorderHover: 'rgba(16, 185, 129, 0.3)',
      glassShadowHover: 'rgba(16, 185, 129, 0.05)',
    }
  },
  orchid: {
    name: 'Deep Orchid',
    primary: '#A855F7',
    secondary: '#8B5CF6',
    dark: {
      from: '#05020c',
      via: '#0e051c',
      to: '#05020c',
      glassBg: 'rgba(10, 3, 20, 0.55)',
      glassBorder: 'rgba(139, 92, 246, 0.15)',
      glassShadow: 'rgba(5, 2, 12, 0.4)',
      glassBorderHover: 'rgba(168, 85, 247, 0.35)',
      glassShadowHover: 'rgba(168, 85, 247, 0.1)',
    },
    light: {
      from: '#faf5ff',
      via: '#f3e8ff',
      to: '#faf5ff',
      glassBg: 'rgba(255, 255, 255, 0.75)',
      glassBorder: 'rgba(59, 7, 100, 0.08)',
      glassShadow: 'rgba(59, 7, 100, 0.05)',
      glassBorderHover: 'rgba(139, 92, 246, 0.3)',
      glassShadowHover: 'rgba(139, 92, 246, 0.05)',
    }
  },
  rose: {
    name: 'Sunset Ember',
    primary: '#F43F5E',
    secondary: '#E11D48',
    dark: {
      from: '#0a0104',
      via: '#1a0510',
      to: '#0a0104',
      glassBg: 'rgba(18, 2, 8, 0.55)',
      glassBorder: 'rgba(244, 63, 94, 0.15)',
      glassShadow: 'rgba(10, 1, 4, 0.4)',
      glassBorderHover: 'rgba(244, 63, 94, 0.35)',
      glassShadowHover: 'rgba(244, 63, 94, 0.1)',
    },
    light: {
      from: '#fff1f2',
      via: '#ffe4e6',
      to: '#fff1f2',
      glassBg: 'rgba(255, 255, 255, 0.75)',
      glassBorder: 'rgba(76, 5, 25, 0.08)',
      glassShadow: 'rgba(76, 5, 25, 0.05)',
      glassBorderHover: 'rgba(244, 63, 94, 0.3)',
      glassShadowHover: 'rgba(244, 63, 94, 0.05)',
    }
  }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [themeColor, setThemeColor] = useState<ThemeKey>(() => {
    const saved = localStorage.getItem('portfolio-theme-color');
    return (saved as ThemeKey) || 'slate';
  });
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // Mouse move tracker for premium cursor glow effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Theme toggle side effect handler
  useEffect(() => {
    const root = document.documentElement;
    if (!isDark) {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [isDark]);

  // Dynamic CSS variables injector for chosen background colors
  useEffect(() => {
    const root = document.documentElement;
    const colors = THEMES[themeColor][isDark ? 'dark' : 'light'];
    
    root.style.setProperty('--theme-bg-from', colors.from);
    root.style.setProperty('--theme-bg-via', colors.via);
    root.style.setProperty('--theme-bg-to', colors.to);
    root.style.setProperty('--glass-bg', colors.glassBg);
    root.style.setProperty('--glass-border', colors.glassBorder);
    root.style.setProperty('--glass-shadow', colors.glassShadow);
    root.style.setProperty('--glass-border-hover', colors.glassBorderHover);
    root.style.setProperty('--glass-shadow-hover', colors.glassShadowHover);
    
    // Also update body background
    document.body.style.backgroundColor = colors.from;
    
    localStorage.setItem('portfolio-theme-color', themeColor);
  }, [themeColor, isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`min-h-screen font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-300 bg-theme-gradient transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-slate-900 light'
            }`}
          >
            {/* Ambient Radial Hover Glow Circle (Hidden on touch screens) */}
            <div
              className="pointer-events-none fixed inset-0 z-30 opacity-60 transition-opacity duration-300 hidden md:block"
              style={{
                background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, ${
                  isDark ? 'rgba(6, 182, 212, 0.12) 0%, rgba(59, 130, 246, 0.06) 40%, transparent 70%' : 'rgba(59, 130, 246, 0.04) 0%, transparent 70%'
                })`,
              }}
            />

            {/* Glowing vertical lines in background */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]">
              <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-slate-100" />
              <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-slate-100" />
              <div className="absolute left-[85%] top-0 bottom-0 w-[1px] bg-slate-100" />
            </div>

            {/* Main Application Layout */}
            <div className="relative z-10 flex flex-col min-h-screen">
              {/* Header Navigation */}
              <Navbar 
                isDark={isDark} 
                toggleTheme={toggleTheme} 
                themeColor={themeColor}
                setThemeColor={setThemeColor}
              />

              {/* Main Content Sections */}
              <main className="flex-grow">
                {/* Hero section */}
                <Hero isDark={isDark} />

                {/* About summary */}
                <About isDark={isDark} />

                {/* Skills categorize progress meters */}
                <Skills isDark={isDark} />

                {/* Experience timelines */}
                <Experience isDark={isDark} />

                {/* Project interactive simulators */}
                <Projects isDark={isDark} />

                {/* Education history grids */}
                <Education isDark={isDark} />

                {/* Certifications badges */}
                <Certifications isDark={isDark} />

                {/* Glassmorphism contact sheets */}
                <Contact isDark={isDark} />
              </main>

              {/* Minimalist footer with scroll to top trigger */}
              <Footer isDark={isDark} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
