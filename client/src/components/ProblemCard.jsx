import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { MapPin, Calendar, User, ArrowRight } from 'lucide-react';

const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();
  const ticketId = problem.ticket_id || problem.id;

  const formattedDate = new Date(problem.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const isCritical = problem.priority?.admin === 'CRITICAL' || problem.priority?.user === 'CRITICAL';

  return (
    <div
      onClick={() => navigate(`/problems/${ticketId}`)}
      className={`glass-card rounded-2xl p-5 border transition-all duration-200 hover:scale-[1.01] cursor-pointer flex flex-col justify-between ${
        isCritical
          ? 'border-rose-500/40 bg-rose-950/10 dark:bg-rose-950/10 light:bg-rose-50/80 shadow-lg'
          : 'border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-indigo-500/40'
      }`}
    >
      <div>
        {/* Card Header: Ticket ID & Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono font-extrabold text-indigo-400 dark:text-indigo-400 light:text-indigo-600 text-xs tracking-wider">
            #{ticketId}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <PriorityBadge priority={problem.priority?.admin || problem.priority?.user} size="sm" />
            <StatusBadge status={problem.status} size="sm" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900 mb-2 line-clamp-2 leading-snug">
          {problem.problem?.title || problem.title}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {problem.problem?.description || problem.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 space-y-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{problem.problem?.location_name || 'Campus Location'}</span>
          </div>
          <div className="flex items-center space-x-1 font-mono text-[11px] shrink-0 text-slate-500">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-1.5 text-slate-400 dark:text-slate-400 light:text-slate-600">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono text-[11px]">{problem.reporter_id || 'Student'}</span>
          </div>
          <div className="flex items-center space-x-1 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 font-semibold text-xs hover:underline">
            <span>View Ticket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
