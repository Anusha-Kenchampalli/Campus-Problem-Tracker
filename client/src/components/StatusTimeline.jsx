import React from 'react';
import StatusBadge from './StatusBadge';
import { Calendar, User, FileText } from 'lucide-react';

const formatTimestamp = (ts) => {
  if (!ts) return 'N/A';
  try {
    const date = new Date(ts);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return ts;
  }
};

const StatusTimeline = ({ history = [] }) => {
  if (!history || history.length === 0) {
    return <p className="text-xs text-slate-500 italic">No timeline history recorded yet.</p>;
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
      {history.map((step, idx) => (
        <div key={idx} className="relative flex flex-col space-y-1.5">
          {/* Node dot */}
          <div
            className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
              step.status === 'RESOLVED'
                ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                : step.status === 'REJECTED'
                ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
                : step.status === 'IN_PROGRESS'
                ? 'bg-blue-500 shadow-sm shadow-blue-500/50'
                : 'bg-indigo-500'
            }`}
          />

          <div className="flex items-center space-x-2">
            <StatusBadge status={step.status} size="sm" />
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              {formatTimestamp(step.timestamp)}
            </span>
          </div>

          {step.note && (
            <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-start gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
              <span>{step.note}</span>
            </p>
          )}

          {step.updated_by && (
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>Updated by: {step.updated_by}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusTimeline;
