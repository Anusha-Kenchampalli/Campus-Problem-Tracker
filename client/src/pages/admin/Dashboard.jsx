import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import ChartCard from '../../components/ChartCard';
import ProblemTable from '../../components/ProblemTable';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import PriorityBadge from '../../components/PriorityBadge';
import StatusBadge from '../../components/StatusBadge';
import { problemsAPI, analyticsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  UserCheck,
  PlayCircle,
  CheckCheck,
  XCircle,
  Flame,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [probRes, analyticsRes] = await Promise.all([
        problemsAPI.getAll(),
        analyticsAPI.get()
      ]);

      if (probRes.success) {
        setProblems(probRes.problems);
      }
      if (analyticsRes.success) {
        setAnalytics(analyticsRes.analytics);
      }
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSkeleton type="dashboard" />;
  }

  // Derive status and priority statistics directly from backend data
  const statusStats = analytics?.status_distribution || {
    reported: problems.filter((p) => p.status === 'REPORTED').length,
    verified: problems.filter((p) => p.status === 'VERIFIED').length,
    assigned: problems.filter((p) => p.status === 'ASSIGNED').length,
    in_progress: problems.filter((p) => p.status === 'IN_PROGRESS').length,
    resolved: problems.filter((p) => p.status === 'RESOLVED').length,
    rejected: problems.filter((p) => p.status === 'REJECTED').length
  };

  const priorityStats = analytics?.priority_distribution || {
    critical: problems.filter((p) => p.priority?.admin === 'CRITICAL' || p.priority?.user === 'CRITICAL').length,
    high: problems.filter((p) => p.priority?.admin === 'HIGH' || p.priority?.user === 'HIGH').length,
    medium: problems.filter((p) => p.priority?.admin === 'MEDIUM' || p.priority?.user === 'MEDIUM').length,
    low: problems.filter((p) => p.priority?.admin === 'LOW' || p.priority?.user === 'LOW').length
  };

  const criticalIssues = problems.filter(
    (p) => (p.priority?.admin === 'CRITICAL' || p.priority?.user === 'CRITICAL') && p.status !== 'RESOLVED' && p.status !== 'REJECTED'
  );

  const recentProblems = problems.slice(0, 5);

  // Chart dataset preparation
  const priorityChartData = [
    { name: 'Critical', value: priorityStats.critical, color: '#f43f5e' },
    { name: 'High', value: priorityStats.high, color: '#f59e0b' },
    { name: 'Medium', value: priorityStats.medium, color: '#0ea5e9' },
    { name: 'Low', value: priorityStats.low, color: '#64748b' }
  ];

  const statusChartData = [
    { name: 'Reported', count: statusStats.reported, fill: '#f59e0b' },
    { name: 'Verified', count: statusStats.verified, fill: '#6366f1' },
    { name: 'Assigned', count: statusStats.assigned, fill: '#a855f7' },
    { name: 'In Progress', count: statusStats.in_progress, fill: '#3b82f6' },
    { name: 'Resolved', count: statusStats.resolved, fill: '#10b981' },
    { name: 'Rejected', count: statusStats.rejected, fill: '#f43f5e' }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title={`Good morning, ${user?.name ? user.name.split(' ')[0] : 'Admin'}`}
        subtitle="Monitor and manage campus problems across all departments."
        action={
          <button
            onClick={fetchData}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Data</span>
          </button>
        }
      />

      {/* 8 Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Problems"
          value={analytics?.total_problems || problems.length}
          icon={AlertTriangle}
          color="indigo"
          onClick={() => navigate('/admin/problems')}
        />
        <StatCard
          title="Reported"
          value={statusStats.reported}
          icon={Clock}
          color="amber"
          onClick={() => navigate('/admin/problems?status=REPORTED')}
        />
        <StatCard
          title="Verified"
          value={statusStats.verified}
          icon={CheckCircle2}
          color="cyan"
          onClick={() => navigate('/admin/problems?status=VERIFIED')}
        />
        <StatCard
          title="Assigned"
          value={statusStats.assigned}
          icon={UserCheck}
          color="purple"
          onClick={() => navigate('/admin/problems?status=ASSIGNED')}
        />
        <StatCard
          title="In Progress"
          value={statusStats.in_progress}
          icon={PlayCircle}
          color="blue"
          onClick={() => navigate('/admin/problems?status=IN_PROGRESS')}
        />
        <StatCard
          title="Resolved"
          value={statusStats.resolved}
          icon={CheckCheck}
          color="emerald"
          onClick={() => navigate('/admin/problems?status=RESOLVED')}
        />
        <StatCard
          title="Rejected"
          value={statusStats.rejected}
          icon={XCircle}
          color="rose"
          onClick={() => navigate('/admin/problems?status=REJECTED')}
        />
        <StatCard
          title="Critical Issues"
          value={priorityStats.critical}
          icon={Flame}
          color="rose"
          isCritical={true}
          onClick={() => navigate('/admin/priority')}
        />
      </div>

      {/* Critical Issues Section */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-rose-500/30 bg-rose-950/10">
        <div className="flex items-center justify-between pb-4 border-b border-rose-500/20 mb-4">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
            <h2 className="text-base font-bold text-white tracking-wide">Critical Issues Needing Action</h2>
            <span className="px-2 py-0.5 text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
              {criticalIssues.length} Active
            </span>
          </div>
          <button
            onClick={() => navigate('/admin/priority')}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center space-x-1"
          >
            <span>Priority Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {criticalIssues.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 italic">There are currently no unresolved critical issues.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criticalIssues.map((item) => {
              const ticketId = item.ticket_id || item.id;
              return (
                <div
                  key={ticketId}
                  onClick={() => navigate(`/admin/problems/${ticketId}`)}
                  className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-4 hover:border-rose-500/60 transition cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-rose-400">#{ticketId}</span>
                    <StatusBadge status={item.status} size="sm" />
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {item.problem?.title || item.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>Location: {item.problem?.location_name || item.location}</span>
                    <span>Reported: {item.reporter_id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Analytics Visual Charts Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Overview Donut Chart */}
        <ChartCard title="Priority Distribution" subtitle="Campus problems breakdown by priority level">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={priorityChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
              >
                {priorityChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Status Overview Bar Chart */}
        <ChartCard title="Status Distribution" subtitle="Active ticket progression across resolution stages">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={statusChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Problems Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Problems</h2>
            <p className="text-xs text-slate-400">Latest reported tickets across campus</p>
          </div>
          <button
            onClick={() => navigate('/admin/problems')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <span>View All Problems</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <ProblemTable problems={recentProblems} />
      </div>
    </div>
  );
};

export default Dashboard;
