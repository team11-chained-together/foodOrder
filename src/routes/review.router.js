import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { Prisma } from '@prisma/client';
import { ReviewController } from '../controllers/review.controller.js';
import { ReviewService } from '../services/review.service.js';
import { ReviewRepository } from '../repositories/review.repository.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

const reviewRepository = new ReviewRepository(prisma, Prisma);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

router.post('/reviews', authMiddleware, reviewController.createReview);
router.put('/reviews', authMiddleware, reviewController.updateReview);
router.delete('/reviews', authMiddleware, reviewController.deleteReview);
router.get('/reviews', reviewController.getReview);
router.get('/reviews/my', authMiddleware, reviewController.getMyReview);

export default router;
