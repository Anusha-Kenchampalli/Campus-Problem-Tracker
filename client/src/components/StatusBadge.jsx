import React from 'react';
import { Clock, CheckCircle2, UserCheck, PlayCircle, CheckCheck, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
  REPORTED: {
    label: 'Reported',
    bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: Clock
  },
  VERIFIED: {
    label: 'Verified',
    bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    icon: CheckCircle2
  },
  ASSIGNED: {
    label: 'Assigned',
    bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    icon: UserCheck
  },
  IN_PROGRESS: {
    label: 'In Progress',
    bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    icon: PlayCircle
  },
  RESOLVED: {
    label: 'Resolved',
    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: CheckCheck
  },
  REJECTED: {
    label: 'Rejected',
    bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    icon: XCircle
  }
};

const StatusBadge = ({ status, size = 'md' }) => {
  const config = STATUS_CONFIG[status] || {
    label: status || 'Unknown',
    bg: 'bg-slate-800 text-slate-400 border-slate-700',
    icon: Clock
  };

  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs font-semibold gap-1.5',
    lg: 'px-3 py-1.5 text-sm font-semibold gap-2'
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-sm transition-all duration-200 ${config.bg} ${sizeClasses}`}
    >
      <IconComponent className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
