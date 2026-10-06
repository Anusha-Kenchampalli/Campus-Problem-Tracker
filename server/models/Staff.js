import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
  {
    staff_id_code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    department_id: { type: String, required: true },
    department_name: { type: String, default: '' },
    role: { type: String, default: 'Technician' },
    active_problems: { type: Number, default: 0 },
    resolved_problems: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

const Staff = mongoose.model('Staff', staffSchema);
export default Staff;
