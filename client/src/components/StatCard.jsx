import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color = 'indigo', onClick, isCritical = false }) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20 hover:border-indigo-500/40',
      text: 'text-indigo-400 dark:text-indigo-400 light:text-indigo-600',
      glow: ''
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      text: 'text-amber-400 dark:text-amber-400 light:text-amber-600',
      glow: ''
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      text: 'text-cyan-400 dark:text-cyan-400 light:text-cyan-600',
      glow: ''
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      text: 'text-purple-400 dark:text-purple-400 light:text-purple-600',
      glow: ''
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20 hover:border-blue-500/40',
      text: 'text-blue-400 dark:text-blue-400 light:text-blue-600',
      glow: ''
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      text: 'text-emerald-400 dark:text-emerald-400 light:text-emerald-600',
      glow: ''
    },
    rose: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30 hover:border-rose-500/50',
      text: 'text-rose-400 dark:text-rose-400 light:text-rose-600',
      glow: 'glow-red'
    }
  };

  const currentTheme = colorMap[color] || colorMap.indigo;

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`glass-card rounded-2xl p-5 border transition-all duration-200 ${
        currentTheme.border
      } ${currentTheme.glow} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 mt-1 font-mono tracking-tight">
            {value !== undefined ? value : 0}
          </h3>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentTheme.bg} ${currentTheme.text}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
