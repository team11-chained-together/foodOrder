import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { UserController } from '../controllers/user.controller.js';
import { UserService } from '../services/user.service.js';
import { UserRepository } from '../repositories/user.repository.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/signup', userController.userSignup);
router.post('/login', userController.userLogin);
router.get('/users/:userId', authMiddleware, userController.userPoint);
export default router;
