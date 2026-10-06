import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    feedback_id: { type: String, required: true, unique: true },
    ticket_id: { type: String, required: true },
    problem_title: { type: String, default: 'Campus Problem' },
    user_name: { type: String, required: true },
    user_id: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: '' },
    department_name: { type: String, default: 'Maintenance' },
    resolved_date: { type: Date, default: Date.now },
    feedback_date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
