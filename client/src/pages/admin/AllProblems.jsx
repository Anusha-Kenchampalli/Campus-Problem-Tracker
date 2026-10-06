import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import FilterPanel from '../../components/FilterPanel';
import ProblemTable from '../../components/ProblemTable';
import ProblemCard from '../../components/ProblemCard';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import {
  problemsAPI,
  categoriesAPI,
  departmentsAPI,
  locationsAPI
} from '../../services/api';
import { LayoutGrid, List, RefreshCw } from 'lucide-react';

const AllProblems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);

  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [filters, setFilters] = useState({
    status: searchParams.get('status') || 'ALL',
    priority: searchParams.get('priority') || 'ALL',
    category: searchParams.get('category') || 'ALL',
    department: searchParams.get('department') || 'ALL',
    location: searchParams.get('location') || 'ALL'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [catsRes, deptsRes, locsRes] = await Promise.all([
        categoriesAPI.getAll(),
        departmentsAPI.getAll(),
        locationsAPI.getAll()
      ]);

      if (catsRes.success) setCategories(catsRes.categories);
      if (deptsRes.success) setDepartments(deptsRes.departments);
      if (locsRes.success) setLocations(locsRes.locations);

      const params = {
        search: searchQuery,
        status: filters.status,
        priority: filters.priority,
        category: filters.category,
        department: filters.department,
        location: filters.location
      };

      const probRes = await problemsAPI.getAll(params);
      if (probRes.success) {
        setProblems(probRes.problems);
      }
    } catch (err) {
      console.error('Failed to load problems:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters, searchQuery]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'ALL',
      priority: 'ALL',
      category: 'ALL',
      department: 'ALL',
      location: 'ALL'
    });
    setSearchQuery('');
    setPage(1);
    setSearchParams({});
  };

  // Pagination math
  const totalPages = Math.ceil(problems.length / pageSize) || 1;
  const paginatedProblems = problems.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Campus Problems"
        subtitle="Search, filter, inspect and manage complete campus problem reports."
        badge={`${problems.length} Total Tickets`}
        action={
          <div className="flex items-center space-x-2">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center space-x-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'table' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        }
      />

      {/* Search & Filters */}
      <div className="space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          categories={categories}
          departments={departments}
          locations={locations}
        />
      </div>

      {/* Content Rendering */}
      {loading ? (
        <LoadingSkeleton type={viewMode === 'grid' ? 'card' : 'table'} count={6} />
      ) : problems.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center space-y-3">
          <p className="text-sm font-bold text-slate-300">No problems found matching filters.</p>
          <p className="text-xs text-slate-400">Try adjusting your search criteria or resetting filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <div className="space-y-4">
          <ProblemTable problems={paginatedProblems} />

          {/* Server-side / Client Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 glass-card rounded-xl border border-slate-800 text-xs text-slate-400">
              <div>
                Showing Page <span className="font-bold text-white">{page}</span> of{' '}
                <span className="font-bold text-white">{totalPages}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 font-semibold"
                >
                  Previous
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedProblems.map((p) => (
              <ProblemCard key={p.ticket_id || p.id} problem={p} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 glass-card rounded-xl border border-slate-800 text-xs text-slate-400">
              <div>
                Showing Page <span className="font-bold text-white">{page}</span> of{' '}
                <span className="font-bold text-white">{totalPages}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 font-semibold"
                >
                  Previous
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProblems;
