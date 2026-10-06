import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../components/PageHeader';
import ImageUpload from '../../components/ImageUpload';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { userProblemsAPI, categoriesAPI, locationsAPI } from '../../services/api';
import {
  FileText,
  Tag,
  MapPin,
  Flame,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
  RefreshCw,
  Ticket
} from 'lucide-react';

const ReportProblem = () => {
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    location_id: '',
    priority: 'MEDIUM',
    image_url: null
  });

  const [errors, setErrors] = useState({});
  const [submittedTicket, setSubmittedTicket] = useState(null); // { ticket_id, title }

  useEffect(() => {
    const loadFormOptions = async () => {
      try {
        const [catRes, locRes] = await Promise.all([
          categoriesAPI.getAll(),
          locationsAPI.getAll()
        ]);

        if (catRes.success) setCategories(catRes.categories);
        if (locRes.success) setLocations(locRes.locations);

        // Pre-select first category and location if available
        setFormData((prev) => ({
          ...prev,
          category_id: catRes.categories?.[0]?.id || '',
          location_id: locRes.locations?.[0]?.id || ''
        }));
      } catch (err) {
        console.error('Failed to load categories/locations:', err);
      } finally {
        setLoadingData(false);
      }
    };

    loadFormOptions();
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Please enter a problem title.';
    } else if (formData.title.length < 5) {
      errs.title = 'Problem title must be at least 5 characters long.';
    }

    if (!formData.description.trim()) {
      errs.description = 'Please enter a detailed description of the problem.';
    } else if (formData.description.length < 10) {
      errs.description = 'Description should provide sufficient details (at least 10 characters).';
    }

    if (!formData.category_id) {
      errs.category_id = 'Please select a problem category.';
    }

    if (!formData.location_id) {
      errs.location_id = 'Please select the problem location.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await userProblemsAPI.create(formData);
      if (res.success) {
        setSubmittedTicket({
          ticket_id: res.ticket_id,
          title: formData.title
        });
      }
    } catch (err) {
      setErrors({ api: err.response?.data?.message || 'Failed to submit problem report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingData) {
    return <LoadingSkeleton type="details" />;
  }

  const priorityExplanations = {
    LOW: 'Minor inconvenience — does not prevent daily campus tasks.',
    MEDIUM: 'Affects normal usage — requires routine maintenance attention.',
    HIGH: 'Significantly affects users — disrupts lectures, labs, or essential services.',
    CRITICAL: 'Urgent issue requiring immediate emergency administration intervention.'
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Report a Campus Problem"
        subtitle="Submit infrastructural, IT, washroom, or facility issues for campus resolution."
      />

      {/* Success Modal Popup upon ticket creation */}
      <AnimatePresence>
        {submittedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Problem Reported Successfully!
                </h2>
                <p className="text-xs text-slate-400">
                  Your ticket has been logged into the central campus maintenance database.
                </p>
              </div>

              {/* Ticket ID Box */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Official Ticket ID
                </span>
                <div className="text-2xl font-extrabold font-mono text-indigo-400 flex items-center justify-center gap-2">
                  <Ticket className="w-5 h-5 text-indigo-400" />
                  <span>#{submittedTicket.ticket_id}</span>
                </div>
                <p className="text-xs text-slate-300 font-semibold truncate pt-1">
                  "{submittedTicket.title}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => navigate(`/problems/${submittedTicket.ticket_id}`)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition"
                >
                  View Problem Details
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition"
                >
                  Back to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Report Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.api && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errors.api}</span>
          </div>
        )}

        {/* Section 1: Problem Information */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h3 className="text-base font-bold text-white">Problem Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Problem Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (errors.title) setErrors({ ...errors, title: null });
                }}
                placeholder="e.g. Wi-Fi connection offline in Block C Lab Room 302"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              {errors.title && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Detailed Description <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: null });
                }}
                placeholder="Describe what is wrong, when it started, and specific equipment or symptoms..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              {errors.description && (
                <p className="text-xs text-rose-400 mt-1 font-medium">{errors.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2 & 3: Category & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 2: Category */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="text-base font-bold text-white">Problem Category</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Select Category <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} — {cat.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: Location */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="text-base font-bold text-white">Campus Location</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Select Building / Block <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.location_id}
                onChange={(e) => setFormData({ ...formData, location_id: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Priority Suggestion */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h3 className="text-base font-bold text-white">Suggested Priority</h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: p })}
                  className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center justify-center space-y-1 transition ${
                    formData.priority === p
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 ring-2 ring-indigo-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>{p}</span>
                </button>
              ))}
            </div>

            {/* Explanation box */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-indigo-300">{formData.priority}: </span>
                <span>{priorityExplanations[formData.priority]}</span>
                <p className="text-[11px] text-slate-500 mt-1 italic">
                  * Note: Your selected priority is a suggestion. Campus Administration sets final priority upon ticket verification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Upload Image (Optional) */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              5
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Evidence Image (Optional)</h3>
              <p className="text-xs text-slate-400">Attach a photo of the damaged component or equipment error</p>
            </div>
          </div>

          <ImageUpload
            value={formData.image_url}
            onChange={(img) => setFormData({ ...formData, image_url: img })}
          />
        </div>

        {/* Section 6: Submit Button */}
        <div className="flex items-center justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition duration-150"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Submitting Problem Report...</span>
              </>
            ) : (
              <>
                <span>Submit Problem Ticket</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportProblem;
