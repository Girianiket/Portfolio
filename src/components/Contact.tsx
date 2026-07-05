import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Github, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Contact({ isDark = false }: { isDark?: boolean }) {
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}`;

  return (
    <section 
      id="contact" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 bg-theme-gradient ${
        isDark 
          ? 'text-white' 
          : 'text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] bg-[#06B6D4]/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-widest">
            Hiring &amp; Collaboration
          </p>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
            Get In Touch
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full mx-auto" />
          
          {/* Active Job Hunting Announcement */}
          <div className="mt-6 p-4 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 max-w-2xl mx-auto text-center">
            <p className="text-sm font-semibold text-[#06B6D4] font-display flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#06B6D4]" />
              🚀 Actively Looking for Roles in Product Management &amp; Analytics!
            </p>
            <p className={`text-xs mt-1 font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              I am open to opportunities as an Associate Product Manager (APM), Data Analyst, BI Analyst, or Product Operations Specialist in Noida or Remote.
            </p>
          </div>
        </div>

        {/* Beautiful Centered Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Email / Gmail Direct Link */}
          <a 
            href={gmailComposeUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex flex-col items-center text-center p-6 rounded-2xl glass-panel shadow-xl transition-all duration-300 group hover:-translate-y-1 border ${
              isDark 
                ? 'border-[#3B82F6]/10 hover:border-[#06B6D4]/50 bg-[#0F172A]/40' 
                : 'border-slate-200 hover:border-[#06B6D4]/50 bg-white hover:shadow-2xl'
            }`}
          >
            <div className="p-3 bg-[#06B6D4]/10 text-[#06B6D4] rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#06B6D4]/5">
              <Mail className="w-6 h-6" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest font-semibold">Email Me</p>
              <p className={`text-sm font-semibold group-hover:text-[#06B6D4] transition-colors ${
                isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
              }`}>{PERSONAL_INFO.email}</p>
              <p className="text-[10px] text-[#06B6D4] font-mono mt-1">Direct to Gmail Compose ↗</p>
            </div>
          </a>

          {/* Phone */}
          <a 
            href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`}
            className={`flex flex-col items-center text-center p-6 rounded-2xl glass-panel shadow-xl transition-all duration-300 group hover:-translate-y-1 border ${
              isDark 
                ? 'border-[#3B82F6]/10 hover:border-[#3B82F6]/50 bg-[#0F172A]/40' 
                : 'border-slate-200 hover:border-[#3B82F6]/50 bg-white hover:shadow-2xl'
            }`}
          >
            <div className="p-3 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#3B82F6]/5">
              <Phone className="w-6 h-6" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest font-semibold">Call Me</p>
              <p className={`text-sm font-semibold group-hover:text-[#3B82F6] transition-colors ${
                isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
              }`}>{PERSONAL_INFO.phone}</p>
              <p className={`text-[10px] font-mono mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Available for calls ↗</p>
            </div>
          </a>

          {/* Location */}
          <div className={`flex flex-col items-center text-center p-6 rounded-2xl glass-panel shadow-xl transition-all duration-300 border ${
            isDark ? 'border-[#3B82F6]/10 bg-[#0F172A]/40' : 'border-slate-200 bg-white'
          }`}>
            <div className="p-3 bg-[#10B981]/10 text-[#10B981] rounded-xl shadow-lg shadow-[#10B981]/5">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest font-semibold">Location</p>
              <p className={`text-sm font-semibold ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>{PERSONAL_INFO.location}</p>
              <p className={`text-[10px] font-mono mt-1 font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Uttar Pradesh, India</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className={`flex items-center justify-center space-x-4 mt-12 pt-8 border-t ${
          isDark ? 'border-[#3B82F6]/10' : 'border-slate-200'
        }`}>
          <a 
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-center p-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all border ${
              isDark 
                ? 'bg-[#0F172A]/80 hover:bg-[#1E293B] text-slate-400 hover:text-[#06B6D4] border-[#3B82F6]/10' 
                : 'bg-white hover:bg-slate-50 text-slate-500 hover:text-[#06B6D4] border-slate-200 shadow-sm'
            }`}
            title="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a 
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-center p-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all border ${
              isDark 
                ? 'bg-[#0F172A]/80 hover:bg-[#1E293B] text-slate-400 hover:text-[#06B6D4] border-[#3B82F6]/10' 
                : 'bg-white hover:bg-slate-50 text-slate-500 hover:text-[#06B6D4] border-slate-200 shadow-sm'
            }`}
            title="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
