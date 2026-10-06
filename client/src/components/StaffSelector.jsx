import React from 'react';
import { UserCheck } from 'lucide-react';

const StaffSelector = ({ staffList = [], selectedStaffId, onSelect }) => {
  return (
    <div className="space-y-1">
      <select
        value={selectedStaffId || ''}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <option value="">All Staff Members</option>
        {staffList.map((staff) => (
          <option key={staff.id} value={staff.id}>
            {staff.name} ({staff.department_name})
          </option>
        ))}
      </select>
    </div>
  );
};

export default StaffSelector;
