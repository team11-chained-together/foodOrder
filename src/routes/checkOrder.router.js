import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { CheckOrderController } from '../controllers/checkOrder.controller.js';
import { CheckOrderService } from '../services/checkOrder.service.js';
import { CheckOrderRepository } from '../repositories/checkOrder.repository.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

const checkOrderRepository = new CheckOrderRepository(prisma);
const checkOrderService = new CheckOrderService(checkOrderRepository);
const checkOrderController = new CheckOrderController(checkOrderService);

router.get('/owner/checkOrder', authMiddleware, checkOrderController.checkOrder);
router.put(
  '/owner/updateOrderStatement',
  authMiddleware,
  checkOrderController.updateOrderStatement,
);

export default router;
