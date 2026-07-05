import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Database, BarChart, FileSpreadsheet, Layers, PlayCircle, Eye, Info } from 'lucide-react';
import { PROJECTS, Project } from '../data';
import { WalmartPlayground, HRDashboard, BlinkitDashboard } from './InteractiveDashboards';

export default function Projects({ isDark = false }: { isDark?: boolean }) {
  const [activeDashboard, setActiveDashboard] = useState<string>('walmart');

  return (
    <section 
      id="projects" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 bg-theme-gradient ${
        isDark 
          ? 'text-white' 
          : 'text-slate-900'
      }`}
    >
      {/* Dynamic Background visual cue */}
      <div className={`absolute top-1/2 left-1/3 w-[35rem] h-[35rem] rounded-full blur-[130px] pointer-events-none ${isDark ? 'bg-gradient-to-tr from-[#06B6D4]/5 to-[#3B82F6]/5' : 'bg-gradient-to-tr from-[#06B6D4]/3 to-[#3B82F6]/3'}`} />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-widest">
            Portfolio
          </p>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
            Featured Analytics Case Studies
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full mx-auto" />
          <p className={`text-xs sm:text-sm pt-2 font-mono max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            ⚡ Click on any project card to activate its live interactive BI dashboard simulator below!
          </p>
        </div>

        {/* Project Cards Selector Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PROJECTS.map((project: Project) => {
            const isSelected = activeDashboard === project.id;
            
            // Icon helper
            const ProjectIcon = 
              project.type === 'sql' ? Database : 
              project.type === 'bi' ? BarChart : 
              FileSpreadsheet;

            return (
              <motion.div
                key={project.id}
                onClick={() => setActiveDashboard(project.id)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`cursor-pointer text-left rounded-2xl p-6 transition-all duration-300 border relative overflow-hidden flex flex-col justify-between min-h-[220px] ${
                  isSelected
                    ? isDark 
                      ? 'bg-[#0F172A] border-[#3B82F6]/60 shadow-xl shadow-[#3B82F6]/5 ring-1 ring-[#3B82F6]/30'
                      : 'bg-white border-[#3B82F6]/60 shadow-xl shadow-[#3B82F6]/5 ring-1 ring-[#3B82F6]/30'
                    : isDark
                      ? 'bg-[#0F172A]/40 border-slate-850/60 hover:border-[#3B82F6]/40 hover:bg-[#0F172A]/80'
                      : 'bg-white/60 border-slate-200 hover:border-[#3B82F6]/40 hover:bg-white shadow-sm'
                }`}
              >
                {/* Visual Corner Glow */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#06B6D4]/10 rounded-full blur-xl pointer-events-none" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${
                      isSelected 
                        ? 'bg-[#06B6D4]/15 border-[#06B6D4]/30 text-[#06B6D4]' 
                        : isDark ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <ProjectIcon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
                      {isSelected ? (
                        <span className="flex items-center space-x-1 bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] px-2.5 py-0.5 rounded-full font-bold">
                          <Eye className="w-3 h-3 animate-pulse" />
                          <span>SIMULATING</span>
                        </span>
                      ) : (
                        <span className={`flex items-center space-x-1 hover:text-slate-300 px-2 py-0.5 rounded-full border ${
                          isDark ? 'border-slate-900 bg-slate-950' : 'border-slate-200 bg-slate-50'
                        }`}>
                          <PlayCircle className="w-3 h-3" />
                          <span>Simulate</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className={`text-lg font-bold font-display mb-2 leading-snug ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
                    {project.title}
                  </h3>
                  
                  <p className={`text-xs leading-relaxed font-sans mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.description}
                  </p>
                </div>

                {/* Tags and CTA icons */}
                <div className={`border-t pt-4 flex items-center justify-between mt-auto ${isDark ? 'border-slate-900/60' : 'border-slate-100'}`}>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map(tech => (
                      <span key={tech} className={`text-[9px] font-mono font-bold border px-2 py-0.5 rounded ${
                        isDark ? 'bg-[#020617] text-slate-400 border-[#3B82F6]/10' : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2.5 text-slate-500">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`transition ${isDark ? 'hover:text-[#F8FAFC]' : 'hover:text-slate-900'}`}
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Simulator Viewbox */}
        <div className="relative">
          {/* Decorative halo around simulator */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#06B6D4]/5 to-[#3B82F6]/5 rounded-2xl blur-3xl opacity-50 pointer-events-none" />

          <div className={`glass-panel border rounded-2xl p-6 sm:p-8 shadow-2xl relative ${isDark ? 'border-[#3B82F6]/10' : 'border-slate-200'}`}>
            {/* Header controls badge */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 mb-6 ${isDark ? 'border-[#3B82F6]/15' : 'border-slate-100'}`}>
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse" />
                <h4 className={`font-display font-bold text-sm uppercase tracking-wider flex items-center space-x-2 ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
                  <span>Interactive Playground:</span>
                  <span className="text-[#06B6D4] font-mono normal-case">
                    {PROJECTS.find(p => p.id === activeDashboard)?.title}
                  </span>
                </h4>
              </div>

              <div className={`flex items-center space-x-2 text-[11px] font-mono border px-3 py-1.5 rounded-lg ${
                isDark ? 'text-slate-400 bg-slate-950/80 border-[#3B82F6]/10' : 'text-slate-600 bg-slate-50 border-slate-200'
              }`}>
                <Info className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Adjust filters or queries to update results dynamically!</span>
              </div>
            </div>

            {/* Dashboard simulator router */}
            <div>
              {activeDashboard === 'walmart' && <WalmartPlayground isDark={isDark} />}
              {activeDashboard === 'hr-dashboard' && <HRDashboard isDark={isDark} />}
              {activeDashboard === 'blinkit' && <BlinkitDashboard isDark={isDark} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
