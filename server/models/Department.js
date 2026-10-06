import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    dept_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    code: { type: String, required: true, uppercase: true },
    description: { type: String, default: '' },
    head: { type: String, default: '' },
    contact_email: { type: String, default: '' },
    phone: { type: String, default: '' },
    active_problems_count: { type: Number, default: 0 },
    resolved_problems_count: { type: Number, default: 0 },
    staff_count: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

const Department = mongoose.model('Department', departmentSchema);
export default Department;
