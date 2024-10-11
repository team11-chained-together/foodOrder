import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { ReviewController } from '../controllers/review.controller.js';
import { ReviewService } from '../services/review.service.js';
import { ReviewRepository } from '../repositories/review.repository.js';

const router = express.Router();

const reviewRepository = new ReviewRepository(prisma);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

router.post('/reviews/:storeId', reviewController.createReview);
router.put('/reviews', reviewController.putReview);
router.delete('/reviews', reviewController.deleteReview);

export default router;
