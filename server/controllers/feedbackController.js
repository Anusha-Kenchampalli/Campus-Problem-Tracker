import Feedback from '../models/Feedback.js';
import Problem from '../models/Problem.js';

export const submitFeedback = async (req, res) => {
  try {
    const { rating, comment, user_name, user_id } = req.body;
    const ticketId = req.params.id;

    const problem = await Problem.findOne({ ticket_id: ticketId });

    const newFeedback = await Feedback.create({
      feedback_id: `fb_${Date.now()}`,
      ticket_id: ticketId,
      problem_title: problem ? problem.problem.title : 'Campus Problem',
      user_name: user_name || problem?.reporter_name || 'Campus Student',
      user_id: user_id || problem?.reporter_id || 'CS24001',
      rating: Number(rating) || 5,
      comment: comment || '',
      department_name: problem?.assignment?.department_name || 'Maintenance',
      resolved_date: problem?.resolution?.resolved_at || new Date(),
      feedback_date: new Date()
    });

    return res.json({ success: true, feedback: newFeedback, message: 'Thank you for your feedback!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, feedback: feedbackList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
