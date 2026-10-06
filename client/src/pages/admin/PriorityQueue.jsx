import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import PriorityBadge from '../../components/PriorityBadge';
import StatusBadge from '../../components/StatusBadge';
import { problemsAPI } from '../../services/api';
import { Flame, AlertOctagon, ArrowUp, ArrowDown, ExternalLink, Calendar, MapPin, Building2 } from 'lucide-react';

const PriorityQueue = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await problemsAPI.getAll();
      if (res.success) {
        setProblems(res.problems);
      }
    } catch (err) {
      console.error('Failed to load priority queue:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <LoadingSkeleton type="card" count={6} />;
  }

  // Helper to group by admin priority (fallback to user priority)
  const getPriorityGroup = (priorityKey) => {
    return problems.filter((p) => {
      const pLevel = (p.priority?.admin || p.priority?.user || 'LOW').toUpperCase();
      return pLevel === priorityKey && p.status !== 'RESOLVED' && p.status !== 'REJECTED';
    });
  };

  const groups = [
    {
      key: 'CRITICAL',
      title: 'Critical Priority Queue',
      description: 'Immediate action required — severe campus disruptions, safety hazards, lab downtime',
      icon: AlertOctagon,
      border: 'border-rose-500/40 bg-rose-950/10',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      problems: getPriorityGroup('CRITICAL')
    },
    {
      key: 'HIGH',
      title: 'High Priority Queue',
      description: 'Major infrastructure, water, network or equipment issues affecting departments',
      icon: Flame,
      border: 'border-amber-500/40 bg-amber-950/10',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      problems: getPriorityGroup('HIGH')
    },
    {
      key: 'MEDIUM',
      title: 'Medium Priority Queue',
      description: 'Standard maintenance requests, classroom repairs, non-blocking hardware faults',
      icon: ArrowUp,
      border: 'border-sky-500/40 bg-sky-950/10',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      problems: getPriorityGroup('MEDIUM')
    },
    {
      key: 'LOW',
      title: 'Low Priority Queue',
      description: 'Minor cosmetic, routine service, or non-urgent queries',
      icon: ArrowDown,
      border: 'border-slate-800 bg-slate-900/40',
      badgeBg: 'bg-slate-700/40 text-slate-300 border-slate-700',
      problems: getPriorityGroup('LOW')
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Priority Resolution Queue"
        subtitle="Active campus problem tickets organized by administrative urgency levels."
        badge={`${problems.filter((p) => p.status !== 'RESOLVED' && p.status !== 'REJECTED').length} Active Tickets`}
      />

      <div className="space-y-8">
        {groups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <div
              key={group.key}
              className={`glass-panel rounded-2xl p-5 sm:p-6 border ${group.border} space-y-4`}
            >
              {/* Group Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-white">
                    <GroupIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-wide">{group.title}</h2>
                    <p className="text-xs text-slate-400">{group.description}</p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${group.badgeBg}`}>
                  {group.problems.length} Tickets
                </span>
              </div>

              {/* Group Ticket Items */}
              {group.problems.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">
                  No active unresolved tickets in this priority category.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.problems.map((p) => {
                    const ticketId = p.ticket_id || p.id;
                    return (
                      <div
                        key={ticketId}
                        onClick={() => navigate(`/admin/problems/${ticketId}`)}
                        className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 transition cursor-pointer space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-indigo-400">#{ticketId}</span>
                            <StatusBadge status={p.status} size="sm" />
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                            {p.problem?.title || p.title}
                          </h4>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              {p.problem?.location_name || 'Campus'}
                            </span>
                            <span className="font-mono text-slate-500">
                              {new Date(p.created_at).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-slate-300">
                              <Building2 className="w-3 h-3 text-slate-500" />
                              {p.assignment?.department_name || 'Unassigned'}
                            </span>
                            <span className="text-indigo-400 font-semibold flex items-center gap-0.5">
                              <span>Open</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriorityQueue;
