import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { feedbackAPI, departmentsAPI } from '../../services/api';
import { Star, MessageSquare, Filter, Building2, User, Calendar } from 'lucide-react';

const Feedback = () => {
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [ratingFilter, setRatingFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');

  const loadData = async () => {
    setLoading(true);
    try {
      const [fbRes, deptsRes] = await Promise.all([
        feedbackAPI.getAll(),
        departmentsAPI.getAll()
      ]);

      if (fbRes.success) setFeedbackList(fbRes.feedback);
      if (deptsRes.success) setDepartments(deptsRes.departments);
    } catch (err) {
      console.error('Failed to load feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <LoadingSkeleton type="table" count={5} />;
  }

  // Filter feedback items
  const filteredFeedback = feedbackList.filter((item) => {
    if (ratingFilter !== 'ALL' && item.rating !== parseInt(ratingFilter, 10)) return false;
    if (deptFilter !== 'ALL' && item.department_name !== deptFilter) return false;
    return true;
  });

  // Calculate rating stats
  const totalCount = feedbackList.length || 1;
  const avgRating = (
    feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / totalCount
  ).toFixed(1);

  const starCounts = {
    5: feedbackList.filter((f) => f.rating === 5).length,
    4: feedbackList.filter((f) => f.rating === 4).length,
    3: feedbackList.filter((f) => f.rating === 3).length,
    2: feedbackList.filter((f) => f.rating === 2).length,
    1: feedbackList.filter((f) => f.rating === 1).length
  };

  const columns = [
    { header: 'Ticket ID' },
    { header: 'Problem Title' },
    { header: 'Submitted By' },
    { header: 'Department' },
    { header: 'Rating' },
    { header: 'Student Comment' },
    { header: 'Resolved Date' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Resolution Feedback"
        subtitle="Review ratings and satisfaction feedback submitted by students following ticket resolution."
        badge={`${feedbackList.length} Feedback Submissions`}
      />

      {/* Analytics Rating Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Average Satisfaction</span>
            <div className="text-3xl font-extrabold text-white font-mono mt-1 flex items-baseline gap-2">
              <span>{avgRating}</span>
              <span className="text-xs text-slate-400 font-sans">/ 5.0</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
        </div>

        <div className="md:col-span-2 glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Rating Distribution</span>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold block">{stars} ★</span>
                <span className="font-mono text-slate-300 font-bold">{starCounts[stars]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span>Filters</span>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Feedback Table */}
      <DataTable
        columns={columns}
        data={filteredFeedback}
        emptyMessage="No feedback records match the chosen filter."
        renderRow={(item) => (
          <tr key={item.id} className="hover:bg-slate-800/40 transition">
            <td className="py-3.5 px-4 font-mono font-bold text-indigo-300">
              #{item.ticket_id}
            </td>
            <td className="py-3.5 px-4 font-semibold text-white max-w-[200px] truncate">
              {item.problem_title}
            </td>
            <td className="py-3.5 px-4 text-slate-300">
              <div className="font-semibold">{item.user_name}</div>
              <div className="font-mono text-[11px] text-slate-500">{item.user_id}</div>
            </td>
            <td className="py-3.5 px-4 text-slate-400 text-xs">
              {item.department_name}
            </td>
            <td className="py-3.5 px-4 whitespace-nowrap">
              <div className="flex items-center space-x-1 text-amber-400 font-bold text-xs">
                <span>{item.rating}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
            </td>
            <td className="py-3.5 px-4 text-slate-200 max-w-[300px]">
              <p className="line-clamp-2 bg-slate-950 p-2 rounded-lg border border-slate-800/60 text-xs">
                "{item.comment}"
              </p>
            </td>
            <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
              {new Date(item.resolved_date).toLocaleDateString('en-GB')}
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default Feedback;
