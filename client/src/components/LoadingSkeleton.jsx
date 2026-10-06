import React from 'react';

const LoadingSkeleton = ({ type = 'table', count = 4 }) => {
  if (type === 'dashboard') {
    return (
      <div className="w-full space-y-6 animate-pulse p-6">
        <div className="h-8 bg-slate-800/80 rounded-lg w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <div className="h-4 bg-slate-800 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-slate-800 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 bg-slate-900/80 border border-slate-800 rounded-xl p-6"></div>
          <div className="h-72 bg-slate-900/80 border border-slate-800 rounded-xl p-6"></div>
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="h-5 bg-slate-800 rounded w-3/4"></div>
            <div className="h-4 bg-slate-800/60 rounded w-1/2"></div>
            <div className="h-16 bg-slate-800/40 rounded w-full"></div>
            <div className="flex justify-between pt-2">
              <div className="h-6 bg-slate-800 rounded w-1/4"></div>
              <div className="h-6 bg-slate-800 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'details') {
    return (
      <div className="space-y-6 animate-pulse p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-slate-800 rounded w-1/3"></div>
          <div className="h-8 bg-slate-800 rounded w-1/6"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-48 bg-slate-900 border border-slate-800 rounded-xl"></div>
            <div className="h-64 bg-slate-900 border border-slate-800 rounded-xl"></div>
          </div>
          <div className="h-96 bg-slate-900 border border-slate-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // Default table skeleton
  return (
    <div className="w-full space-y-3 animate-pulse border border-slate-800/80 rounded-xl p-4 bg-slate-900/60">
      <div className="h-10 bg-slate-800/60 rounded-lg w-full mb-4"></div>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="h-12 bg-slate-800/30 rounded-lg w-full flex items-center justify-between px-4">
          <div className="h-4 bg-slate-800 rounded w-1/6"></div>
          <div className="h-4 bg-slate-800 rounded w-1/4"></div>
          <div className="h-4 bg-slate-800 rounded w-1/6"></div>
          <div className="h-4 bg-slate-800 rounded w-1/8"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
