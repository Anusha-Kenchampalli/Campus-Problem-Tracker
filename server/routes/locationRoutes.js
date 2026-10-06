import express from 'express';
import { getLocations, createLocation, updateLocation } from '../controllers/locationController.js';

const router = express.Router();

router.get('/locations', getLocations);
router.post('/locations', createLocation);
router.put('/locations/:id', updateLocation);

export default router;
