import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Wrench,
  Building2,
  Zap,
  Droplets,
  Sparkles,
  Wifi,
  Home as HomeIcon,
  BookOpen,
  ShieldAlert,
  Clock,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Search,
  Moon,
  Sun,
  UserCheck,
  BarChart3,
  PhoneCall,
  MessageSquare,
  PlusCircle,
  ChevronRight,
  Star,
  Activity,
  Layers,
  Send,
  HelpCircle,
  FlaskConical,
  Bus,
  Check,
  User,
  Shield,
  LifeBuoy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { categoriesAPI, problemsAPI, analyticsAPI } from '../services/api';

const CategoryIconMap = {
  Wifi: Wifi,
  Zap: Zap,
  Droplets: Droplets,
  Sparkles: Sparkles,
  Building: Building2,
  Home: HomeIcon,
  BookOpen: BookOpen,
  FlaskConical: FlaskConical,
  ShieldAlert: ShieldAlert,
  Bus: Bus,
  HelpCircle: HelpCircle
};

export default function Home() {
  const { isAuthenticated, user, role } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [recentProblems, setRecentProblems] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchedTicket, setSearchedTicket] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, probRes, anaRes] = await Promise.all([
          categoriesAPI.getAll(),
          problemsAPI.getAll({ limit: 6 }),
          analyticsAPI.get()
        ]);

        if (catRes.success) setCategories(catRes.categories);
        if (probRes.success) setRecentProblems(probRes.problems.slice(0, 6));
        if (anaRes.success) setAnalytics(anaRes.analytics);
      } catch (err) {
        console.error('Failed to load home page data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTrackTicket = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchError('');
    setSearchedTicket(null);

    const formattedQuery = searchQuery.trim().toUpperCase();
    try {
      const res = await problemsAPI.getById(formattedQuery);
      if (res.success && res.problem) {
        setSearchedTicket(res.problem);
      }
    } catch (err) {
      setSearchError(`No ticket found matching "${formattedQuery}". Please check the Ticket ID.`);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'REPORTED':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20">Reported</span>;
      case 'VERIFIED':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">Verified</span>;
      case 'ASSIGNED':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">Assigned</span>;
      case 'IN_PROGRESS':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">In Progress</span>;
      case 'RESOLVED':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Resolved</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">Rejected</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">{status}</span>;
    }
  };

  const faqs = [
    {
      q: "Who can submit problem reports on the CPT platform?",
      a: "All active students, faculty, and administrative staff with a valid campus College ID can log in and submit issues encountered across classrooms, hostels, labs, or library facilities."
    },
    {
      q: "How fast are critical campus issues addressed?",
      a: "Critical issues (e.g. power grid failure, lab gas leakage, major water leaks) trigger immediate high-priority alerts to emergency maintenance leads and average assignment in under 2 hours."
    },
    {
      q: "Can I track my problem status in real time?",
      a: "Yes! You can search any Ticket ID directly on the home page tracker or check your 'My Problems' dashboard for detailed timeline history and assigned staff details."
    },
    {
      q: "What happens after an issue is marked resolved?",
      a: "Students receive a push notification to review the resolution, verify the fix on-site, and rate their experience from 1 to 5 stars."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/90 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 dark:bg-slate-950 light:bg-white rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-cyan-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-white dark:text-white light:text-slate-900">Campus</span>
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400 light:from-indigo-600 light:via-purple-600 light:to-cyan-600 bg-clip-text text-transparent">Tracker</span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 dark:text-slate-400 light:text-slate-500 tracking-wider uppercase">Problem Management System</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300 dark:text-slate-300 light:text-slate-700">
            <a href="#features" className="hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#categories" className="hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">Categories</a>
            <a href="#tracker" className="hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">Track Ticket</a>
            <a href="#showcase" className="hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">Public Log</a>
            <a href="#faq" className="hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">FAQ</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors shadow-sm"
              title="Toggle Dark/Light theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
              >
                <UserCheck className="w-4 h-4" />
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-900 light:hover:bg-slate-100 border border-transparent hover:border-slate-800 dark:hover:border-slate-800 light:hover:border-slate-200 transition-all"
                >
                  Student Login
                </Link>
                <Link
                  to="/admin/login"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:opacity-95 text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                >
                  <Shield className="w-4 h-4" />
                  Admin Portal
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 dark:border-slate-800 light:border-slate-200"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700"
            >
              <Layers className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-slate-900 dark:bg-slate-900 light:bg-white border-b border-slate-800 dark:border-slate-800 light:border-slate-200 px-6 py-4 space-y-3"
          >
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 py-1">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 py-1">How It Works</a>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 py-1">Categories</a>
            <a href="#tracker" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 py-1">Track Ticket</a>
            <div className="pt-3 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col gap-2">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard')}
                  className="w-full text-center py-2.5 rounded-xl font-semibold bg-indigo-600 text-white"
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <Link to="/login" className="w-full text-center py-2.5 rounded-xl font-semibold bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-white dark:text-white light:text-slate-900">
                    Student Login
                  </Link>
                  <Link to="/admin/login" className="w-full text-center py-2.5 rounded-xl font-semibold bg-indigo-600 text-white">
                    Admin Portal
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-blue-600/20 to-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-300 light:text-indigo-600 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Campus Problem Tracking System • Active 24/7
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 leading-[1.15]">
                Smart Campus Maintenance &{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400 light:from-indigo-600 light:via-purple-600 light:to-cyan-600 bg-clip-text text-transparent">
                  Real-time Problem Tracking
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Report broken equipment, Wi-Fi outages, power cuts, or plumbing issues instantly. Track tickets with real-time status updates and transparent department response SLAs across campus.
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to={isAuthenticated ? '/report-problem' : '/login'}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105"
                >
                  <PlusCircle className="w-5 h-5" />
                  Report a Problem Now
                </Link>

                <a
                  href="#tracker"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-base bg-slate-900 dark:bg-slate-900 light:bg-white hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 flex items-center justify-center gap-2.5 transition-all shadow-sm"
                >
                  <Search className="w-4 h-4 text-cyan-500 dark:text-cyan-400 light:text-indigo-600" />
                  Track Ticket Status
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-900 dark:border-slate-900 light:border-slate-200 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Instant Department Routing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Photo & Location Tagging</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Student Feedback Score</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Preview Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Header Mock */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 font-mono ml-2">CPT Live Monitor</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <Activity className="w-3 h-3 animate-pulse" /> 98.4% Operational
                  </span>
                </div>

                {/* Sample Live Ticket Cards */}
                <div className="mt-4 space-y-3">
                  
                  {/* Card 1 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono font-semibold text-cyan-500 dark:text-cyan-400 light:text-indigo-600">CPT-2026-0001</span>
                        <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900 line-clamp-1">Wi-Fi Access Point down in Block C</h4>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 light:text-indigo-600 border border-cyan-500/20">In Progress</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                      <span className="flex items-center gap-1 text-slate-300 dark:text-slate-300 light:text-slate-700"><Building2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Block C — IT Lab</span>
                      <span className="text-[11px]">Assigned to Rahul K.</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono font-semibold text-emerald-500 dark:text-emerald-400">CPT-2026-0005</span>
                        <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900 line-clamp-1">Classroom HDMI Receiver Unit Fixed</h4>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">Resolved</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                      <span className="flex items-center gap-1 text-slate-300 dark:text-slate-300 light:text-slate-700"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 5.0 Star Rating</span>
                      <span className="text-[11px] text-emerald-500 dark:text-emerald-400 font-medium">Fixed in 4.5 hrs</span>
                    </div>
                  </div>

                  {/* Quick Stats Grid inside card */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-3 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-center">
                      <div className="text-lg font-bold text-white dark:text-white light:text-slate-900">1,240+</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase font-medium">Resolved</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-center">
                      <div className="text-lg font-bold text-cyan-500 dark:text-cyan-400 light:text-indigo-600">&lt; 18h</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase font-medium">Avg SLA</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-center">
                      <div className="text-lg font-bold text-indigo-500 dark:text-indigo-400">4.8 / 5</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase font-medium">Rating</div>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* METRICS & IMPACT BAR */}
      <section className="py-12 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100/80 border-y border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            <div className="p-6 rounded-2xl bg-slate-950/50 dark:bg-slate-950/50 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-center space-y-2 hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300 transition-colors shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900">
                {analytics?.total_problems || '124'}+
              </div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">Total Campus Problems Handled</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/50 dark:bg-slate-950/50 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-center space-y-2 hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300 transition-colors shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900">
                {analytics?.performance_metrics?.avg_resolution_time_hours || '18.6'} Hours
              </div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">Average Resolution SLA</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/50 dark:bg-slate-950/50 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-center space-y-2 hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300 transition-colors shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400 flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900">8 Active</div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">Campus Service Departments</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/50 dark:bg-slate-950/50 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-center space-y-2 hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300 transition-colors shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 fill-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900">
                {analytics?.performance_metrics?.user_satisfaction_score || '4.8'} / 5.0
              </div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">Student Satisfaction Rating</div>
            </div>

          </div>
        </div>
      </section>

      {/* TRACK TICKET SEARCH SECTION */}
      <section id="tracker" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 light:text-indigo-600 border border-cyan-500/20">
                Instant Ticket Lookup
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-slate-900">Track Any Campus Ticket Status</h2>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm">
                Enter your Ticket Reference Number (e.g., <code className="text-cyan-500 dark:text-cyan-400 light:text-indigo-600 bg-slate-950 dark:bg-slate-950 light:bg-slate-100 px-2 py-0.5 rounded font-mono">CPT-2026-0001</code>) to get instant progress logs.
              </p>
            </div>

            <form onSubmit={handleTrackTicket} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Ticket ID (e.g. CPT-2026-0001)"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/20"
              >
                Track Ticket
              </button>
            </form>

            {searchError && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-sm flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            {searchedTicket && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-500 dark:text-cyan-400 light:text-indigo-600">{searchedTicket.ticket_id}</span>
                    <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mt-1">{searchedTicket.problem?.title}</h3>
                  </div>
                  <div>{getStatusBadge(searchedTicket.status)}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                    <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase text-[10px] font-semibold">Category</span>
                    <p className="font-medium text-white dark:text-white light:text-slate-900 mt-0.5">{searchedTicket.problem?.category_name}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                    <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase text-[10px] font-semibold">Location</span>
                    <p className="font-medium text-white dark:text-white light:text-slate-900 mt-0.5">{searchedTicket.problem?.location_name}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                    <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase text-[10px] font-semibold">Assigned Department</span>
                    <p className="font-medium text-white dark:text-white light:text-slate-900 mt-0.5">{searchedTicket.assignment?.department_name || 'Pending Assignment'}</p>
                  </div>
                </div>

                {searchedTicket.status_history && searchedTicket.status_history.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">Activity Timeline:</span>
                    <div className="mt-3 space-y-2">
                      {searchedTicket.status_history.map((hist, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <div className="flex-1">
                            <span className="font-semibold text-slate-200 dark:text-slate-200 light:text-slate-900">{hist.status}</span>
                            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">{hist.note}</p>
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-500 light:text-slate-500 font-mono">
                            {new Date(hist.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-100/60 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900">
              Built Specifically for Next-Gen Campus Maintenance
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base">
              Say goodbye to unorganized WhatsApp groups or manual paper forms. CPT automates problem reporting, department assignment, and transparent resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-indigo-500/40 transition-all hover:scale-[1.02] group space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">1-Minute Ticket Creation</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed">
                Snap photos directly from your phone, tag exact room numbers, choose severity level, and submit tickets in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-all hover:scale-[1.02] group space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">Smart Department Routing</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed">
                Automated classification routes IT issues to network engineers, electrical trips to electricians, and leaks to plumbers without human delays.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-purple-500/40 transition-all hover:scale-[1.02] group space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">Priority SLA Escalation</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed">
                Critical hazards like main power panel failures or gas leaks are automatically highlighted on the admin priority queue for rapid response.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-emerald-500/40 transition-all hover:scale-[1.02] group space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">Student Verification & Rating</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed">
                Tickets are only finalized after student confirmation and feedback rating, ensuring full accountability of technician work.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-amber-500/40 transition-all hover:scale-[1.02] group space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">Executive Analytics</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed">
                Campus administrators monitor real-time charts on issue resolution rates, departmental backlog, and recurring maintenance hot spots.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-rose-500/40 transition-all hover:scale-[1.02] group space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">Staff Task Dispatch</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed">
                Maintenance staff receive direct task assignments on their dashboard with issue descriptions, room locations, and contact info.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 light:text-indigo-600 border border-cyan-500/20">
              Simple Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900">
              How Campus Problem Tracker Works
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base">
              Four streamlined steps to resolve any campus maintenance issue with full transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 relative space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900">Spot & Report</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed">
                Spot a problem in classroom, hostel, or lab. Open CPT app, choose category, attach image & select location.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 relative space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900">Automated Dispatch</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed">
                System verifies issue details and immediately dispatches ticket to designated department head and technician.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 relative space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900">On-Site Resolution</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed">
                Technician arrives on site, fixes problem, logs work steps, and updates ticket status to 'Resolved'.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 relative space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-lg">
                4
              </div>
              <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900">Rate & Close</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed">
                Student verifies resolution on-site, provides a 5-star feedback rating, and closes ticket loop.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CATEGORIES EXPLORER SECTION */}
      <section id="categories" className="py-24 bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-100/60 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20">
                Departmental Categories
              </span>
              <h2 className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900">Browse Maintenance Categories</h2>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm max-w-xl">
                Explore supported issue categories and see active problem counts handled by campus services.
              </p>
            </div>

            <Link
              to={isAuthenticated ? '/report-problem' : '/login'}
              className="inline-flex items-center gap-2 text-cyan-500 dark:text-cyan-400 light:text-indigo-600 hover:opacity-80 font-semibold text-sm group"
            >
              Report an Issue in Category
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const IconComp = CategoryIconMap[cat.icon] || HelpCircle;
              return (
                <div
                  key={cat.id}
                  className="p-6 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-cyan-500/30 transition-all hover:-translate-y-1 space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-950 dark:bg-slate-950 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                      {cat.active_count || 0} Active
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900">{cat.name}</h4>
                    <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-xs mt-1 line-clamp-2 leading-relaxed">{cat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* RECENT PUBLIC TICKETS LOG */}
      <section id="showcase" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
              Campus Transparency Feed
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900">
              Recently Reported & Resolved Tickets
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base">
              Live backend activity stream of student reported problems and resolutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProblems.map((prob) => (
              <div
                key={prob.ticket_id}
                className="p-6 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-500 dark:text-cyan-400 light:text-indigo-600">{prob.ticket_id}</span>
                    {getStatusBadge(prob.status)}
                  </div>
                  <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900 line-clamp-2">{prob.problem?.title}</h4>
                  <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-xs line-clamp-2">{prob.problem?.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                  <span>{prob.problem?.category_name}</span>
                  <span className="font-mono text-[11px]">
                    {new Date(prob.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="py-24 bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-100/60 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-white dark:text-white light:text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 overflow-hidden transition-colors shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-white dark:text-white light:text-slate-900 text-base sm:text-lg">{faq.q}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 dark:text-slate-400 light:text-slate-500 transition-transform duration-200 ${
                      activeFaq === idx ? 'rotate-90 text-cyan-500 dark:text-cyan-400 light:text-indigo-600' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 dark:from-indigo-900 dark:via-blue-900 dark:to-slate-900 light:from-indigo-600 light:via-blue-600 light:to-indigo-700 border border-indigo-500/30 p-10 sm:p-16 text-center space-y-6 shadow-2xl relative">
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Facing a Maintenance Issue on Campus Right Now?
              </h2>
              <p className="text-indigo-200 text-sm sm:text-base">
                Report it in 60 seconds. Our campus engineering and maintenance teams will be dispatched promptly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to={isAuthenticated ? '/report-problem' : '/login'}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all shadow-xl hover:scale-105"
              >
                Submit Problem Ticket
              </Link>
              <Link
                to="/admin/login"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-400/30 text-white transition-all"
              >
                Admin Management Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Col 1: Brand */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5">
                  <div className="w-full h-full bg-slate-950 dark:bg-slate-950 light:bg-white rounded-[10px] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <span className="font-bold text-xl text-white dark:text-white light:text-slate-900">Campus Problem Tracker</span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed max-w-sm">
                Centralized campus maintenance, infrastructure ticketing, automated department routing, and real-time SLA progress tracking system.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                All Campus Services Operational
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">How It Works</a></li>
                <li><a href="#tracker" className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">Track Ticket</a></li>
                <li><Link to="/login" className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">Student Portal</Link></li>
                <li><Link to="/admin/login" className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600 transition-colors">Admin Portal</Link></li>
              </ul>
            </div>

            {/* Col 3: Categories */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 uppercase tracking-wider">Departments</h4>
              <ul className="space-y-2 text-xs">
                <li><span className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600">IT & Campus Network</span></li>
                <li><span className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600">Electrical & Power</span></li>
                <li><span className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600">Plumbing & Water</span></li>
                <li><span className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600">General Maintenance</span></li>
                <li><span className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600">Hostels & Mess</span></li>
                <li><span className="hover:text-cyan-500 dark:hover:text-cyan-400 light:hover:text-indigo-600">Security & Surveillance</span></li>
              </ul>
            </div>

            {/* Col 4: Emergency Contacts */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900 uppercase tracking-wider">Emergency Contacts</h4>
              <div className="space-y-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 light:text-indigo-600" />
                  <span>24/7 Helpline: +91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <LifeBuoy className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>IT Desk: it-support@college.edu</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                  <span>Main Gate Security: Ext 104</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-900 dark:border-slate-900 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 text-slate-500 dark:text-slate-500 light:text-slate-600">
            <p>© {new Date().getFullYear()} Campus Problem Tracker (CPT). All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400 dark:hover:text-slate-400 light:hover:text-slate-900">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 dark:hover:text-slate-400 light:hover:text-slate-900">Terms of Service</a>
              <a href="#" className="hover:text-slate-400 dark:hover:text-slate-400 light:hover:text-slate-900">Campus IT Guidelines</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
