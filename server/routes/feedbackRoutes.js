import express from 'express';
import { submitFeedback, getAdminFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/problems/:id/feedback', submitFeedback);
router.get('/admin/feedback', getAdminFeedback);

export default router;
