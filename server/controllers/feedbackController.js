import { getCollection, saveCollection } from '../config/jsonStore.js';

export const submitFeedback = async (req, res) => {
  try {
    const { rating, comment, user_name, user_id } = req.body;
    const ticketId = req.params.id;

    const problems = getCollection('problems');
    const problem = problems.find(p => p.ticket_id === ticketId);

    const newFeedback = {
      id: `fb_${Date.now()}`,
      ticket_id: ticketId,
      problem_title: problem ? problem.problem.title : 'Campus Problem',
      user_name: user_name || problem?.reporter_name || 'Campus Student',
      user_id: user_id || problem?.reporter_id || 'CS24001',
      rating: Number(rating) || 5,
      comment: comment || '',
      department_name: problem?.assignment?.department_name || 'Maintenance',
      resolved_date: problem?.resolution?.resolved_at || new Date().toISOString(),
      feedback_date: new Date().toISOString()
    };

    const feedback = getCollection('feedback');
    feedback.push(newFeedback);
    saveCollection('feedback', feedback);

    return res.json({ success: true, feedback: newFeedback, message: 'Thank you for your feedback!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminFeedback = async (req, res) => {
  try {
    const feedbackList = getCollection('feedback').sort
      ? getCollection('feedback').slice().reverse()
      : getCollection('feedback');
    return res.json({ success: true, feedback: feedbackList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
