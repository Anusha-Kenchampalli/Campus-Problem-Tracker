import { getCollection, saveCollection } from '../config/jsonStore.js';

export const getStudentNotifications = async (req, res) => {
  try {
    const notifications = getCollection('student_notifications');
    return res.json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const markStudentNotificationRead = async (req, res) => {
  try {
    const notifications = getCollection('student_notifications');
    const idx = notifications.findIndex(n => n.id === req.params.id);
    if (idx !== -1) {
      notifications[idx].read = true;
      saveCollection('student_notifications', notifications);
    }
    return res.json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminNotifications = async (req, res) => {
  try {
    const notifications = getCollection('admin_notifications');
    return res.json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const markAdminNotificationRead = async (req, res) => {
  try {
    const notifications = getCollection('admin_notifications');
    const idx = notifications.findIndex(n => n.id === req.params.id);
    if (idx !== -1) {
      notifications[idx].read = true;
      saveCollection('admin_notifications', notifications);
    }
    return res.json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
