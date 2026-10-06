import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home as HomeIcon,
  LayoutDashboard,
  PlusCircle,
  FolderOpen,
  Bell,
  User,
  LogOut,
  X,
  Building
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const USER_NAV_ITEMS = [
  { name: 'Home Landing', path: '/', icon: HomeIcon },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Report Problem', path: '/report-problem', icon: PlusCircle },
  { name: 'My Problems', path: '/my-problems', icon: FolderOpen },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'My Profile', path: '/profile', icon: User }
];

const UserSidebar = ({ isOpen, onClose, unreadCount = 0 }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-slate-900 dark:bg-slate-900 light:bg-white border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 w-64 select-none transition-colors duration-200">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white dark:text-white light:text-slate-900 tracking-wide leading-tight">
              Campus Tracker
            </h1>
            <span className="inline-block px-1.5 py-0.5 mt-0.5 text-[10px] font-bold tracking-wider text-emerald-400 dark:text-emerald-400 light:text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 rounded">
              STUDENT PORTAL
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 transition"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="p-3 space-y-1 overflow-y-auto flex-1 min-h-0">
        {USER_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-600/25 font-semibold'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-800/60 dark:hover:bg-slate-800/60 light:hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </div>
              {item.name === 'Notifications' && unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50 shrink-0">
        <div className="flex items-center justify-between gap-3 mb-3 px-1">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0">
              {user?.name ? user.name.charAt(0) : 'S'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-900 truncate">
                {user?.name || 'Student'}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 truncate">
                {user?.college_id || 'CS24001'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs font-semibold rounded-lg text-rose-400 light:text-rose-600 hover:text-rose-300 light:hover:text-rose-700 hover:bg-rose-500/10 light:hover:bg-rose-50 border border-rose-500/20 light:border-rose-200 transition duration-150"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Fixed Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 h-screen z-30 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-900/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-64 z-50"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserSidebar;
