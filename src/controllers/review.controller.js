import { CreateReview, UpdateReview, DeleteReview } from '../utils/validators/reviewValidator.js';

export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  createReview = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const createReview = new CreateReview(req.body);
      createReview.validate();

      const createdReview = await this.reviewService.createReview(userId, orderId, comment, rate);

      return res.status(201).json({
        message: '리뷰가 정상적으로 작성되었습니다.',
        data: createdReview,
      });
    } catch (err) {
      next(err);
    }
  };

  updateReview = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const updateReview = new UpdateReview(req.body);
      updateReview.validate();

      const updatedReview = await this.reviewService.updateReview(userId, reviewId, comment, rate);
      return res.status(201).json({ message: '리뷰가 수정되었습니다.', data: updatedReview });
    } catch (err) {
      next(err);
    }
  };

  deleteReview = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const deleteReview = new DeleteReview(req.body);
      deleteReview.validate();

      await this.reviewService.deleteReview(userId, reviewId);
      return res.status(202).json({ message: '리뷰가 삭제 되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  getReview = async (req, res, next) => {
    try {
      const { storeId } = req.body;
      const review = await this.reviewService.getReview(storeId);

      return res.status(201).json({ data: review });
    } catch (err) {
      next(err);
    }
  };

  getMyReview = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const review = await this.reviewService.getMyReview(userId);

      return res.status(201).json({ data: review });
    } catch (err) {
      next(err);
    }
  };
}
