import React from 'react';
import { motion } from 'framer-motion';

const ChartCard = ({ title, subtitle, children, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-panel rounded-2xl border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 p-5 sm:p-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-800/60 dark:border-slate-800/60 light:border-slate-200">
        <div>
          <h3 className="text-base font-bold text-white dark:text-white light:text-slate-900 tracking-wide">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="w-full flex-1 min-h-[260px] flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};

export default ChartCard;
