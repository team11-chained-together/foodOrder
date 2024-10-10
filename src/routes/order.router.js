import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { OrderController } from '../controllers/order.controller.js';
import { OrderService } from '../services/order.service.js';
import { OrderRepository } from '../repositories/order.repository.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

const orderRepository = new OrderRepository(prisma);
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

router.post('/orders', orderController.postOrder);
