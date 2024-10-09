import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { MenuController } from '../controllers/menu.controller.js';
import { MenuService } from '../services/menu.service.js';
import { MenuRepository } from '../repositories/menu.repository.js';

const router = express.Router();

const menuRepository = new MenuRepository(prisma);
const menuService = new MenuService(menuRepository);
const menuController = new MenuController(menuService);

router.post('/owner/menu', menuController.createMenu);
router.put('/owner/menu', menuController.updateMenu);
router.delete('/owner/menu', menuController.deleteMenu);

export default router;
