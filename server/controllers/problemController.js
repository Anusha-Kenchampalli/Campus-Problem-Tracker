import { getCollection, saveCollection } from '../config/jsonStore.js';

// Create problem ticket (Student)
export const createProblem = async (req, res) => {
  try {
    const problemData = req.body;
    if (!problemData.title || !problemData.category_id || !problemData.location_id) {
      return res.status(400).json({ success: false, message: 'Title, category, and location are required' });
    }

    const categories = getCollection('categories');
    const locations = getCollection('locations');
    const problems = getCollection('problems');

    const category = categories.find(c => c.id === problemData.category_id);
    const location = locations.find(l => l.id === problemData.location_id);

    const ticketNum = (problems.length + 1).toString().padStart(4, '0');
    const ticketId = `CPT-2026-${ticketNum}`;
    const now = new Date().toISOString();

    const newProblem = {
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
      assignment: { department_id: null, department_name: null, staff_id: null, staff_name: null },
      status: 'REPORTED',
      status_history: [
        {
          status: 'REPORTED',
          timestamp: now,
          updated_by: problemData.reporter_id || 'CS24001',
          note: 'Problem reported via mobile/web interface'
        }
      ],
      resolution: null,
      created_at: now,
      updated_at: now
    };

    problems.push(newProblem);
    saveCollection('problems', problems);

    // Student notification
    const studentNotifs = getCollection('student_notifications');
    studentNotifs.unshift({
      id: `snotif_${Date.now()}`,
      title: 'Ticket Submitted',
      message: `Your problem report ${ticketId} (${problemData.title}) has been received successfully.`,
      timestamp: now,
      read: false,
      type: 'INFO',
      ticket_id: ticketId,
      user_id: problemData.reporter_id || 'CS24001'
    });
    saveCollection('student_notifications', studentNotifs);

    // Admin notification
    const adminNotifs = getCollection('admin_notifications');
    adminNotifs.unshift({
      id: `notif_${Date.now()}`,
      title: 'New Problem Ticket',
      message: `New problem reported: ${problemData.title} (${ticketId}).`,
      timestamp: now,
      read: false,
      type: (problemData.priority || '').toUpperCase() === 'CRITICAL' ? 'CRITICAL' : 'INFO',
      ticket_id: ticketId
    });
    saveCollection('admin_notifications', adminNotifs);

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
    const { search, status, priority, category, department, location, sort, reporter_id } = req.query;
    let problems = getCollection('problems');

    if (search) {
      const q = search.toLowerCase();
      problems = problems.filter(p =>
        p.ticket_id?.toLowerCase().includes(q) ||
        p.problem?.title?.toLowerCase().includes(q) ||
        p.reporter_id?.toLowerCase().includes(q) ||
        p.problem?.category_name?.toLowerCase().includes(q) ||
        p.problem?.location_name?.toLowerCase().includes(q)
      );
    }

    if (reporter_id) {
      problems = problems.filter(p => p.reporter_id === reporter_id);
    }

    if (status && status !== 'ALL') problems = problems.filter(p => p.status === status);
    if (category && category !== 'ALL') problems = problems.filter(p => p.problem?.category_id === category);
    if (location && location !== 'ALL') problems = problems.filter(p => p.problem?.location_id === location);
    if (department && department !== 'ALL') problems = problems.filter(p => p.assignment?.department_id === department);
    if (priority && priority !== 'ALL') {
      problems = problems.filter(p => p.priority?.admin === priority || p.priority?.user === priority);
    }

    // Sort
    problems = problems.sort((a, b) => {
      const aDate = new Date(a.created_at || 0);
      const bDate = new Date(b.created_at || 0);
      return sort === 'oldest' ? aDate - bDate : bDate - aDate;
    });

    return res.json({ success: true, total: problems.length, problems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Problem by Ticket ID
export const getProblemById = async (req, res) => {
  try {
    const problems = getCollection('problems');
    const problem = problems.find(p => p.ticket_id === req.params.id);

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
    const problems = getCollection('problems');
    const idx = problems.findIndex(p => p.ticket_id === req.params.id);

    if (idx === -1) return res.status(404).json({ success: false, message: 'Ticket not found' });

    problems[idx].priority = { ...problems[idx].priority, admin: priority };
    problems[idx].updated_at = new Date().toISOString();
    saveCollection('problems', problems);

    return res.json({ success: true, problem: problems[idx], message: 'Priority updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Assign Department & Staff
export const assignProblem = async (req, res) => {
  try {
    const { department_id, staff_id } = req.body;
    const problems = getCollection('problems');
    const idx = problems.findIndex(p => p.ticket_id === req.params.id);

    if (idx === -1) return res.status(404).json({ success: false, message: 'Ticket not found' });

    const departments = getCollection('departments');
    const staff = getCollection('staff');
    const dept = departments.find(d => d.id === department_id);
    const staffMember = staff.find(s => s.id === staff_id || s.staff_id === staff_id);

    const now = new Date().toISOString();
    problems[idx].assignment = {
      department_id: department_id || problems[idx].assignment?.department_id,
      department_name: dept ? dept.name : problems[idx].assignment?.department_name,
      staff_id: staff_id || problems[idx].assignment?.staff_id,
      staff_name: staffMember ? staffMember.name : problems[idx].assignment?.staff_name
    };

    if (problems[idx].status === 'REPORTED' || problems[idx].status === 'VERIFIED') {
      problems[idx].status = 'ASSIGNED';
    }

    problems[idx].status_history = problems[idx].status_history || [];
    problems[idx].status_history.push({
      status: 'ASSIGNED',
      timestamp: now,
      updated_by: 'ADMIN001',
      note: `Assigned to ${dept ? dept.name : 'Department'}${staffMember ? ` - ${staffMember.name}` : ''}`
    });
    problems[idx].updated_at = now;
    saveCollection('problems', problems);

    // Student notification
    const studentNotifs = getCollection('student_notifications');
    studentNotifs.unshift({
      id: `snotif_${Date.now()}`,
      title: 'Ticket Assigned',
      message: `Your ticket ${req.params.id} has been assigned to ${dept ? dept.name : 'Department'}.`,
      timestamp: now,
      read: false,
      type: 'INFO',
      ticket_id: req.params.id,
      user_id: problems[idx].reporter_id
    });
    saveCollection('student_notifications', studentNotifs);

    return res.json({ success: true, problem: problems[idx], message: 'Assignment updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Update Status
export const updateStatus = async (req, res) => {
  try {
    const { status, reason, resolution_note } = req.body;
    const problems = getCollection('problems');
    const idx = problems.findIndex(p => p.ticket_id === req.params.id);

    if (idx === -1) return res.status(404).json({ success: false, message: 'Ticket not found' });

    const now = new Date().toISOString();
    let note = `Status changed to ${status}`;
    if (status === 'REJECTED' && reason) note = `Rejected: ${reason}`;
    if (status === 'RESOLVED' && resolution_note) note = `Resolved: ${resolution_note}`;

    problems[idx].status = status;
    problems[idx].status_history = problems[idx].status_history || [];
    problems[idx].status_history.push({
      status,
      timestamp: now,
      updated_by: 'ADMIN001',
      note
    });

    if (status === 'REJECTED') {
      problems[idx].rejection_reason = reason || 'Invalid report';
    }

    if (status === 'RESOLVED') {
      problems[idx].resolution = {
        note: resolution_note || 'Issue inspected and successfully resolved by campus staff.',
        resolved_by: problems[idx].assignment?.staff_name || 'Campus Administrator',
        resolved_at: now
      };
    }

    problems[idx].updated_at = now;
    saveCollection('problems', problems);

    // Student notification
    const studentNotifs = getCollection('student_notifications');
    studentNotifs.unshift({
      id: `snotif_${Date.now()}`,
      title: status === 'RESOLVED' ? 'Problem Resolved 🎉' : `Ticket Status: ${status}`,
      message: status === 'RESOLVED'
        ? `Your ticket ${req.params.id} (${problems[idx].problem.title}) has been resolved!`
        : `Status for ticket ${req.params.id} changed to ${status}.`,
      timestamp: now,
      read: false,
      type: status === 'RESOLVED' ? 'SUCCESS' : status === 'REJECTED' ? 'WARNING' : 'INFO',
      ticket_id: req.params.id,
      user_id: problems[idx].reporter_id
    });
    saveCollection('student_notifications', studentNotifs);

    return res.json({ success: true, problem: problems[idx], message: `Status updated to ${status}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
