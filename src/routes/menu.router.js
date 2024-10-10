import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { MenuController } from '../controllers/menu.controller.js';
import { MenuService } from '../services/menu.service.js';
import { MenuRepository } from '../repositories/menu.repository.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

const menuRepository = new MenuRepository(prisma);
const menuService = new MenuService(menuRepository);
const menuController = new MenuController(menuService);

router.post('/owner/menu', authMiddleware, menuController.createMenu);
router.put('/owner/menu', authMiddleware, menuController.updateMenu);
router.delete('/owner/menu', authMiddleware, menuController.deleteMenu);

export default router;
