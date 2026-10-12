import { getCollection, saveCollection } from '../config/jsonStore.js';

export const getDepartments = async (req, res) => {
  try {
    const departments = getCollection('departments');
    return res.json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const deptData = req.body;
    const departments = getCollection('departments');

    const newDept = {
      id: `dept_${Date.now()}`,
      name: deptData.name || '',
      code: (deptData.code || '').toUpperCase(),
      description: deptData.description || '',
      head: deptData.head || '',
      contact_email: deptData.contact_email || '',
      phone: deptData.phone || '',
      active_problems_count: 0,
      resolved_problems_count: 0,
      staff_count: 0,
      status: 'ACTIVE'
    };

    departments.push(newDept);
    saveCollection('departments', departments);

    return res.status(201).json({ success: true, department: newDept, message: 'Department created' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const departments = getCollection('departments');
    const idx = departments.findIndex(d => d.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Department not found' });

    departments[idx] = { ...departments[idx], ...req.body };
    saveCollection('departments', departments);

    return res.json({ success: true, department: departments[idx], message: 'Department updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
