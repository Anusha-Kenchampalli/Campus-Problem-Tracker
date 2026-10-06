import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/admin/analytics', getAnalytics);

export default router;
