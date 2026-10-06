import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    notif_id: { type: String, required: true, unique: true },
    target: { type: String, enum: ['ADMIN', 'STUDENT'], default: 'STUDENT' },
    user_id: { type: String, default: null }, // for student notifications
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    type: { type: String, default: 'INFO' }, // CRITICAL, INFO, SUCCESS, WARNING, FEEDBACK
    ticket_id: { type: String, default: null }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
