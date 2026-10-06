import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, User, Mail, Database, Server, Info, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Dr. Robert Vance');
  const [email, setEmail] = useState(user?.email || 'admin.vance@college.edu');
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  return (
    <div className="space-y-6 max-w-4xl">
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-slate-900 border border-emerald-500 text-xs font-semibold text-white flex items-center space-x-2 shadow-2xl"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Admin profile updated successfully.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <PageHeader
        title="Admin Settings & Portal System Info"
        subtitle="Manage administrator profile preferences and view system architecture configuration."
      />

      {/* Admin Profile Section */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Administrator Profile</h2>
            <p className="text-xs text-slate-400">Personal administrative credentials and display parameters</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Admin ID (Fixed)</label>
              <input
                type="text"
                disabled
                value={user?.college_id || 'ADMIN001'}
                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 text-slate-400 font-mono font-bold cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Assigned Role</label>
              <div className="flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3 py-2 rounded-xl font-bold font-mono">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span className="uppercase">SYSTEM ADMINISTRATOR</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Application & Architecture Specs */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">System Architecture & Integration</h2>
            <p className="text-xs text-slate-400">Production REST API endpoint binding and security overview</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 font-semibold">Application Component:</span>
            <span className="font-bold text-indigo-400">Campus Problem Tracker — Admin Application</span>
          </div>

          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 font-semibold">System Version:</span>
            <span className="font-mono text-slate-200">v1.0.0 (Production Admin Edition)</span>
          </div>

          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 font-semibold">Flask REST API Base Endpoint:</span>
            <span className="font-mono text-emerald-400 font-semibold">{apiBaseUrl}</span>
          </div>

          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 font-semibold">Shared Database:</span>
            <span className="font-semibold text-purple-300">MongoDB Shared Campus Database (`campus_problem_tracker`)</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center space-x-1.5 font-bold text-slate-300">
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            <span>Security Compliance Note</span>
          </div>
          <p>
            React client architecture connects strictly through HTTP REST API endpoints. Database connection strings, Flask secrets, and MongoDB authorization credentials remain isolated inside the Flask backend service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
