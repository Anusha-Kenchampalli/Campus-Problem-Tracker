import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import ProblemCard from '../../components/ProblemCard';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import { userProblemsAPI, categoriesAPI } from '../../services/api';
import { Filter, RotateCcw, FolderOpen, ArrowUpDown, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyProblems = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  const [filters, setFilters] = useState({
    status: 'ALL',
    priority: 'ALL',
    category: 'ALL'
  });

  const loadMyProblems = async () => {
    setLoading(true);
    try {
      const [catsRes, probRes] = await Promise.all([
        categoriesAPI.getAll(),
        userProblemsAPI.getUserProblems({
          search: searchQuery,
          status: filters.status,
          priority: filters.priority,
          category: filters.category,
          sort: sortOrder
        })
      ]);

      if (catsRes.success) setCategories(catsRes.categories);
      if (probRes.success) setProblems(probRes.problems);
    } catch (err) {
      console.error('Failed to load my problems:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyProblems();
  }, [filters, searchQuery, sortOrder]);

  const handleResetFilters = () => {
    setFilters({ status: 'ALL', priority: 'ALL', category: 'ALL' });
    setSearchQuery('');
    setSortOrder('newest');
  };

  const hasActiveFilters =
    filters.status !== 'ALL' || filters.priority !== 'ALL' || filters.category !== 'ALL' || searchQuery;

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Reported Problems"
        subtitle="Complete history of campus problem tickets reported under your account."
        badge={`${problems.length} Ticket${problems.length === 1 ? '' : 's'}`}
        action={
          <button
            onClick={() => navigate('/report-problem')}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Report New Problem</span>
          </button>
        }
      />

      {/* Search & Filters */}
      <div className="space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by Ticket ID, Title, Category..."
        />

        {/* Filter Bar */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              <span>Filters & Sorting</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Status Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="REPORTED">Reported</option>
                <option value="VERIFIED">Verified</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="ALL">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="ALL">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Sort Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content Rendering */}
      {loading ? (
        <LoadingSkeleton type="card" count={4} />
      ) : problems.length === 0 ? (
        <EmptyState
          title={hasActiveFilters ? 'No Problems Match Filters' : "You Haven't Reported Any Problems"}
          description={
            hasActiveFilters
              ? 'Try changing or clearing your search and filter criteria.'
              : 'Spot a Wi-Fi, lab, water, or electrical issue? Report it to campus maintenance.'
          }
          icon={FolderOpen}
          actionText={hasActiveFilters ? 'Clear All Filters' : 'Report a Problem'}
          onActionClick={hasActiveFilters ? handleResetFilters : undefined}
          actionLink={hasActiveFilters ? undefined : '/report-problem'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {problems.map((problem) => (
            <ProblemCard key={problem.ticket_id || problem.id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProblems;
