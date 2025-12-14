// src/routes/inventory.ts
import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import { purchaseSweet, restockSweet } from '../controllers/inventoryController';

const router = Router();

router.post('/:id/purchase', protect, purchaseSweet);
router.post('/:id/restock', protect, authorize('admin'), restockSweet);

export default router;