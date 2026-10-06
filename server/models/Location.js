import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    loc_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    building: { type: String, required: true },
    floor: { type: String, default: '' },
    rooms: { type: String, default: '' },
    active_issues: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

const Location = mongoose.model('Location', locationSchema);
export default Location;
