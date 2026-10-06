import React, { useState, useEffect } from 'react';
import { Building2, UserCheck, RefreshCw } from 'lucide-react';

const DepartmentSelector = ({
  currentDepartmentId,
  currentStaffId,
  departments = [],
  staffList = [],
  onAssign,
  isLoading = false
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState(currentDepartmentId || '');
  const [selectedStaffId, setSelectedStaffId] = useState(currentStaffId || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedDeptId(currentDepartmentId || '');
    setSelectedStaffId(currentStaffId || '');
  }, [currentDepartmentId, currentStaffId]);

  // Filter staff by selected department
  const filteredStaff = staffList.filter(
    (s) => !selectedDeptId || s.department_id === selectedDeptId
  );

  const handleDeptChange = (e) => {
    const deptId = e.target.value;
    setSelectedDeptId(deptId);
    // Reset selected staff if not belonging to new department
    setSelectedStaffId('');
  };

  const handleSaveAssignment = async () => {
    if (!selectedDeptId) return;
    setIsSubmitting(true);
    await onAssign({ department_id: selectedDeptId, staff_id: selectedStaffId });
    setIsSubmitting(false);
  };

  const hasChanges =
    selectedDeptId !== (currentDepartmentId || '') || selectedStaffId !== (currentStaffId || '');

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800/80 space-y-4">
      <div className="flex items-center space-x-2">
        <Building2 className="w-4 h-4 text-purple-400" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Department & Staff Assignment
        </h4>
      </div>

      <div className="space-y-3">
        {/* Department Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Assign Department *
          </label>
          <select
            value={selectedDeptId}
            onChange={handleDeptChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="">-- Select Department --</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name} ({dept.code})
              </option>
            ))}
          </select>
        </div>

        {/* Staff Dropdown (Enabled if Department selected) */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Assign Specific Staff Member (Optional)
          </label>
          <select
            disabled={!selectedDeptId}
            value={selectedStaffId}
            onChange={(e) => setSelectedStaffId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">-- Unassigned (Department Level) --</option>
            {filteredStaff.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name} — {staff.role} ({staff.staff_id})
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            disabled={!selectedDeptId || !hasChanges || isSubmitting || isLoading}
            onClick={handleSaveAssignment}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-600/20 transition"
          >
            {isSubmitting || isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Assigning...</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>Confirm Assignment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentSelector;
