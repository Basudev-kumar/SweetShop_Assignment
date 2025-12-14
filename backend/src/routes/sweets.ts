// src/routes/sweets.ts
import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  createSweet,
  getSweets,
  getSweet,
  updateSweet,
  deleteSweet,
} from '../controllers/sweetController';

const router = Router();

router
  .route('/')
  .get(getSweets)
  .post(protect, authorize('admin'), createSweet);

router
  .route('/:id')
  .get(getSweet)
  .put(protect, authorize('admin'), updateSweet)
  .delete(protect, authorize('admin'), deleteSweet);

export default router;