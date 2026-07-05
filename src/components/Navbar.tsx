import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Mail, ArrowUpRight, Palette } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { ThemeKey } from '../App';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  themeColor: ThemeKey;
  setThemeColor: (color: ThemeKey) => void;
}

const themesList = [
  { id: 'slate', name: 'Midnight Slate', colors: 'from-cyan-400 to-blue-500', activeRing: 'ring-cyan-500' },
  { id: 'forest', name: 'Teal Forest', colors: 'from-emerald-400 to-teal-600', activeRing: 'ring-emerald-500' },
  { id: 'orchid', name: 'Deep Orchid', colors: 'from-purple-400 to-indigo-600', activeRing: 'ring-purple-500' },
  { id: 'rose', name: 'Sunset Ember', colors: 'from-rose-400 to-pink-600', activeRing: 'ring-rose-500' }
] as const;

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ isDark, toggleTheme, themeColor, setThemeColor }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={scrolled ? { backgroundColor: 'var(--theme-bg-from)', borderBottomColor: 'var(--glass-border)' } : undefined}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'py-4 backdrop-blur-md shadow-lg border-b'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#06B6D4] to-[#3B82F6] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#06B6D4]/20">
            A
          </div>
          <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent dark:text-white">
            Aniket Giri
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-[#06B6D4] light:text-slate-600 light:hover:text-[#06B6D4] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Selector Pins */}
          <div className="flex items-center space-x-2 bg-[#0F172A]/40 light:bg-slate-200/40 p-1.5 rounded-full border border-slate-800/60 light:border-slate-300/40 mr-1">
            {themesList.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setThemeColor(theme.id)}
                className={`w-4 h-4 rounded-full bg-gradient-to-br ${theme.colors} cursor-pointer hover:scale-125 transition-all duration-200 relative group ${
                  themeColor === theme.id
                    ? 'ring-2 ring-offset-2 dark:ring-offset-slate-950 ring-offset-white scale-110 ' + theme.activeRing
                    : 'opacity-70 hover:opacity-100'
                }`}
                title={theme.name}
                aria-label={`Switch to ${theme.name} background theme`}
              >
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-950 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-50 shadow-lg border border-slate-800">
                  {theme.name}
                </span>
              </button>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-[#0F172A]/80 hover:bg-[#1E293B] text-slate-400 hover:text-[#06B6D4] light:bg-slate-100 light:hover:bg-slate-200 light:text-slate-600 light:hover:text-[#06B6D4] border border-slate-800/80 light:border-slate-200 transition-all duration-200 cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Contact Anchor */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=girianiket468@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:brightness-110 text-white rounded-xl text-xs font-semibold shadow-lg shadow-[#06B6D4]/15 active:scale-95 transition-all duration-200"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* Mobile Navbar controls */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* Small palette list inline */}
          <div className="flex items-center space-x-1 bg-[#0F172A]/40 light:bg-slate-200/40 p-1 rounded-full border border-slate-800/60 light:border-slate-300/40 mr-1">
            {themesList.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setThemeColor(theme.id)}
                className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${theme.colors} cursor-pointer hover:scale-125 transition-all duration-200 ${
                  themeColor === theme.id
                    ? 'ring-2 ring-offset-1 dark:ring-offset-slate-950 ring-offset-white scale-110 ' + theme.activeRing
                    : 'opacity-70'
                }`}
                aria-label={`Switch to ${theme.name} background theme`}
              />
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[#0F172A]/80 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800/85 light:border-slate-200 cursor-pointer"
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#0F172A]/80 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800/85 light:border-slate-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: 'var(--theme-bg-from)', borderBottomColor: 'var(--glass-border)' }}
            className="md:hidden border-b absolute top-full left-0 w-full overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-5 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-400 hover:text-white light:text-slate-600 light:hover:text-[#06B6D4] py-1 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=girianiket468@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:brightness-110 text-white rounded-xl text-center text-sm font-semibold block"
              >
                Let&apos;s Connect
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
