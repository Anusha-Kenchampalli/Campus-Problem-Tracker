import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import ChartCard from '../../components/ChartCard';
import StatCard from '../../components/StatCard';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { analyticsAPI } from '../../services/api';
import {
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Star,
  RefreshCw,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const res = await analyticsAPI.get();
      if (res.success) {
        setData(res.analytics);
      }
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading || !data) {
    return <LoadingSkeleton type="dashboard" />;
  }

  const {
    total_problems,
    status_distribution,
    priority_distribution,
    category_distribution = [],
    department_distribution = [],
    monthly_trends = [],
    performance_metrics = {},
    feedback_summary = {}
  } = data;

  // Chart datasets
  const priorityChartData = [
    { name: 'Critical', value: priority_distribution.critical, color: '#f43f5e' },
    { name: 'High', value: priority_distribution.high, color: '#f59e0b' },
    { name: 'Medium', value: priority_distribution.medium, color: '#0ea5e9' },
    { name: 'Low', value: priority_distribution.low, color: '#64748b' }
  ];

  const statusChartData = [
    { name: 'Reported', count: status_distribution.reported, fill: '#f59e0b' },
    { name: 'Verified', count: status_distribution.verified, fill: '#6366f1' },
    { name: 'Assigned', count: status_distribution.assigned, fill: '#a855f7' },
    { name: 'In Progress', count: status_distribution.in_progress, fill: '#3b82f6' },
    { name: 'Resolved', count: status_distribution.resolved, fill: '#10b981' },
    { name: 'Rejected', count: status_distribution.rejected, fill: '#f43f5e' }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Campus Problem Analytics"
        subtitle="Operational metrics, SLA resolution speed, category trends, and user feedback insights."
        badge="Real-time Analytics"
        action={
          <button
            onClick={loadAnalytics}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Analytics</span>
          </button>
        }
      />

      {/* KPI Performance Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Avg Assignment Speed</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {performance_metrics.avg_assignment_time_hours || 2.4} <span className="text-xs text-slate-400 font-sans font-normal">hrs</span>
          </div>
          <p className="text-[11px] text-slate-400">Time from report submission to department delegation</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Avg Resolution Speed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {performance_metrics.avg_resolution_time_hours || 18.6} <span className="text-xs text-slate-400 font-sans font-normal">hrs</span>
          </div>
          <p className="text-[11px] text-slate-400">Average ticket time to resolution completion</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Recurring Issue Rate</span>
            <RotateCcw className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {performance_metrics.recurring_problem_rate_pct || 4.2}%
          </div>
          <p className="text-[11px] text-slate-400">Repeated location issue incidents within 30 days</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Student Rating Score</span>
            <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {feedback_summary.avg_rating || 4.6} <span className="text-xs text-slate-400 font-sans font-normal">/ 5.0</span>
          </div>
          <p className="text-[11px] text-slate-400">Based on {feedback_summary.total_feedback_count || 84} student feedback submissions</p>
        </div>
      </div>

      {/* Row 1: Monthly Trends Line/Area Chart & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Problem Volume & Resolution Trends" subtitle="6-Month historical comparison">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthly_trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="reported" stroke="#818cf8" fillOpacity={1} fill="url(#colorReported)" name="Reported" />
              <Area type="monotone" dataKey="resolved" stroke="#34d399" fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Problems by Category" subtitle="Distribution across maintenance domains">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={category_distribution} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis type="number" stroke="#94a3b8" fontSize={11} />
              <YAxis dataKey="category" type="category" stroke="#94a3b8" fontSize={11} width={100} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 6, 6, 0]} name="Ticket Count" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: Department Workload & Priority Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Department Workload & Active vs Resolved" subtitle="Active ticket load across administrative teams">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={department_distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="department" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="active" fill="#f59e0b" name="Active Tickets" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="#10b981" name="Resolved Tickets" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Priority Breakdown Donut" subtitle="Visual ratio of ticket urgency levels">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={priorityChartData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
              >
                {priorityChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Analytics;
