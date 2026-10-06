import mongoose from 'mongoose';

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  updated_by: { type: String, default: 'System' },
  note: { type: String, default: '' }
});

const problemSchema = new mongoose.Schema(
  {
    ticket_id: { type: String, required: true, unique: true },
    reporter_id: { type: String, required: true },
    reporter_name: { type: String, required: true },
    reporter_email: { type: String, default: '' },
    problem: {
      title: { type: String, required: true },
      description: { type: String, default: '' },
      category_id: { type: String, required: true },
      category_name: { type: String, default: 'General' },
      location_id: { type: String, required: true },
      location_name: { type: String, default: 'Campus' },
      image_url: { type: String, default: null }
    },
    priority: {
      user: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' },
      admin: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' }
    },
    assignment: {
      department_id: { type: String, default: null },
      department_name: { type: String, default: null },
      staff_id: { type: String, default: null },
      staff_name: { type: String, default: null }
    },
    status: {
      type: String,
      enum: ['REPORTED', 'VERIFIED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'],
      default: 'REPORTED'
    },
    status_history: [statusHistorySchema],
    rejection_reason: { type: String, default: null },
    resolution: {
      note: { type: String, default: null },
      resolved_by: { type: String, default: null },
      resolved_at: { type: Date, default: null }
    }
  },
  { timestamps: true }
);

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;
