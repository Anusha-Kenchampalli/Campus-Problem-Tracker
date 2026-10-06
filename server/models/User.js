import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    college_id: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, default: 'password' },
    role: { type: String, enum: ['student', 'admin', 'staff'], default: 'student' },
    department: { type: String, default: 'General' },
    year: { type: String, default: '3rd Year B.Tech' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
