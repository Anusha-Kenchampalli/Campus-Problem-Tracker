import React from 'react';
import { Inbox, AlertCircle, BellOff, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({
  title = 'No Items Found',
  description = 'There are no records to display at this time.',
  icon: Icon = Inbox,
  actionText,
  actionLink,
  onActionClick
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onActionClick) {
      onActionClick();
    } else if (actionLink) {
      navigate(actionLink);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800/80 p-8 sm:p-12 text-center flex flex-col items-center justify-center my-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {(actionText && (actionLink || onActionClick)) && (
        <button
          onClick={handleAction}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition duration-150"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
