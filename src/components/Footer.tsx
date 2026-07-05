import { ArrowUp, Heart, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Footer({ isDark = false }: { isDark?: boolean }) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{ backgroundColor: 'var(--theme-bg-from)', borderColor: 'var(--glass-border)' }}
      className={`border-t py-12 relative overflow-hidden transition-all duration-500 ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}
    >
      {/* Absolute grid lines inside footer */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left segment */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
          <p className={`text-sm font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Designed &amp; Developed by <span className={`font-semibold font-display ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>{PERSONAL_INFO.name}</span>
          </p>
          <p className="text-[11px] text-[#06B6D4] font-mono uppercase tracking-widest">
            Data Analyst • BI Enthusiast • Aspiring PM
          </p>
        </div>

        {/* Middle: Socials links */}
        <div className="flex items-center space-x-4">
          <a 
            href={PERSONAL_INFO.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`p-2 rounded-lg transition border ${
              isDark 
                ? 'bg-[#0F172A]/80 hover:bg-[#1E293B] text-slate-400 hover:text-[#06B6D4] border-[#3B82F6]/10' 
                : 'bg-white hover:bg-slate-50 text-slate-500 hover:text-[#06B6D4] border-slate-200 shadow-sm'
            }`}
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href={PERSONAL_INFO.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`p-2 rounded-lg transition border ${
              isDark 
                ? 'bg-[#0F172A]/80 hover:bg-[#1E293B] text-slate-400 hover:text-[#06B6D4] border-[#3B82F6]/10' 
                : 'bg-white hover:bg-slate-50 text-slate-500 hover:text-[#06B6D4] border-slate-200 shadow-sm'
            }`}
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg transition border ${
              isDark 
                ? 'bg-[#0F172A]/80 hover:bg-[#1E293B] text-slate-400 hover:text-[#06B6D4] border-[#3B82F6]/10' 
                : 'bg-white hover:bg-slate-50 text-slate-500 hover:text-[#06B6D4] border-slate-200 shadow-sm'
            }`}
            title="Email Me"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={handleScrollToTop}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer active:scale-95 border ${
            isDark 
              ? 'bg-[#0F172A] hover:bg-[#1E293B] text-slate-400 hover:text-[#06B6D4] border-[#3B82F6]/10' 
              : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-[#06B6D4] border-slate-200 shadow-sm'
          }`}
          title="Scroll to Top"
        >
          <span className="text-xs font-mono uppercase tracking-wider font-semibold">Back to top</span>
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
      
      <div className={`mt-8 text-center text-[10px] font-mono flex items-center justify-center space-x-1 ${isDark ? 'text-slate-750' : 'text-slate-500'}`}>
        <span>Built with React, Tailwind CSS, &amp; Framer Motion</span>
        <Heart className="w-3 h-3 text-red-500 fill-current" />
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
