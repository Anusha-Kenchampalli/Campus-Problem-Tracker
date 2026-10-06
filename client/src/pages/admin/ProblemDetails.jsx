import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ProblemDetailsComponent from '../../components/ProblemDetails';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import {
  problemsAPI,
  departmentsAPI,
  staffAPI
} from '../../services/api';
import { ArrowLeft, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProblemDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [problem, setProblem] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: '' }

  const showToast = (message, type = 'success') => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadTicket = async () => {
    setLoading(true);
    try {
      const [probRes, deptsRes, staffRes] = await Promise.all([
        problemsAPI.getById(id),
        departmentsAPI.getAll(),
        staffAPI.getAll()
      ]);

      if (probRes.success) {
        setProblem(probRes.problem);
      }
      if (deptsRes.success) {
        setDepartments(deptsRes.departments);
      }
      if (staffRes.success) {
        setStaffList(staffRes.staff);
      }
    } catch (err) {
      console.error('Failed to load problem details:', err);
      showToast('Problem ticket not found or failed to load.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicket();
  }, [id]);

  const handleUpdatePriority = async (newPriority) => {
    setUpdating(true);
    try {
      const res = await problemsAPI.updatePriority(id, newPriority);
      if (res.success) {
        setProblem(res.problem);
        showToast(`Priority updated to ${newPriority} successfully.`);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update priority.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleAssign = async ({ department_id, staff_id }) => {
    setUpdating(true);
    try {
      const res = await problemsAPI.assign(id, { department_id, staff_id });
      if (res.success) {
        setProblem(res.problem);
        showToast('Department and staff assigned successfully.');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to assign problem.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateStatus = async ({ status, reason, resolution_note }) => {
    setUpdating(true);
    try {
      const res = await problemsAPI.updateStatus(id, { status, reason, resolution_note });
      if (res.success) {
        setProblem(res.problem);
        showToast(`Ticket status changed to ${status}.`);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update status.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton type="details" />;
  }

  if (!problem) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
        <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">Ticket Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested ticket ID #{id} does not exist or has been archived.
        </p>
        <button
          onClick={() => navigate('/admin/problems')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
        >
          Back to All Problems
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 p-4 rounded-xl shadow-2xl border flex items-center space-x-3 text-xs font-semibold text-white ${
              toast.type === 'error'
                ? 'bg-rose-900/90 border-rose-500 shadow-rose-950/50'
                : 'bg-emerald-900/90 border-emerald-500 shadow-emerald-950/50'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-300" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <PageHeader
        title={`Ticket Management #${id}`}
        subtitle="Review, verify, assign priority, delegate department, and record resolution."
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

      <ProblemDetailsComponent
        problem={problem}
        departments={departments}
        staffList={staffList}
        onUpdatePriority={handleUpdatePriority}
        onAssign={handleAssign}
        onUpdateStatus={handleUpdateStatus}
        isLoading={updating}
      />
    </div>
  );
};

export default ProblemDetailsPage;
