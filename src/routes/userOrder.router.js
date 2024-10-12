import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { Prisma } from '@prisma/client';
import { UserOrderController } from '../controllers/userOrder.controller.js';
import { UserOrderService } from '../services/userOrder.service.js';
import { UserOrderRepository } from '../repositories/userOrder.repository.js';
import { MenuRepository } from '../repositories/menu.repository.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

const menuRepository = new MenuRepository(prisma);
const userOrderRepository = new UserOrderRepository(prisma, Prisma);
const userOrderService = new UserOrderService(userOrderRepository, menuRepository);
const userOrderController = new UserOrderController(userOrderService);

router.post('/orders', authMiddleware, userOrderController.createUserOrder);

export default router;
