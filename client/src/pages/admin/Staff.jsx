import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { staffAPI, departmentsAPI } from '../../services/api';
import { Users, Plus, Edit2, Mail, Phone, Building2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Staff = () => {
  const [loading, setLoading] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department_id: '',
    role: ''
  });

  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [staffRes, deptsRes] = await Promise.all([
        staffAPI.getAll(selectedDeptFilter || null),
        departmentsAPI.getAll()
      ]);

      if (staffRes.success) setStaffList(staffRes.staff);
      if (deptsRes.success) setDepartments(deptsRes.departments);
    } catch (err) {
      console.error('Failed to load staff list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDeptFilter]);

  const handleOpenAddModal = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department_id: departments[0]?.id || '',
      role: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (staff) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      phone: staff.phone || '',
      department_id: staff.department_id,
      role: staff.role || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.department_id) return;

    try {
      if (editingStaff) {
        const res = await staffAPI.update(editingStaff.id, formData);
        if (res.success) showToast('Staff details updated.');
      } else {
        const res = await staffAPI.create(formData);
        if (res.success) showToast('New staff member added.');
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      showToast('Failed to save staff information.');
    }
  };

  const columns = [
    { header: 'Staff ID' },
    { header: 'Staff Name' },
    { header: 'Department' },
    { header: 'Role / Designation' },
    { header: 'Email & Contact' },
    { header: 'Active Tasks' },
    { header: 'Resolved Tasks' },
    { header: 'Status' },
    { header: 'Action', className: 'text-right' }
  ];

  if (loading) {
    return <LoadingSkeleton type="table" count={5} />;
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-slate-900 border border-indigo-500 text-xs font-semibold text-white flex items-center space-x-2 shadow-2xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      <PageHeader
        title="Department Staff Directory"
        subtitle="Manage assigned maintenance technicians, IT staff, engineers, and supervisors."
        badge={`${staffList.length} Personnel`}
        action={
          <button
            onClick={handleOpenAddModal}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        }
      />

      {/* Filter by Department */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center space-x-3">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Filter by Department:
        </label>
        <select
          value={selectedDeptFilter}
          onChange={(e) => setSelectedDeptFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Staff Table */}
      <DataTable
        columns={columns}
        data={staffList}
        renderRow={(staff) => (
          <tr key={staff.id} className="hover:bg-slate-800/40 transition">
            <td className="py-3.5 px-4 font-mono font-bold text-indigo-300">
              {staff.staff_id}
            </td>
            <td className="py-3.5 px-4 font-semibold text-white">
              {staff.name}
            </td>
            <td className="py-3.5 px-4 text-slate-300">
              {staff.department_name}
            </td>
            <td className="py-3.5 px-4 text-slate-400">
              {staff.role || 'Maintenance Specialist'}
            </td>
            <td className="py-3.5 px-4 text-slate-400 text-[11px]">
              <div>{staff.email}</div>
              <div className="font-mono text-slate-500">{staff.phone}</div>
            </td>
            <td className="py-3.5 px-4 font-mono font-bold text-amber-400 text-center">
              {staff.active_problems || 0}
            </td>
            <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 text-center">
              {staff.resolved_problems || 0}
            </td>
            <td className="py-3.5 px-4">
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full uppercase">
                {staff.status || 'ACTIVE'}
              </span>
            </td>
            <td className="py-3.5 px-4 text-right">
              <button
                onClick={() => handleOpenEditModal(staff)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </td>
          </tr>
        )}
      />

      {/* Add / Edit Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Department *</label>
                <select
                  required
                  value={formData.department_id}
                  onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role / Designation</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Senior Network Specialist"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul.k@college.edu"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98111 22334"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg"
                >
                  Save Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
