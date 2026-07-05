import { useState } from 'react';
import { motion } from 'motion/react';
import { Codepen, Database, FileSpreadsheet, Kanban, CheckSquare, Settings } from 'lucide-react';
import { SKILLS } from '../data';

const categoryIcons = [
  Codepen, // Programming
  Database, // Analytics
  Kanban, // Product
  CheckSquare, // Core
  Settings, // Tools
];

export default function Skills({ isDark = false }: { isDark?: boolean }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section 
      id="skills" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 bg-theme-gradient ${
        isDark 
          ? 'text-white' 
          : 'text-slate-900'
      }`}
    >
      {/* Background neon dots */}
      <div className={`absolute top-1/4 right-1/4 w-[25rem] h-[25rem] rounded-full blur-[100px] pointer-events-none ${isDark ? 'bg-[#06B6D4]/5' : 'bg-[#06B6D4]/3'}`} />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-widest">
            Expertise Matrix
          </p>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
            Technical & Product Capabilities
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full mx-auto" />
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {SKILLS.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];
            const isActive = activeTab === index;
            return (
              <button
                key={category.title}
                onClick={() => setActiveTab(index)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border font-display text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white border-transparent shadow-lg shadow-[#06B6D4]/15 scale-[1.02]'
                    : isDark
                      ? 'bg-[#0F172A]/80 text-slate-400 border-slate-800/80 hover:bg-[#1E293B] hover:text-[#F8FAFC]'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content wrapper with smooth entry animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {SKILLS[activeTab].skills.map((skill, index) => {
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className={`glass-panel p-5 rounded-xl flex flex-col justify-between shadow-xl border ${
                  isDark ? 'border-[#3B82F6]/10' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3 font-mono">
                  <span className={`text-sm font-bold tracking-wide ${isDark ? 'text-[#F8FAFC]' : 'text-slate-800'}`}>{skill.name}</span>
                  <span className="text-xs text-[#06B6D4] font-semibold">{skill.level}%</span>
                </div>

                {/* Progress bar */}
                <div className={`w-full h-2 rounded-full overflow-hidden relative border ${
                  isDark ? 'bg-[#020617] border-[#3B82F6]/20' : 'bg-slate-100 border-slate-200'
                }`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full"
                  />
                </div>

                {/* Micro descriptive tags to represent premium quality */}
                <div className={`mt-2.5 flex items-center justify-between text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  <span>Foundational</span>
                  <span>Intermediate</span>
                  <span className={skill.level >= 90 ? 'text-[#06B6D4] font-semibold' : ''}>Advanced</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote summarizing database/analytics competencies */}
        <div className={`mt-12 text-center text-xs font-mono max-w-xl mx-auto border-t pt-6 ${
          isDark ? 'border-slate-900 text-slate-500' : 'border-slate-200 text-slate-600'
        }`}>
          <span className="text-[#06B6D4] font-bold uppercase mr-1.5">[BI Stack]</span>
          Specialized in SQL joins, indexes, subqueries, ETL, Power BI DAX schema design, and advanced financial mapping.
        </div>
      </div>
    </section>
  );
}
