import Staff from '../models/Staff.js';
import Department from '../models/Department.js';

export const getStaff = async (req, res) => {
  try {
    const { department_id } = req.query;
    let filter = {};
    if (department_id) filter.department_id = department_id;
    const staff = await Staff.find(filter);
    return res.json({ success: true, staff });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const staffData = req.body;
    const dept = await Department.findOne({ dept_id: staffData.department_id });

    const newStaff = await Staff.create({
      staff_id_code: `STF-${Date.now().toString().slice(-4)}`,
      ...staffData,
      department_name: dept ? dept.name : 'Unassigned',
      active_problems: 0,
      resolved_problems: 0,
      status: 'ACTIVE'
    });

    return res.status(201).json({ success: true, staff: newStaff, message: 'Staff member added' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findOneAndUpdate(
      { $or: [{ staff_id_code: req.params.id }, { _id: req.params.id }] },
      req.body,
      { new: true }
    );
    if (!staff) return res.status(404).json({ success: false, message: 'Staff member not found' });
    return res.json({ success: true, staff, message: 'Staff member updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
