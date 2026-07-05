import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, LineChart, Cpu } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
  key?: string;
}

const statusLines = [
  'Establishing database connection...',
  'Parsing SQL queries and indexes...',
  'Compiling Power BI data models...',
  'Optimizing DAX measures & tables...',
  'Translating raw metrics into KPIs...',
  'Structuring Product Roadmaps (PRDs)...',
  'Ready to launch portfolio...'
];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    // Progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // Small delay for fadeout
          return 100;
        }
        // Speed up near the end or increment dynamically
        const inc = prev < 30 ? 4 : prev < 70 ? 6 : prev < 90 ? 8 : 12;
        return Math.min(prev + inc, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Dynamic status text update based on progress
    const segment = Math.floor(100 / statusLines.length);
    const index = Math.min(Math.floor(progress / segment), statusLines.length - 1);
    setStatusIdx(index);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-[#070a13] z-50 flex flex-col items-center justify-center p-6 text-white overflow-hidden select-none">
      {/* Background neon grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-md w-full flex flex-col items-center">
        {/* Animated Icon Group */}
        <div className="flex items-center space-x-3 mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400"
          >
            <Database className="w-6 h-6" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400"
          >
            <LineChart className="w-6 h-6" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400"
          >
            <Cpu className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-blue-400 via-teal-400 to-violet-400 bg-clip-text text-transparent text-center mb-10"
        >
          ANIKET GIRI PORTFOLIO
        </motion.h1>

        {/* Console Box */}
        <div className="w-full bg-[#0d1527]/80 rounded-2xl border border-slate-800 p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-teal-500 to-violet-500" />
          
          {/* Virtual File Header */}
          <div className="flex items-center justify-between mb-4 text-xs font-mono text-slate-500 border-b border-slate-800/60 pb-3">
            <span>SESSION_INIT: ACTIVE</span>
            <span>v1.0.0-PRO</span>
          </div>

          {/* Big percentage */}
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-4xl font-mono font-bold text-slate-100">{progress}%</span>
            <span className="text-xs font-mono text-teal-400 animate-pulse">● COMPILING</span>
          </div>

          {/* Real-time bar */}
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-6">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-teal-500 to-violet-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          {/* Animated Log Status Line */}
          <div className="h-10 flex items-center justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={statusIdx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-mono text-slate-400 flex items-center space-x-2"
              >
                <span className="text-blue-400 font-bold">&gt;</span>
                <span>{statusLines[statusIdx]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Footnote */}
        <div className="mt-8 text-[11px] font-mono text-slate-600 text-center uppercase tracking-widest">
          Data Analyst • BI Enthusiast • Aspiring PM
        </div>
      </div>
    </div>
  );
}
