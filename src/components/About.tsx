import { motion } from 'motion/react';
import { Target, TrendingUp, Presentation, Users, Kanban, ShieldAlert, Award, Compass } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

const highlightIcons = [
  Compass, // Analytical mindset
  Target, // Product thinking
  TrendingUp, // KPI reporting
  Users, // Stakeholder communication
  Presentation, // Dashboard building
  Kanban, // Data storytelling
  Award, // Business strategy
];

export default function About({ isDark = false }: { isDark?: boolean }) {
  return (
    <section 
      id="about" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 bg-theme-gradient ${
        isDark 
          ? 'text-white' 
          : 'text-slate-900'
      }`}
    >
      {/* Background glow */}
      <div className={`absolute top-1/2 left-0 w-96 h-96 rounded-full blur-[110px] pointer-events-none ${isDark ? 'bg-[#06B6D4]/5' : 'bg-[#06B6D4]/3'}`} />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-widest">
            Professional Summary
          </p>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
            Deciphering Data. Architecting Strategy.
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full mx-auto" />
        </div>

        {/* Centered Content Layout */}
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Core competency description */}
          <div className={`glass-panel p-6 sm:p-8 rounded-2xl border shadow-xl space-y-4 ${isDark ? 'border-[#3B82F6]/10' : 'border-slate-200'}`}>
            <p className={`text-sm sm:text-base leading-relaxed font-sans ${isDark ? 'text-[#CBD5E1]' : 'text-slate-700'}`}>
              Aniket Giri is an analytical powerhouse and an aspiring Product Manager who excels in bridging the gap between raw, complex metrics and strategic business choices. With solid hands-on expertise in query design, pipeline ETL, BI reporting, and search optimization, he designs highly-intuitive dashboards that deliver actionable product strategy insights.
            </p>
            <p className={`text-sm sm:text-base leading-relaxed font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              His multidisciplinary background spanning electronics systems engineering and operational analytics allows him to model problems systematically and coordinate effortlessly across development and management teams.
            </p>
          </div>

          {/* Competency Card Grid */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block text-center">
              Signature Attributes
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PERSONAL_INFO.highlights.map((hl, index) => {
                const Icon = highlightIcons[index % highlightIcons.length];
                return (
                  <motion.div
                    key={hl.title}
                    whileHover={{ scale: 1.01, x: 3 }}
                    className={`p-4 rounded-xl flex items-start space-x-3 transition-colors duration-200 border ${
                      isDark 
                        ? 'bg-[#0F172A]/40 border-[#3B82F6]/10 hover:border-[#06B6D4]/30' 
                        : 'bg-white border-slate-200 hover:border-[#06B6D4]/30 shadow-sm'
                    }`}
                  >
                    <div className="p-2 bg-[#06B6D4]/10 border border-[#06B6D4]/15 rounded-lg text-[#06B6D4] shrink-0">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className={`text-sm font-semibold font-display ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
                        {hl.title}
                      </h4>
                      <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {hl.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
