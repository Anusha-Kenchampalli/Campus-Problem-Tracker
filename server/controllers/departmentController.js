import Department from '../models/Department.js';

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    return res.json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const deptData = req.body;
    const newDept = await Department.create({
      dept_id: `dept_${Date.now()}`,
      ...deptData,
      active_problems_count: 0,
      resolved_problems_count: 0,
      staff_count: 0,
      status: 'ACTIVE'
    });
    return res.status(201).json({ success: true, department: newDept, message: 'Department created' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findOneAndUpdate(
      { dept_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!department) return res.status(404).json({ success: false, message: 'Department not found' });
    return res.json({ success: true, department, message: 'Department updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
