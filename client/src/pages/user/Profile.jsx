import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { userProblemsAPI } from '../../services/api';
import { User, GraduationCap, Mail, Building, ShieldCheck, LogOut, Ticket, CheckCheck } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [ticketStats, setTicketStats] = useState({ total: 0, resolved: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await userProblemsAPI.getUserProblems();
        if (res.success) {
          setTicketStats({
            total: res.problems.length,
            resolved: res.problems.filter((p) => p.status === 'RESOLVED').length
          });
        }
      } catch (err) {
        console.error('Failed to load user stats:', err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Student Profile"
        subtitle="Your campus identity details and problem tracking statistics."
      />

      {/* Main Profile Identity Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-slate-800 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-1 shadow-xl">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-white text-3xl font-extrabold">
              {user?.name ? user.name.charAt(0) : 'S'}
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{user?.name || 'Alex Johnson'}</h2>
            <p className="text-xs text-indigo-400 font-mono font-bold mt-0.5">{user?.college_id || 'CS24001'}</p>
            <span className="inline-block px-2.5 py-0.5 mt-2 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full uppercase">
              Authorized Campus Student
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <span className="text-slate-500 font-semibold uppercase text-[10px] block">College ID</span>
            <div className="flex items-center space-x-2 text-slate-200 font-mono font-bold">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>{user?.college_id || 'CS24001'}</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <span className="text-slate-500 font-semibold uppercase text-[10px] block">Email Address</span>
            <div className="flex items-center space-x-2 text-slate-200 font-mono">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>{user?.email || 'alex.j@college.edu'}</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <span className="text-slate-500 font-semibold uppercase text-[10px] block">Department / Branch</span>
            <div className="flex items-center space-x-2 text-slate-200 font-medium">
              <Building className="w-4 h-4 text-purple-400" />
              <span>{user?.department || 'Computer Science & Engineering'}</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <span className="text-slate-500 font-semibold uppercase text-[10px] block">Academic Status</span>
            <div className="flex items-center space-x-2 text-slate-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{user?.year || '3rd Year B.Tech'}</span>
            </div>
          </div>
        </div>

        {/* Activity Statistics Summary */}
        <div className="pt-4 border-t border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Ticket Submission Activity
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Submitted</span>
                <span className="text-2xl font-extrabold text-indigo-400 font-mono">{ticketStats.total}</span>
              </div>
              <Ticket className="w-6 h-6 text-indigo-400" />
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Resolved Issues</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-mono">{ticketStats.resolved}</span>
              </div>
              <CheckCheck className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Logout Action */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-5 py-2.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold rounded-xl transition shadow-lg"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
