import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import NotificationItem from '../../components/NotificationItem';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import { userNotificationsAPI } from '../../services/api';
import { Bell, RefreshCw, BellOff } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await userNotificationsAPI.getAll();
      if (res.success) {
        setNotifications(res.notifications);
      }
    } catch (err) {
      console.error('Failed to load student notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      const res = await userNotificationsAPI.markRead(id);
      if (res.success) {
        setNotifications(res.notifications);
      }
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  const handleClickTicket = (ticketId) => {
    navigate(`/problems/${ticketId}`);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return <LoadingSkeleton type="card" count={4} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications & Ticket Alerts"
        subtitle="Real-time updates regarding verification, department assignment, and problem resolution."
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
        <EmptyState
          title="You're All Caught Up!"
          description="You currently have no new notifications or alerts regarding your reported campus problems."
          icon={BellOff}
        />
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
