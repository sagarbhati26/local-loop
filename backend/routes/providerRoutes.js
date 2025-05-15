import express from 'express';
import {
  createService,
  getMyServices,
  updateService,
  deleteService,
} from '../controllers/providerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/services', protect, createService);
router.get('/my-services', protect, getMyServices);
router.put('/services/:id', protect, updateService);
router.delete('/services/:id', protect, deleteService);

export default router;