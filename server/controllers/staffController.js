import { getCollection, saveCollection } from '../config/jsonStore.js';

export const getStaff = async (req, res) => {
  try {
    const { department_id } = req.query;
    let staff = getCollection('staff');
    if (department_id) {
      staff = staff.filter(s => s.department_id === department_id);
    }
    return res.json({ success: true, staff });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const staffData = req.body;
    const staff = getCollection('staff');
    const departments = getCollection('departments');
    const dept = departments.find(d => d.id === staffData.department_id);

    const newStaff = {
      id: `staff_${Date.now()}`,
      staff_id: `STF-${Date.now().toString().slice(-4)}`,
      name: staffData.name || '',
      email: staffData.email || '',
      phone: staffData.phone || '',
      department_id: staffData.department_id || '',
      department_name: dept ? dept.name : (staffData.department_name || 'Unassigned'),
      role: staffData.role || '',
      active_problems: 0,
      resolved_problems: 0,
      status: 'ACTIVE'
    };

    staff.push(newStaff);
    saveCollection('staff', staff);

    return res.status(201).json({ success: true, staff: newStaff, message: 'Staff member added' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const staff = getCollection('staff');
    const idx = staff.findIndex(s => s.id === req.params.id || s.staff_id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Staff member not found' });

    staff[idx] = { ...staff[idx], ...req.body };
    saveCollection('staff', staff);

    return res.json({ success: true, staff: staff[idx], message: 'Staff member updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
