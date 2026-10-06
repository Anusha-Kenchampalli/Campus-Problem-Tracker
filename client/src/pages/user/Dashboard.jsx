import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import ProblemCard from '../../components/ProblemCard';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import { userProblemsAPI, userNotificationsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Plus,
  AlertTriangle,
  Clock,
  PlayCircle,
  CheckCheck,
  Bell,
  ArrowRight,
  FolderOpen
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [probRes, notifRes] = await Promise.all([
        userProblemsAPI.getUserProblems(),
        userNotificationsAPI.getAll()
      ]);

      if (probRes.success) setProblems(probRes.problems);
      if (notifRes.success) setNotifications(notifRes.notifications);
    } catch (err) {
      console.error('Failed to load user dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return <LoadingSkeleton type="dashboard" />;
  }

  // Calculate statistics
  const totalCount = problems.length;
  const reportedCount = problems.filter((p) => p.status === 'REPORTED').length;
  const inProgressCount = problems.filter(
    (p) => p.status === 'IN_PROGRESS' || p.status === 'ASSIGNED' || p.status === 'VERIFIED'
  ).length;
  const resolvedCount = problems.filter((p) => p.status === 'RESOLVED').length;

  const unreadNotifications = notifications.filter((n) => !n.read);
  const recentProblems = problems.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <PageHeader
        title={`Good morning, ${user?.name ? user.name.split(' ')[0] : 'Student'}`}
        subtitle="Track and manage the problems you've reported on campus."
        action={
          <button
            onClick={() => navigate('/report-problem')}
            className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition duration-150"
          >
            <Plus className="w-4 h-4" />
            <span>Report a Problem</span>
          </button>
        }
      />

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Reported"
          value={totalCount}
          icon={AlertTriangle}
          color="indigo"
          onClick={() => navigate('/my-problems')}
        />
        <StatCard
          title="Reported"
          value={reportedCount}
          icon={Clock}
          color="amber"
          onClick={() => navigate('/my-problems?status=REPORTED')}
        />
        <StatCard
          title="In Progress"
          value={inProgressCount}
          icon={PlayCircle}
          color="blue"
          onClick={() => navigate('/my-problems?status=IN_PROGRESS')}
        />
        <StatCard
          title="Resolved"
          value={resolvedCount}
          icon={CheckCheck}
          color="emerald"
          onClick={() => navigate('/my-problems?status=RESOLVED')}
        />
      </div>

      {/* Unread Notifications Banner Preview */}
      {unreadNotifications.length > 0 && (
        <div
          onClick={() => navigate('/notifications')}
          className="glass-card rounded-2xl p-4 border border-indigo-500/30 bg-indigo-950/20 hover:bg-indigo-950/30 transition cursor-pointer flex items-center justify-between gap-4"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                You have {unreadNotifications.length} unread notification{unreadNotifications.length > 1 ? 's' : ''}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-1">
                Latest: {unreadNotifications[0].message}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs font-semibold text-indigo-400 shrink-0">
            <span>View Alerts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* Recent Problems Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Your Recent Problems</h2>
            <p className="text-xs text-slate-400">Latest campus issues submitted under your account</p>
          </div>
          {problems.length > 0 && (
            <button
              onClick={() => navigate('/my-problems')}
              className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              <span>View All ({totalCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {recentProblems.length === 0 ? (
          <EmptyState
            title="No Problems Reported Yet"
            description="Have you noticed an issue with Wi-Fi, lab equipment, electrical fittings, or washrooms? Report it now for quick administration action."
            icon={FolderOpen}
            actionText="Report Your First Problem"
            actionLink="/report-problem"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {recentProblems.map((problem) => (
              <ProblemCard key={problem.ticket_id || problem.id} problem={problem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
