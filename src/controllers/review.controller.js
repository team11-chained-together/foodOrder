export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  postReview = async (req, res, next) => {
    try {
      const { storeName, comment, rate } = req.body;
      if (!storeName || !comment || !rate) {
        return res.status(400).json({ message: '' });
      }
      const createdReview = await this.reviewService.createdReview(storeName, comment, rate);
      return res.status(201).json({ message: '리뷰가 정상적으로 작성되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  updateReview = async (req, res, next) => {
    try {
      const {} = req.body;
    } catch (err) {
      next(err);
    }
  };

  deleteReview = async (req, res, next) => {
    try {
      const {} = req.body;
    } catch (err) {
      next(err);
    }
  };
}
