import Problem from '../models/Problem.js';
import Category from '../models/Category.js';
import Location from '../models/Location.js';
import Department from '../models/Department.js';
import Staff from '../models/Staff.js';
import Notification from '../models/Notification.js';

// Create problem ticket (Student)
export const createProblem = async (req, res) => {
  try {
    const problemData = req.body;
    if (!problemData.title || !problemData.category_id || !problemData.location_id) {
      return res.status(400).json({ success: false, message: 'Title, category, and location are required' });
    }

    const category = await Category.findOne({ cat_id: problemData.category_id });
    const location = await Location.findOne({ loc_id: problemData.location_id });

    const totalProblems = await Problem.countDocuments();
    const ticketNum = (totalProblems + 1).toString().padStart(4, '0');
    const ticketId = `CPT-2026-${ticketNum}`;

    const newProblem = await Problem.create({
      ticket_id: ticketId,
      reporter_id: problemData.reporter_id || 'CS24001',
      reporter_name: problemData.reporter_name || 'Alex Johnson',
      reporter_email: problemData.reporter_email || 'alex.j@college.edu',
      problem: {
        title: problemData.title,
        description: problemData.description || '',
        category_id: problemData.category_id,
        category_name: category ? category.name : 'General',
        location_id: problemData.location_id,
        location_name: location ? location.name : 'Campus',
        image_url: problemData.image_url || null
      },
      priority: {
        user: (problemData.priority || 'MEDIUM').toUpperCase(),
        admin: (problemData.priority || 'MEDIUM').toUpperCase()
      },
      status: 'REPORTED',
      status_history: [
        {
          status: 'REPORTED',
          timestamp: new Date(),
          updated_by: problemData.reporter_id || 'CS24001',
          note: 'Problem reported via campus tracker application'
        }
      ]
    });

    // Student Notification
    await Notification.create({
      notif_id: `snotif_${Date.now()}`,
      target: 'STUDENT',
      user_id: problemData.reporter_id || 'CS24001',
      title: 'Ticket Submitted',
      message: `Your problem report ${ticketId} (${problemData.title}) has been received.`,
      type: 'INFO',
      ticket_id: ticketId
    });

    // Admin Notification
    await Notification.create({
      notif_id: `notif_${Date.now()}`,
      target: 'ADMIN',
      title: 'New Problem Ticket',
      message: `New problem reported: ${problemData.title} (${ticketId}).`,
      type: (problemData.priority || '').toUpperCase() === 'CRITICAL' ? 'CRITICAL' : 'INFO',
      ticket_id: ticketId
    });

    return res.status(201).json({
      success: true,
      ticket_id: ticketId,
      problem: newProblem,
      message: 'Problem reported successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Problems (Filter & Search)
export const getProblems = async (req, res) => {
  try {
    const { search, status, priority, category, department, location, sort } = req.query;
    let filter = {};

    if (search) {
      const q = new RegExp(search, 'i');
      filter['$or'] = [
        { ticket_id: q },
        { 'problem.title': q },
        { reporter_id: q },
        { 'problem.category_name': q },
        { 'problem.location_name': q }
      ];
    }

    if (status && status !== 'ALL') filter.status = status;
    if (category && category !== 'ALL') filter['problem.category_id'] = category;
    if (location && location !== 'ALL') filter['problem.location_id'] = location;
    if (department && department !== 'ALL') filter['assignment.department_id'] = department;

    if (priority && priority !== 'ALL') {
      filter['$or'] = [{ 'priority.admin': priority }, { 'priority.user': priority }];
    }

    const sortOption = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
    const problems = await Problem.find(filter).sort(sortOption);

    return res.json({ success: true, total: problems.length, problems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

import mongoose from 'mongoose';

const buildTicketQuery = (id) => {
  if (!id) return {};
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ ticket_id: id }, { _id: id }] };
  }
  return { ticket_id: id };
};

// Get Single Problem by Ticket ID
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findOne(buildTicketQuery(req.params.id));

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem ticket not found' });
    }
    return res.json({ success: true, problem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Update Priority
export const updatePriority = async (req, res) => {
  try {
    const { priority } = req.body;
    const problem = await Problem.findOneAndUpdate(
      buildTicketQuery(req.params.id),
      { 'priority.admin': priority },
      { new: true }
    );

    if (!problem) return res.status(404).json({ success: false, message: 'Ticket not found' });
    return res.json({ success: true, problem, message: 'Priority updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Assign Department & Staff
export const assignProblem = async (req, res) => {
  try {
    const { department_id, staff_id } = req.body;
    const problem = await Problem.findOne(buildTicketQuery(req.params.id));

    if (!problem) return res.status(404).json({ success: false, message: 'Ticket not found' });

    const dept = await Department.findOne({ dept_id: department_id });
    const staff = await Staff.findOne({ staff_id_code: staff_id });

    problem.assignment = {
      department_id: department_id || problem.assignment.department_id,
      department_name: dept ? dept.name : problem.assignment.department_name,
      staff_id: staff_id || problem.assignment.staff_id,
      staff_name: staff ? staff.name : problem.assignment.staff_name
    };

    if (problem.status === 'REPORTED' || problem.status === 'VERIFIED') {
      problem.status = 'ASSIGNED';
    }

    problem.status_history.push({
      status: 'ASSIGNED',
      timestamp: new Date(),
      updated_by: 'ADMIN001',
      note: `Assigned to ${dept ? dept.name : 'Department'} ${staff ? `- ${staff.name}` : ''}`
    });

    await problem.save();

    await Notification.create({
      notif_id: `snotif_${Date.now()}`,
      target: 'STUDENT',
      user_id: problem.reporter_id,
      title: 'Ticket Assigned',
      message: `Your ticket ${req.params.id} has been assigned to ${dept ? dept.name : 'Department'}.`,
      type: 'INFO',
      ticket_id: req.params.id
    });

    return res.json({ success: true, problem, message: 'Assignment updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Update Status
export const updateStatus = async (req, res) => {
  try {
    const { status, reason, resolution_note } = req.body;
    const problem = await Problem.findOne(buildTicketQuery(req.params.id));

    if (!problem) return res.status(404).json({ success: false, message: 'Ticket not found' });

    const now = new Date();
    let note = `Status changed to ${status}`;
    if (status === 'REJECTED' && reason) note = `Rejected: ${reason}`;
    if (status === 'RESOLVED' && resolution_note) note = `Resolved: ${resolution_note}`;

    problem.status = status;
    problem.status_history.push({
      status,
      timestamp: now,
      updated_by: 'ADMIN001',
      note
    });

    if (status === 'REJECTED') {
      problem.rejection_reason = reason || 'Invalid report';
    }

    if (status === 'RESOLVED') {
      problem.resolution = {
        note: resolution_note || 'Issue inspected and successfully resolved by campus staff.',
        resolved_by: problem.assignment.staff_name || 'Campus Administrator',
        resolved_at: now
      };
    }

    await problem.save();

    await Notification.create({
      notif_id: `snotif_${Date.now()}`,
      target: 'STUDENT',
      user_id: problem.reporter_id,
      title: status === 'RESOLVED' ? 'Problem Resolved 🎉' : `Ticket Status: ${status}`,
      message: status === 'RESOLVED'
        ? `Your ticket ${req.params.id} (${problem.problem.title}) has been resolved!`
        : `Status for ticket ${req.params.id} changed to ${status}.`,
      type: status === 'RESOLVED' ? 'SUCCESS' : status === 'REJECTED' ? 'WARNING' : 'INFO',
      ticket_id: req.params.id
    });

    return res.json({ success: true, problem, message: `Status updated to ${status}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
