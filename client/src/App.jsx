import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';

// Admin Layout & Pages
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AdminLogin from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AllProblems from './pages/admin/AllProblems';
import AdminProblemDetails from './pages/admin/ProblemDetails';
import PriorityQueue from './pages/admin/PriorityQueue';
import Departments from './pages/admin/Departments';
import Staff from './pages/admin/Staff';
import Categories from './pages/admin/Categories';
import Locations from './pages/admin/Locations';
import Analytics from './pages/admin/Analytics';
import AdminFeedback from './pages/admin/Feedback';
import AdminNotifications from './pages/admin/Notifications';
import Settings from './pages/admin/Settings';

// User Layout & Pages
import UserSidebar from './components/UserSidebar';
import UserNavbar from './components/UserNavbar';
import UserLogin from './pages/user/Login';
import UserDashboard from './pages/user/Dashboard';
import ReportProblem from './pages/user/ReportProblem';
import MyProblems from './pages/user/MyProblems';
import UserProblemDetails from './pages/user/ProblemDetails';
import UserNotifications from './pages/user/Notifications';
import Profile from './pages/user/Profile';

import { notificationsAPI, userNotificationsAPI } from './services/api';
import Home from './pages/Home';

// Admin Shell Layout
const AdminLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const checkUnread = async () => {
      try {
        const res = await notificationsAPI.getAll();
        if (res.success && res.notifications) {
          const count = res.notifications.filter((n) => !n.read).length;
          setUnreadCount(count);
        }
      } catch (err) {
        console.error('Failed to fetch admin notifications count:', err);
      }
    };
    checkUnread();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 flex overflow-hidden transition-colors duration-200">
      <Sidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        unreadCount={unreadCount}
      />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto lg:pl-64">
        <Navbar
          onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
          unreadNotificationsCount={unreadCount}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="problems" element={<AllProblems />} />
            <Route path="problems/:id" element={<AdminProblemDetails />} />
            <Route path="priority" element={<PriorityQueue />} />
            <Route path="departments" element={<Departments />} />
            <Route path="staff" element={<Staff />} />
            <Route path="categories" element={<Categories />} />
            <Route path="locations" element={<Locations />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="feedback" element={<AdminFeedback />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Student User Shell Layout
const UserLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const checkUnread = async () => {
      try {
        const res = await userNotificationsAPI.getAll();
        if (res.success && res.notifications) {
          const count = res.notifications.filter((n) => !n.read).length;
          setUnreadCount(count);
        }
      } catch (err) {
        console.error('Failed to fetch user notifications count:', err);
      }
    };
    checkUnread();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 flex overflow-x-hidden transition-colors duration-200">
      <UserSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        unreadCount={unreadCount}
      />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen lg:pl-64">
        <UserNavbar
          onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
          unreadNotificationsCount={unreadCount}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="report-problem" element={<ReportProblem />} />
            <Route path="my-problems" element={<MyProblems />} />
            <Route path="problems/:id" element={<UserProblemDetails />} />
            <Route path="notifications" element={<UserNotifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Root Redirect based on authentication role
const RootRedirect = () => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* User Login */}
          <Route path="/login" element={<UserLogin />} />
          
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* User Application Routes */}
          <Route
            path="/*"
            element={
              <UserProtectedRoute>
                <UserLayout />
              </UserProtectedRoute>
            }
          />

          {/* Admin Application Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
