import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, action, badge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 gap-4"
    >
      <div>
        <div className="flex items-center space-x-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">{title}</h1>
          {badge && (
            <span className="px-2.5 py-0.5 text-xs font-semibold text-indigo-400 dark:text-indigo-400 light:text-indigo-600 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
};

export default PageHeader;
