import { motion } from 'motion/react';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

export default function Certifications({ isDark = false }: { isDark?: boolean }) {
  return (
    <section 
      id="certifications" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 bg-theme-gradient ${
        isDark 
          ? 'text-white' 
          : 'text-slate-900'
      }`}
    >
      {/* Background glow highlights */}
      <div className={`absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${isDark ? 'bg-[#06B6D4]/5' : 'bg-[#06B6D4]/3'}`} />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-widest">
            Credentials
          </p>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
            Professional Certifications
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full mx-auto" />
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => {
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl border backdrop-blur-md shadow-lg flex flex-col justify-between min-h-[180px] relative overflow-hidden group transition-all duration-300 ${
                  isDark
                    ? `bg-gradient-to-br ${cert.color}`
                    : 'bg-white border-slate-200 shadow-sm hover:border-[#06B6D4]/30'
                }`}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${
                      isDark ? 'bg-slate-950/40 border-white/5 text-white/80' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <Award className="w-5 h-5 group-hover:rotate-12 transition-transform duration-350" />
                    </div>
                    <ShieldCheck className="w-4 h-4 text-emerald-400/80" />
                  </div>

                  <div className="space-y-1 text-left">
                    <h3 className={`text-sm sm:text-base font-bold font-display leading-snug ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {cert.name}
                    </h3>
                    <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Issued by: <span className={isDark ? 'text-slate-200' : 'text-slate-800 font-bold'}>{cert.issuer}</span>
                    </p>
                  </div>
                </div>

                {/* Footnote date */}
                {cert.date && (
                  <div className={`text-[10px] font-mono text-left border-t pt-2 mt-4 ${
                    isDark ? 'text-slate-500 border-white/5' : 'text-slate-400 border-slate-100'
                  }`}>
                    Verified Credential • {cert.date}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
