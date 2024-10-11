export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  createReview = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const storeId = req.params;
      const isOwner = req.user.isOwner;
      const orderId = req.order.orderId;

      const { comment, rate } = req.body;

      if (!comment || !rate) {
        return res.status(400).json({ message: ' comment, rate를 작성해주세요.' });
      }

      const createdReview = await this.reviewService.createReview( userId,storeId,comment, rate);

      return res.status(201).json({
        message: '리뷰가 정상적으로 작성되었습니다.',
        data: createdReview,
      });
    } catch (err) {
      next(err);
    }
  };

    putReview = async (req, res, next) => {
      try {
        const userId = req.user.userId;
        const { reviewId,comment, rate } = req.body;
        if (!comment || !rate) {
          return res.status(400).json({ message: 'comment ,rate 를 작성해주세요.' });
        }
        
        const updateReview = await this.reviewService.updateReview(userId,reviewId,comment, rate);
        return res.status(201).json({ message: '리뷰가 수정되었습니다.', data: updateReview });
      } catch (err) {
        next(err);
      }
    };

    deleteReview = async (req, res, next) => {
      try {
        const  userId  = req.user.userId;
        const {reviewId} = req.body;

        if (!reviewId) {
          return res.status(400).json({ message: '존재하지 않는 리뷰입니다.' });
        }

        await this.reviewService.deleteReview(userId,reviewId);
        return res.status(202).json({ message: '리뷰가 삭제 되었습니다.' });
      } catch (err) {
        next(err);
      }
    };
}
