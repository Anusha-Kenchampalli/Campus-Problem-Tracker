import Notification from '../models/Notification.js';

export const getStudentNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ target: 'STUDENT' }).sort({ createdAt: -1 });
    return res.json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const markStudentNotificationRead = async (req, res) => {
  try {
    const notif = await Notification.findOneAndUpdate(
      { notif_id: req.params.id },
      { read: true },
      { new: true }
    );
    const notifications = await Notification.find({ target: 'STUDENT' }).sort({ createdAt: -1 });
    return res.json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ target: 'ADMIN' }).sort({ createdAt: -1 });
    return res.json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const markAdminNotificationRead = async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { notif_id: req.params.id },
      { read: true }
    );
    const notifications = await Notification.find({ target: 'ADMIN' }).sort({ createdAt: -1 });
    return res.json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
