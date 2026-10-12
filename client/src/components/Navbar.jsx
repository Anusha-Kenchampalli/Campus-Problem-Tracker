import React from 'react';
import { Menu, Bell, Search, ShieldCheck, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onToggleMobileSidebar, unreadNotificationsCount = 0 }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 dark:bg-slate-900/95 light:bg-white/95 backdrop-blur-md border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 px-4 sm:px-6 py-3 transition-colors duration-200 shrink-0">
      <div className="flex items-center justify-between">
        {/* Left section: Mobile menu & API status */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 transition"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            <span>REST API Connected</span>
          </div>
        </div>

        {/* Right section: Search, Theme Toggle, Notifications, Admin Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Search Button */}
          <button
            onClick={() => navigate('/admin/problems')}
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900 transition"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search tickets, IDs, locations...</span>
          </button>

          {/* Theme Switcher Button */}
          <ThemeToggle />

          {/* Notifications Trigger */}
          <button
            onClick={() => navigate('/admin/notifications')}
            className="relative p-2 rounded-xl text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 transition"
            title="Admin Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-slate-900 animate-pulse"></span>
            )}
          </button>

          {/* Admin Badge & Profile */}
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-800 dark:border-slate-800 light:border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-900">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-[11px] font-medium text-indigo-500 dark:text-indigo-400 flex items-center justify-end gap-1">
                <ShieldCheck className="w-3 h-3 inline" />
                <span>{user?.college_id || 'ADMIN001'}</span>
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-md">
              <div className="w-full h-full rounded-[10px] bg-slate-950 dark:bg-slate-950 light:bg-white flex items-center justify-center text-white dark:text-white light:text-indigo-600 font-bold text-sm">
                {user?.name ? user.name.charAt(0) : <User className="w-4 h-4" />}
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

export default Navbar;
