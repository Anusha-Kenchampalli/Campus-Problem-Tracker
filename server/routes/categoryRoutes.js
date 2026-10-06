import express from 'express';
import { getCategories, createCategory, updateCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);

export default router;
