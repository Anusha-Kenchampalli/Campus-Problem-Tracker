import React from 'react';
import { Menu, Bell, Plus, User, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const UserNavbar = ({ onToggleMobileSidebar, unreadNotificationsCount = 0 }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-md border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 px-4 sm:px-6 py-3 transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Left section: Mobile menu & Quick Report Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 transition"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate('/report-problem')}
            className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition duration-150"
          >
            <Plus className="w-4 h-4" />
            <span>Report a Problem</span>
          </button>
        </div>

        {/* Right section: Theme Switcher, Notifications & Student Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme Switcher Button */}
          <ThemeToggle />

          {/* Notifications Trigger */}
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-xl text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 transition"
            title="Student Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-slate-900 animate-pulse"></span>
            )}
          </button>

          {/* Student Profile */}
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-800 dark:border-slate-800 light:border-slate-200">
            <div
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition">
                  {user?.name || 'Alex Johnson'}
                </p>
                <p className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 flex items-center justify-end gap-1">
                  <GraduationCap className="w-3 h-3 text-indigo-500 dark:text-indigo-400 inline" />
                  <span>{user?.college_id || 'CS24001'}</span>
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-md group-hover:scale-105 transition">
                <div className="w-full h-full rounded-[10px] bg-slate-950 dark:bg-slate-950 light:bg-white flex items-center justify-center text-white dark:text-white light:text-indigo-600 font-bold text-sm">
                  {user?.name ? user.name.charAt(0) : <User className="w-4 h-4" />}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-rose-400 light:text-rose-600 hover:text-rose-300 light:hover:text-rose-700 hover:bg-rose-500/10 light:hover:bg-rose-50 transition"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
