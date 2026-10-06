import express from 'express';
import {
  createProblem,
  getProblems,
  getProblemById,
  updatePriority,
  assignProblem,
  updateStatus
} from '../controllers/problemController.js';

const router = express.Router();

// Student routes
router.post('/problems', createProblem);
router.get('/problems', getProblems);
router.get('/problems/:id', getProblemById);

// Admin routes
router.get('/admin/problems', getProblems);
router.get('/admin/problems/:id', getProblemById);
router.put('/admin/problems/:id/priority', updatePriority);
router.put('/admin/problems/:id/assign', assignProblem);
router.put('/admin/problems/:id/status', updateStatus);

export default router;
