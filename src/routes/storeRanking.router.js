import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { StoreRankingController } from '../controllers/storeRanking.controller.js';
import { StoreRankingService } from '../services/storeRanking.service.js';
import { StoreRankingRepository } from '../repositories/storeRanking.repository.js';
const router = express.Router();

const storeRankingRepository = new StoreRankingRepository(prisma);
const storeRankingService = new StoreRankingService(storeRankingRepository);
const storeRankingController = new StoreRankingController(storeRankingService);

router.get('/storeRanking', storeRankingController.getStoreRanking);
export default router;
