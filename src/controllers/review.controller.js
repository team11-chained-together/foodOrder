export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  createReview = async (req, res, next) => {
    try {
      const userId = req.user.userId;

      const { orderId, comment, rate } = req.body;

      if (!comment || !rate) {
        return res.status(400).json({ message: ' comment, rate를 작성해주세요.' });
      }

      if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: '가게 리뷰 점수는 1 ~ 5점을 입력해주세요.' });
      }

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
      const { reviewId, comment, rate } = req.body;
      if (!reviewId) {
        return res.status(400).json({ message: '해당하는 리뷰아이디를 입력해 주세요.' });
      }

      const updateReview = await this.reviewService.updateReview(userId, reviewId, comment, rate);
      return res.status(201).json({ message: '리뷰가 수정되었습니다.', data: updateReview });
    } catch (err) {
      next(err);
    }
  };

  deleteReview = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const { reviewId } = req.body;

      if (!reviewId) {
        return res.status(400).json({ message: 'reviewId를 입력해 주세요' });
      }

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
