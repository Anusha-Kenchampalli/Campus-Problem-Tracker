import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Eye, EyeOff, Lock, User, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserLogin = () => {
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!collegeId.trim() || !password.trim()) {
      setErrorMessage('Please enter both College ID and Password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(collegeId.trim(), password.trim());
    setIsSubmitting(false);

    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setErrorMessage(result.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10">
        {/* Left Side: Branding & Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-left hidden lg:block"
        >
          <div className="inline-flex items-center space-x-3 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>Student & Staff Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Campus Problem Tracker
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">
              Report & Track Issues Easily
            </span>
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed">
            Report Wi-Fi, classroom, lab, water, electrical, hostel, or facility issues instantly and track live maintenance status directly on your campus dashboard.
          </p>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span>Instant Ticket Generation & Evidence Photo Upload</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
              <span>Live Timeline Tracking from Report to Resolution</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
              <span>In-App Notifications & Resolution Rating Feedback</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Campus Problem Tracker</h2>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">STUDENT & STAFF</span>
                </div>
              </div>

              <Link
                to="/admin/login"
                className="text-[11px] font-bold text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition"
                title="Switch to Admin Login"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </Link>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight pt-2">Sign In to Your Account</h2>
            <p className="text-xs text-slate-400">Enter your College ID and password to access your dashboard.</p>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* College ID */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                College ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  placeholder="e.g. CS24001"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition font-mono uppercase"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition duration-200"
            >
              {isSubmitting ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In to Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Admin Link Footer */}
          <div className="pt-2 text-center text-xs text-slate-500">
            Are you a campus administrator?{' '}
            <Link to="/admin/login" className="text-indigo-400 font-semibold hover:underline">
              Access Admin Portal
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserLogin;
