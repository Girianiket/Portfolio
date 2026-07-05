import { motion } from 'motion/react';
import { Briefcase, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { EXPERIENCES } from '../data';

export default function Experience({ isDark = false }: { isDark?: boolean }) {
  return (
    <section 
      id="experience" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 bg-theme-gradient ${
        isDark 
          ? 'text-white' 
          : 'text-slate-900'
      }`}
    >
      {/* Background glow node */}
      <div className={`absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-[110px] pointer-events-none ${isDark ? 'bg-[#06B6D4]/5' : 'bg-[#06B6D4]/3'}`} />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <p className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-widest">
            Milestones
          </p>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
            Professional Experience
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full mx-auto" />
        </div>

        {/* Timeline Layout */}
        <div className={`relative ml-4 sm:ml-8 space-y-12 pb-4 border-l ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
          {/* Main vertical line bullet */}
          {EXPERIENCES.map((exp, index) => {
            return (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 sm:pl-12 group"
              >
                {/* Timeline node bullet */}
                <span className={`absolute -left-3.5 top-1.5 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 z-10 border-2 ${
                  isDark ? 'bg-[#020617] border-slate-800 group-hover:border-[#06B6D4]' : 'bg-white border-slate-200 group-hover:border-[#06B6D4] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                }`}>
                  <Briefcase className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#06B6D4] transition-colors" />
                </span>

                {/* Experience Card */}
                <div className={`glass-panel p-6 rounded-2xl border shadow-xl transition-all duration-300 ${
                  isDark ? 'border-[#3B82F6]/10' : 'border-slate-200'
                }`}>
                  {/* Card Header */}
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 mb-4 ${
                    isDark ? 'border-[#3B82F6]/10' : 'border-slate-100'
                  }`}>
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold font-display group-hover:text-[#06B6D4] transition-colors ${
                        isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
                      }`}>
                        {exp.role}
                      </h3>
                      <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {exp.company}
                      </p>
                    </div>

                    <div className={`flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-full border self-start sm:self-center ${
                      isDark ? 'text-slate-400 bg-[#020617] border-[#3B82F6]/10' : 'text-slate-600 bg-slate-50 border-slate-200'
                    }`}>
                      <Calendar className="w-3.5 h-3.5 text-[#06B6D4]" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Descriptions bullets */}
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((desc, i) => (
                      <li key={i} className={`flex items-start text-xs sm:text-sm font-sans leading-relaxed ${
                        isDark ? 'text-[#CBD5E1]' : 'text-slate-700'
                      }`}>
                        <CheckCircle2 className="w-4 h-4 text-[#06B6D4] mr-2.5 shrink-0 mt-0.5" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills tags */}
                  <div className={`flex flex-wrap gap-2 pt-2 border-t ${isDark ? 'border-[#3B82F6]/10' : 'border-slate-100'}`}>
                    {exp.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
