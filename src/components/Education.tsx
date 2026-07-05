import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';
import { EDUCATION_HISTORY } from '../data';

export default function Education({ isDark = false }: { isDark?: boolean }) {
  return (
    <section 
      id="education" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 bg-theme-gradient ${
        isDark 
          ? 'text-white' 
          : 'text-slate-900'
      }`}
    >
      {/* Background radial highlight */}
      <div className={`absolute top-1/2 left-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${isDark ? 'bg-[#06B6D4]/5' : 'bg-[#06B6D4]/3'}`} />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-widest">
            Academic Background
          </p>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
            Education & Academic Scores
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full mx-auto" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_HISTORY.map((edu, index) => {
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`glass-panel p-6 rounded-2xl transition-colors duration-200 flex flex-col justify-between min-h-[250px] relative group shadow-xl border ${
                  isDark ? 'border-[#3B82F6]/10' : 'border-slate-200 bg-white/70'
                }`}
              >
                {/* Glowing border effects on hover */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] rounded-xl">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    
                    <span className="text-xs font-mono text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2.5 py-1 rounded-full font-bold">
                      {edu.score}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className={`text-sm sm:text-base font-bold font-display group-hover:text-[#06B6D4] transition-colors leading-snug ${
                      isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
                    }`}>
                      {edu.degree}
                    </h3>
                    <p className={`text-xs font-semibold font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {edu.institution}
                    </p>
                  </div>

                  {edu.details && (
                    <ul className="space-y-1 mt-2">
                      {edu.details.map((detail, i) => (
                        <li key={i} className={`text-xs font-sans leading-relaxed flex items-start ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <span className="text-[#06B6D4] mr-1.5 font-bold">▪</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Date indicator in card base */}
                <div className={`border-t pt-3 mt-4 flex items-center space-x-1.5 text-xs font-mono text-slate-500 ${
                  isDark ? 'border-slate-900/60' : 'border-slate-100'
                }`}>
                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                  <span>{edu.period}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Academic Achievements Badge banner */}
        <div className={`mt-10 border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
          isDark ? 'bg-[#0F172A]/40 border-[#3B82F6]/15' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2 bg-[#06B6D4]/10 text-[#06B6D4] rounded-lg">
              <Award className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className={`text-xs font-mono font-bold uppercase tracking-wide ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>Excellent Grade Records</p>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Maintained high score ratios in high school and intermediate science curriculum.</p>
            </div>
          </div>
          <div className="flex gap-4 self-start sm:self-center">
            <div className={`text-center px-3.5 py-1.5 rounded-lg border ${
              isDark ? 'bg-[#020617] border-[#3B82F6]/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-xs font-mono text-slate-500 block">Class 12th</span>
              <span className={`text-sm font-bold font-display ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>91.6%</span>
            </div>
            <div className={`text-center px-3.5 py-1.5 rounded-lg border ${
              isDark ? 'bg-[#020617] border-[#3B82F6]/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-xs font-mono text-slate-500 block">Class 10th</span>
              <span className={`text-sm font-bold font-display ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>86%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
