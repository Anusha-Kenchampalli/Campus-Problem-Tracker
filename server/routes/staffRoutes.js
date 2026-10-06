import express from 'express';
import { getStaff, createStaff, updateStaff } from '../controllers/staffController.js';

const router = express.Router();

router.get('/staff', getStaff);
router.post('/staff', createStaff);
router.put('/staff/:id', updateStaff);

export default router;
