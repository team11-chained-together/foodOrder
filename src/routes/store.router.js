import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { StoreController } from '../controllers/store.controller.js';
import { StoreService } from '../services/store.service.js';
import { StoreRepository } from '../repositories/store.repository.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

const storeRepository = new StoreRepository(prisma);
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);

router.post('/owner/store', authMiddleware, storeController.createStore);
router.put('/owner/store', authMiddleware, storeController.updateStore);
router.delete('/owner/store', authMiddleware, storeController.deleteStore);
router.get('/owner/store', storeController.getStore);

router.get('/stores/search',storeController.searchStores);

export default router;
