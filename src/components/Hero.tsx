import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Database, BarChart, Download, Sparkles, Trophy, BrainCircuit, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

const stats = [
  { icon: Database, label: 'Data Points Processed', value: '5M+', color: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20' },
  { icon: BarChart, label: 'Dashboards Engineered', value: '30+', color: 'text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20' },
  { icon: BrainCircuit, label: 'Operational Insights', value: '150+', color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20' },
  { icon: Trophy, label: 'B.Tech CGPA Score', value: '7.54', color: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20' },
];

export default function Hero({ isDark = false }: { isDark?: boolean }) {
  const [typedText, setTypedText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Turning Data into Business Decisions.',
    'Data Analyst & BI Specialist.',
    'Aspiring Product Manager.'
  ];

  useEffect(() => {
    const activeText = roles[roleIdx];
    const speed = isDeleting ? 30 : 60;
    
    const handleType = () => {
      if (!isDeleting && charIdx < activeText.length) {
        setTypedText(activeText.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      } else if (isDeleting && charIdx > 0) {
        setTypedText(activeText.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      } else if (charIdx === activeText.length) {
        // Pause at full text
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setRoleIdx((roleIdx + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, roleIdx]);

  return (
    <section 
      id="home" 
      className={`relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden transition-colors duration-500 bg-theme-gradient ${
        isDark 
          ? 'text-white' 
          : 'text-slate-900'
      }`}
    >
      {/* Immersive background glow elements */}
      <div className={`absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full blur-[130px] animate-pulse-slow ${isDark ? 'bg-[#06B6D4]/10' : 'bg-[#06B6D4]/5'}`} />
      <div className={`absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full blur-[120px] animate-pulse-slow ${isDark ? 'bg-[#3B82F6]/10' : 'bg-[#3B82F6]/5'}`} style={{ animationDelay: '2s' }} />
      <div className={`absolute top-1/3 right-10 w-[20rem] h-[20rem] rounded-full blur-[100px] animate-pulse-slow ${isDark ? 'bg-[#8B5CF6]/5' : 'bg-[#8B5CF6]/3'}`} style={{ animationDelay: '4s' }} />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)'} 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative w-full text-center flex flex-col items-center justify-center space-y-8">
        {/* Hero Content */}
        <div className="space-y-6 flex flex-col items-center">
          {/* Tag badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
              isDark 
                ? 'bg-[#06B6D4]/10 border-[#06B6D4]/20 text-[#06B6D4]' 
                : 'bg-[#06B6D4]/8 border-[#06B6D4]/20 text-[#0891B2]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>Open for Product Management &amp; Analytics Opportunities</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`font-display text-lg sm:text-xl font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              Hi, I am <span className={`font-bold ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>{PERSONAL_INFO.name}</span>
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-[1.1] tracking-tight min-h-[96px] sm:min-h-[120px] md:min-h-[140px] ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}
            >
              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}></span>{' '}
              <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                {typedText}
              </span>
              <span className="animate-pulse font-light text-[#06B6D4]">|</span>
            </motion.h1>
          </div>

          {/* Short Intro */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-sm sm:text-base leading-relaxed max-w-2xl font-sans ${isDark ? 'text-[#CBD5E1]' : 'text-slate-600'}`}
          >
            {PERSONAL_INFO.aboutSummary}
          </motion.p>

          {/* Buttons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href="#projects"
              className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:brightness-110 text-[#F8FAFC] rounded-xl text-sm font-semibold shadow-lg shadow-[#06B6D4]/20 active:scale-95 transition-all duration-200"
            >
              <span>View Interactive Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=girianiket468@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3.5 rounded-xl text-sm font-semibold active:scale-95 transition-all duration-200 border ${
                isDark 
                  ? 'bg-[#0F172A]/80 hover:bg-[#1E293B] text-[#F8FAFC] border-slate-800/80 hover:border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
              }`}
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
