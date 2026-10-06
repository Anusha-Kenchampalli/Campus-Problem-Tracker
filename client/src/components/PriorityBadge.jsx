import React from 'react';
import { AlertOctagon, Flame, ArrowUp, ArrowDown } from 'lucide-react';

const PRIORITY_CONFIG = {
  CRITICAL: {
    label: 'CRITICAL',
    bg: 'bg-rose-500/15 text-rose-300 border-rose-500/40 glow-red ring-1 ring-rose-500/30 animate-pulse',
    icon: AlertOctagon
  },
  HIGH: {
    label: 'HIGH',
    bg: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    icon: Flame
  },
  MEDIUM: {
    label: 'MEDIUM',
    bg: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
    icon: ArrowUp
  },
  LOW: {
    label: 'LOW',
    bg: 'bg-slate-500/15 text-slate-300 border-slate-600/40',
    icon: ArrowDown
  }
};

const PriorityBadge = ({ priority, size = 'md' }) => {
  const normPriority = (priority || 'LOW').toUpperCase();
  const config = PRIORITY_CONFIG[normPriority] || PRIORITY_CONFIG.LOW;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1 font-bold tracking-wider',
    md: 'px-2.5 py-1 text-xs font-bold tracking-wider gap-1.5',
    lg: 'px-3 py-1.5 text-sm font-bold tracking-wider gap-2'
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-md border transition-all duration-200 uppercase ${config.bg} ${sizeClasses}`}
    >
      <IconComponent className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
};

export default PriorityBadge;
