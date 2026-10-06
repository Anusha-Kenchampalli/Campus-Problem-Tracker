import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';
import StatusTimeline from '../../components/StatusTimeline';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import FeedbackForm from './Feedback';
import { userProblemsAPI } from '../../services/api';
import {
  ArrowLeft,
  RefreshCw,
  MapPin,
  Calendar,
  Building2,
  CheckCheck,
  Star,
  Maximize2,
  FileText,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadTicket = async () => {
    setLoading(true);
    try {
      const res = await userProblemsAPI.getById(id);
      if (res.success) {
        setProblem(res.problem);
      }
    } catch (err) {
      console.error('Failed to load problem ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicket();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton type="details" />;
  }

  if (!problem) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
        <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">Ticket Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested ticket ID #{id} could not be found under your student account.
        </p>
        <button
          onClick={() => navigate('/my-problems')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
        >
          Back to My Problems
        </button>
      </div>
    );
  }

  const ticketId = problem.ticket_id || problem.id;
  const pData = problem.problem || {};
  const currentStatus = problem.status || 'REPORTED';

  const formatFullDate = (ts) => {
    if (!ts) return 'N/A';
    try {
      return new Date(ts).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return ts;
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-slate-900 border border-emerald-500 text-xs font-semibold text-white flex items-center space-x-2 shadow-2xl">
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      <PageHeader
        title={`Problem Ticket #${ticketId}`}
        subtitle="Track real-time maintenance progress and view administrative updates."
        action={
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={loadTicket}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title="Refresh Ticket Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        }
      />

      {/* Main Header Banner */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800/80 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center space-x-3 mb-1 flex-wrap gap-y-2">
              <span className="font-mono text-lg font-extrabold text-indigo-400">#{ticketId}</span>
              <StatusBadge status={currentStatus} size="lg" />
              <PriorityBadge priority={problem.priority?.admin || problem.priority?.user} size="lg" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              {pData.title || problem.title}
            </h1>
          </div>

          {currentStatus === 'RESOLVED' && (
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition"
            >
              <Star className="w-4 h-4 fill-slate-950" />
              <span>Rate Resolution Experience</span>
            </button>
          )}
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Category</span>
            <span className="text-slate-200 font-medium">{pData.category_name || 'General'}</span>
          </div>

          <div>
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Location</span>
            <span className="text-slate-200 font-medium">{pData.location_name || 'Campus'}</span>
          </div>

          <div>
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Current Priority</span>
            <span className="font-bold text-amber-400">{problem.priority?.admin || problem.priority?.user || 'MEDIUM'}</span>
          </div>

          <div>
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Date Reported</span>
            <span className="font-mono text-slate-300">{formatFullDate(problem.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Grid: Description & Image / Status Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details & Resolution */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Description Card */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Problem Description</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 whitespace-pre-line">
              {pData.description || problem.description}
            </p>

            {/* Evidence Image */}
            {pData.image_url && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-400 block">Attached Evidence Photo</span>
                <div className="relative group max-w-md overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                  <img
                    src={pData.image_url}
                    alt="Uploaded evidence"
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <button
                    onClick={() => setSelectedImage(pData.image_url)}
                    className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-xs gap-2 transition"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>View Photo</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Resolution Card if resolved */}
          {currentStatus === 'RESOLVED' && problem.resolution && (
            <div className="glass-card rounded-2xl p-5 border border-emerald-500/40 bg-emerald-950/20 space-y-3">
              <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider text-emerald-400">
                <CheckCheck className="w-4 h-4" />
                <span>Problem Resolved</span>
              </div>
              <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/20 space-y-2 text-xs">
                <p className="text-slate-100 leading-relaxed font-medium">{problem.resolution.note}</p>
                <div className="flex items-center justify-between text-slate-400 text-[11px] pt-2 border-t border-emerald-500/20">
                  <span>Resolved By: <strong className="text-emerald-300">{problem.resolution.resolved_by}</strong></span>
                  <span>Date: <strong className="text-slate-300">{formatFullDate(problem.resolution.resolved_at)}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* Rejection Notice if rejected */}
          {currentStatus === 'REJECTED' && (
            <div className="glass-card rounded-2xl p-5 border border-rose-500/40 bg-rose-950/20 text-rose-300 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider text-rose-400">
                <ShieldAlert className="w-4 h-4" />
                <span>Rejection Notice</span>
              </div>
              <p className="text-xs text-rose-200 bg-rose-950/50 p-3 rounded-xl border border-rose-500/20">
                {problem.rejection_reason || 'This ticket was rejected by campus administration.'}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Status Timeline & Assigned Department */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800">
              Live Maintenance Status Timeline
            </h3>
            <StatusTimeline history={problem.status_history} />
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
              Assigned Maintenance Team
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Department</span>
                <span className="font-semibold text-slate-200">
                  {problem.assignment?.department_name || 'Pending Assignment'}
                </span>
              </div>
              <div className="flex justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Assigned Officer</span>
                <span className="font-semibold text-slate-200">
                  {problem.assignment?.staff_name || 'Pending Staff Assignment'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <FeedbackForm
          ticketId={ticketId}
          onClose={() => setShowFeedbackModal(false)}
          onSuccess={() => {
            setShowFeedbackModal(false);
            showToast('Thank you for rating your resolution experience!');
          }}
        />
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={selectedImage}
            alt="Evidence full size"
            className="max-w-4xl max-h-[85vh] rounded-2xl border border-slate-700 shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ProblemDetails;
