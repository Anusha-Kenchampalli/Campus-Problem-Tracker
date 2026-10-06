import express from 'express';
import { getDepartments, createDepartment, updateDepartment } from '../controllers/departmentController.js';

const router = express.Router();

router.get('/departments', getDepartments);
router.post('/departments', createDepartment);
router.put('/departments/:id', updateDepartment);

export default router;
