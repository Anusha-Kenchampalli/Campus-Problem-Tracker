import React from 'react';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

const DataTable = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = 'No records found.',
  emptySubtitle = 'Try changing your search terms or filter criteria.',
  pagination = null,
  renderRow = null
}) => {
  if (data.length === 0 && !isLoading) {
    return (
      <div className="glass-panel rounded-2xl border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 p-12 text-center flex flex-col items-center justify-center my-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 flex items-center justify-center mb-4 text-slate-400">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-200 dark:text-slate-200 light:text-slate-900 mb-1">{emptyMessage}</h3>
        <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-sm">{emptySubtitle}</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/95 dark:bg-slate-900/95 light:bg-slate-100/90 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 text-[11px] font-bold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">
              {columns.map((col, idx) => (
                <th key={idx} className={`py-3.5 px-4 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 dark:divide-slate-800/60 light:divide-slate-200 text-xs text-slate-300 dark:text-slate-300 light:text-slate-800">
            {data.map((item, rowIdx) =>
              renderRow ? (
                renderRow(item, rowIdx)
              ) : (
                <tr key={rowIdx} className="hover:bg-slate-800/40 dark:hover:bg-slate-800/40 light:hover:bg-slate-50 transition">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`py-3.5 px-4 ${col.className || ''}`}>
                      {col.accessor ? item[col.accessor] : null}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
          <div>
            Showing <span className="font-semibold text-slate-200 dark:text-slate-200 light:text-slate-900">{data.length}</span>
            {pagination.totalItems ? (
              <>
                {' '}of <span className="font-semibold text-slate-200 dark:text-slate-200 light:text-slate-900">{pagination.totalItems}</span> items
              </>
            ) : (
              ' items'
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              className="p-1.5 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 transition"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-semibold text-slate-200 dark:text-slate-200 light:text-slate-900 px-2">
              Page {pagination.page} of {pagination.totalPages || 1}
            </span>

            <button
              disabled={pagination.page >= (pagination.totalPages || 1)}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              className="p-1.5 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 transition"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
