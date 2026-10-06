import React, { useState } from 'react';
import PriorityBadge from './PriorityBadge';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

const PrioritySelector = ({ currentPriority, onUpdatePriority, isLoading = false }) => {
  const [selectedPriority, setSelectedPriority] = useState(currentPriority || 'MEDIUM');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    if (selectedPriority === currentPriority) return;
    setIsUpdating(true);
    await onUpdatePriority(selectedPriority);
    setIsUpdating(false);
  };

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Admin Priority Control
        </h4>
        <PriorityBadge priority={currentPriority} size="sm" />
      </div>

      <div className="space-y-3">
        <p className="text-xs text-slate-400">
          Set official administrative priority for ticket resolution queue:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setSelectedPriority(p)}
              className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wider transition border flex items-center justify-center space-x-1.5 ${
                selectedPriority === p
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 ring-2 ring-indigo-500/40'
                  : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{p}</span>
              {selectedPriority === p && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            disabled={selectedPriority === currentPriority || isUpdating || isLoading}
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition"
          >
            {isUpdating || isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Updating Priority...</span>
              </>
            ) : (
              <span>Update Priority</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrioritySelector;
