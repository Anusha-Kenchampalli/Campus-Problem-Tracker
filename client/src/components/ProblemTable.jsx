import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { ExternalLink, Calendar, MapPin, Building2 } from 'lucide-react';

const formatCreatedDate = (ts) => {
  if (!ts) return 'N/A';
  try {
    return new Date(ts).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return ts;
  }
};

const ProblemTable = ({ problems = [], onViewDetails }) => {
  const navigate = useNavigate();

  const handleAction = (ticket_id) => {
    if (onViewDetails) {
      onViewDetails(ticket_id);
    } else {
      navigate(`/admin/problems/${ticket_id}`);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/95 dark:bg-slate-900/95 light:bg-slate-100/90 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 text-[11px] font-bold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4">Ticket ID</th>
              <th className="py-3.5 px-4 min-w-[200px]">Title</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Location</th>
              <th className="py-3.5 px-4">Reported By</th>
              <th className="py-3.5 px-4">Priority</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Created Date</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 dark:divide-slate-800/60 light:divide-slate-200 text-xs text-slate-300 dark:text-slate-300 light:text-slate-800">
            {problems.map((p) => {
              const ticketId = p.ticket_id || p.id;
              const isCritical = p.priority?.admin === 'CRITICAL' || p.priority?.user === 'CRITICAL';

              return (
                <tr
                  key={ticketId}
                  className={`hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-slate-50 transition duration-150 ${
                    isCritical ? 'bg-rose-950/10 dark:bg-rose-950/10 light:bg-rose-50/80' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-400 dark:text-indigo-300 light:text-indigo-600 whitespace-nowrap">
                    {ticketId}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100 dark:text-slate-100 light:text-slate-900 line-clamp-1">
                      {p.problem?.title || p.title}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 dark:text-slate-400 light:text-slate-600 whitespace-nowrap">
                    {p.problem?.category_name || p.category || 'General'}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1.5 text-slate-300 dark:text-slate-300 light:text-slate-700">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate max-w-[130px]">
                        {p.problem?.location_name || p.location || 'Campus'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 whitespace-nowrap">
                    {p.reporter_id || p.reported_by || 'Anonymous'}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <PriorityBadge priority={p.priority?.admin || p.priority?.user || p.priority} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={p.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 dark:text-slate-400 light:text-slate-600">
                    {p.assignment?.department_name || p.department || (
                      <span className="text-slate-500 dark:text-slate-600 light:text-slate-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono text-[11px]">
                    {formatCreatedDate(p.created_at)}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleAction(ticketId)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-600/20 dark:bg-indigo-600/20 light:bg-indigo-50 hover:bg-indigo-600 text-indigo-300 dark:text-indigo-300 light:text-indigo-600 hover:text-white border border-indigo-500/30 dark:border-indigo-500/30 light:border-indigo-200 font-semibold text-xs transition duration-150"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemTable;
