import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import NotificationItem from '../../components/NotificationItem';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { notificationsAPI } from '../../services/api';
import { Bell, CheckCheck, RefreshCw } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationsAPI.getAll();
      if (res.success) {
        setNotifications(res.notifications);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      const res = await notificationsAPI.markRead(id);
      if (res.success) {
        setNotifications(res.notifications);
      }
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  const handleClickTicket = (ticketId) => {
    navigate(`/admin/problems/${ticketId}`);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return <LoadingSkeleton type="card" count={4} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Notifications & System Alerts"
        subtitle="Critical escalation alerts, new problem submissions, and feedback updates."
        badge={`${unreadCount} Unread`}
        action={
          <button
            onClick={loadNotifications}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Alerts</span>
          </button>
        }
      />

      {notifications.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center space-y-3">
          <Bell className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">No notifications available.</h3>
          <p className="text-xs text-slate-400">System alerts will appear here as new tickets are reported.</p>
        </div>
      ) : (
        <div className="space-y-3 max-w-4xl">
          {notifications.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              onMarkRead={handleMarkRead}
              onClickTicket={handleClickTicket}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
