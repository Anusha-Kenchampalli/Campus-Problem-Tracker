import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import StatusTimeline from './StatusTimeline';
import PrioritySelector from './PrioritySelector';
import DepartmentSelector from './DepartmentSelector';
import ConfirmModal from './ConfirmModal';
import {
  MapPin,
  Calendar,
  User,
  Building2,
  CheckCircle2,
  XCircle,
  PlayCircle,
  CheckCheck,
  Maximize2,
  FileText,
  Tag,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

const ProblemDetails = ({
  problem,
  departments = [],
  staffList = [],
  onUpdatePriority,
  onAssign,
  onUpdateStatus,
  isLoading = false
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'reject' | 'resolve'
    title: '',
    message: ''
  });

  if (!problem) return null;

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

  // Actions
  const handleVerify = async () => {
    await onUpdateStatus({ status: 'VERIFIED' });
  };

  const handleOpenRejectModal = () => {
    setModalState({
      isOpen: true,
      type: 'reject',
      title: `Reject Problem Report #${ticketId}`,
      message: 'Please state the official reason for rejecting this report.'
    });
  };

  const handleOpenResolveModal = () => {
    setModalState({
      isOpen: true,
      type: 'resolve',
      title: `Mark Problem #${ticketId} as Resolved`,
      message: 'Document the resolution steps taken by the maintenance team.'
    });
  };

  const handleStartProgress = async () => {
    await onUpdateStatus({ status: 'IN_PROGRESS' });
  };

  const handleModalConfirm = async (noteText) => {
    if (modalState.type === 'reject') {
      await onUpdateStatus({ status: 'REJECTED', reason: noteText });
    } else if (modalState.type === 'resolve') {
      await onUpdateStatus({ status: 'RESOLVED', resolution_note: noteText });
    }
    setModalState({ isOpen: false, type: null, title: '', message: '' });
  };

  return (
    <div className="space-y-6">
      {/* Ticket Top Banner Header */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800/80 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <span className="font-mono text-lg font-extrabold text-indigo-400">#{ticketId}</span>
              <StatusBadge status={currentStatus} size="lg" />
              <PriorityBadge priority={problem.priority?.admin || problem.priority?.user} size="lg" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              {pData.title || problem.title}
            </h1>
          </div>

          {/* Quick Primary Status Action Buttons */}
          <div className="flex items-center space-x-2 flex-wrap">
            {currentStatus === 'REPORTED' && (
              <>
                <button
                  onClick={handleVerify}
                  disabled={isLoading}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Problem</span>
                </button>
                <button
                  onClick={handleOpenRejectModal}
                  disabled={isLoading}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold rounded-xl transition"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Problem</span>
                </button>
              </>
            )}

            {(currentStatus === 'ASSIGNED' || currentStatus === 'VERIFIED') && (
              <button
                onClick={handleStartProgress}
                disabled={isLoading}
                className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Progress</span>
              </button>
            )}

            {currentStatus === 'IN_PROGRESS' && (
              <button
                onClick={handleOpenResolveModal}
                disabled={isLoading}
                className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Mark as Resolved</span>
              </button>
            )}
          </div>
        </div>

        {/* Metadata Key Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 pt-4 text-xs">
          <div>
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Reported By</span>
            <span className="font-mono text-slate-200 font-semibold">{problem.reporter_id}</span>
            {problem.reporter_name && (
              <span className="text-[11px] text-slate-400 block">{problem.reporter_name}</span>
            )}
          </div>

          <div>
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Category</span>
            <span className="text-slate-200 font-medium">{pData.category_name || 'General'}</span>
          </div>

          <div>
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Location</span>
            <span className="text-slate-200 font-medium">{pData.location_name || 'Campus'}</span>
          </div>

          <div>
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">User Priority</span>
            <span className="font-semibold text-amber-400">{problem.priority?.user || 'MEDIUM'}</span>
          </div>

          <div>
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Admin Priority</span>
            <span className="font-semibold text-rose-400">{problem.priority?.admin || 'Not set'}</span>
          </div>

          <div>
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Created Date</span>
            <span className="font-mono text-slate-300">{formatFullDate(problem.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Grid: Left details & actions / Right status timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Description, Media, Control Panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Problem Description</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 whitespace-pre-line">
              {pData.description || problem.description || 'No detailed description provided.'}
            </p>

            {/* Image attachment if provided */}
            {pData.image_url && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-400 block">Attached Evidence Image</span>
                <div className="relative group max-w-md overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                  <img
                    src={pData.image_url}
                    alt="Problem attachment"
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <button
                    onClick={() => setSelectedImage(pData.image_url)}
                    className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-xs gap-2 transition"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Click to Enlarge</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Rejection notice if rejected */}
          {currentStatus === 'REJECTED' && (
            <div className="glass-card rounded-2xl p-5 border border-rose-500/40 bg-rose-950/20 text-rose-300 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Rejection Notice</span>
              </div>
              <p className="text-xs text-rose-200 bg-rose-950/50 p-3 rounded-xl border border-rose-500/20">
                {problem.rejection_reason || 'This ticket was rejected by campus administration.'}
              </p>
            </div>
          )}

          {/* Resolution Card if resolved */}
          {currentStatus === 'RESOLVED' && problem.resolution && (
            <div className="glass-card rounded-2xl p-5 border border-emerald-500/40 bg-emerald-950/20 space-y-3">
              <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider text-emerald-400">
                <CheckCheck className="w-4 h-4" />
                <span>Problem Resolved</span>
              </div>
              <div className="bg-emerald-950/50 p-4 rounded-xl border border-emerald-500/20 space-y-2 text-xs">
                <p className="text-slate-100 leading-relaxed">{problem.resolution.note}</p>
                <div className="flex items-center justify-between text-slate-400 text-[11px] pt-2 border-t border-emerald-500/20">
                  <span>Resolved By: <strong className="text-emerald-300">{problem.resolution.resolved_by}</strong></span>
                  <span>Date: <strong className="text-slate-300">{formatFullDate(problem.resolution.resolved_at)}</strong></span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * Note: Resolved problems cannot be reopened in accordance with campus SLA rules.
              </p>
            </div>
          )}

          {/* Admin Priority Control Panel */}
          {currentStatus !== 'RESOLVED' && currentStatus !== 'REJECTED' && (
            <PrioritySelector
              currentPriority={problem.priority?.admin || problem.priority?.user}
              onUpdatePriority={onUpdatePriority}
              isLoading={isLoading}
            />
          )}

          {/* Department & Staff Assignment Panel */}
          {currentStatus !== 'RESOLVED' && currentStatus !== 'REJECTED' && (
            <DepartmentSelector
              currentDepartmentId={problem.assignment?.department_id}
              currentStaffId={problem.assignment?.staff_id}
              departments={departments}
              staffList={staffList}
              onAssign={onAssign}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Right Column: Status History Audit Timeline */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Status History & Audit
              </h3>
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
            </div>
            <StatusTimeline history={problem.status_history} />
          </div>

          {/* Current Assignment Card Info */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Assigned Handlers
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Department</span>
                <span className="font-semibold text-slate-200">
                  {problem.assignment?.department_name || 'Unassigned'}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Staff Member</span>
                <span className="font-semibold text-slate-200">
                  {problem.assignment?.staff_name || 'Unassigned'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals for Reject / Resolve */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: null, title: '', message: '' })}
        onConfirm={handleModalConfirm}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type === 'reject' ? 'reject' : 'resolve'}
        confirmText={modalState.type === 'reject' ? 'Reject Problem' : 'Resolve Problem'}
        requireTextarea={true}
        textareaLabel={modalState.type === 'reject' ? 'Rejection Reason' : 'Resolution Note'}
        textareaPlaceholder={
          modalState.type === 'reject'
            ? 'e.g. Duplicate report / Outside maintenance scope'
            : 'e.g. Replaced faulty hardware component and verified system operational.'
        }
        isLoading={isLoading}
      />

      {/* Image Lightbox Viewer Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={selectedImage}
            alt="Enlarged evidence"
            className="max-w-4xl max-h-[85vh] rounded-2xl border border-slate-700 shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ProblemDetails;
