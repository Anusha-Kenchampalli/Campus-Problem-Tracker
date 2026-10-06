import React from 'react';
import { AlertCircle, Info, Star, ShieldAlert, Check } from 'lucide-react';

const NotificationItem = ({ notification, onMarkRead, onClickTicket }) => {
  const { title, message, timestamp, read, type, ticket_id } = notification;

  const typeMap = {
    CRITICAL: {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      icon: ShieldAlert
    },
    INFO: {
      bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
      icon: Info
    },
    FEEDBACK: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      icon: Star
    }
  };

  const currentType = typeMap[type] || typeMap.INFO;
  const IconComponent = currentType.icon;

  const formattedDate = new Date(timestamp).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div
      className={`glass-card p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-4 ${
        read ? 'border-slate-800/60 opacity-80' : 'border-indigo-500/30 bg-slate-900/90 shadow-md'
      }`}
    >
      <div className="flex items-start space-x-3 min-w-0 flex-1">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${currentType.bg}`}>
          <IconComponent className="w-4 h-4" />
        </div>

        <div className="space-y-1 min-w-0">
          <div className="flex items-center space-x-2 flex-wrap">
            <h4 className={`text-xs sm:text-sm font-bold ${read ? 'text-slate-300' : 'text-white'}`}>
              {title}
            </h4>
            {!read && (
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full uppercase">
                New
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{message}</p>
          <div className="flex items-center space-x-3 pt-1 text-[11px] text-slate-500">
            <span>{formattedDate}</span>
            {ticket_id && (
              <button
                onClick={() => onClickTicket && onClickTicket(ticket_id)}
                className="text-indigo-400 hover:text-indigo-300 font-semibold underline"
              >
                Ticket #{ticket_id}
              </button>
            )}
          </div>
        </div>
      </div>

      {!read && (
        <button
          onClick={() => onMarkRead(notification.id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0"
          title="Mark as Read"
        >
          <Check className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
