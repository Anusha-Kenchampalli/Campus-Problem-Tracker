import express from 'express';
import {
  getStudentNotifications,
  markStudentNotificationRead,
  getAdminNotifications,
  markAdminNotificationRead
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/notifications', getStudentNotifications);
router.put('/notifications/:id/read', markStudentNotificationRead);
router.get('/admin/notifications', getAdminNotifications);
router.put('/admin/notifications/:id/read', markAdminNotificationRead);

export default router;
