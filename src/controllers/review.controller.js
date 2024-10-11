export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  postReview = async (req, res, next) => {
    try {
      // const sotreId = req.params;
      const userId = req.user.userId;
      const isOwner = req.user.isOwner;

      const { sotreId, comment, rate } = req.body;

      if (!comment || !rate) {
        return res.status(400).json({ message: ' comment, rate를 작성해주세요.' });
      }

      if (isOwner === true) {
        return res.status(401).json({ message: '사장님은 리뷰 못해요!' });
      }

      const createdReview = await this.reviewService.createReview(sotreId, comment, rate);

      return res.status(201).json({
        message: '리뷰가 정상적으로 작성되었습니다.',
        data: createdReview,
      });
    } catch (err) {
      next(err);
    }
  };

  //   putReview = async (req, res, next) => {
  //     try {
  //       const userId = req.user.userId;
  //       const type = req.user.type;
  //       const { comment, rate } = req.body;
  //       if (!comment || !rate) {
  //         return res.status(400).json({ message: 'comment ,rate 를 작성해주세요.' });
  //       }
  //       const updateReview = await this.reviewService.updateReview(comment, rate);
  //       return res.status(201).json({ message: '리뷰가 수정되었습니다.', data: updateReview });
  //     } catch (err) {
  //       next(err);
  //     }
  //   };

  //   deleteReview = async (req, res, next) => {
  //     try {
  //       const userId = req.user.userId;
  //       const type = req.user.type;
  //       const { reviewId } = req.params;

  //       if (!reviewId) {
  //         return res.status(400).json({ message: '에러에요.' });
  //       }
  //       await this.reviewService.deleteReview(storeName);
  //       return res.status(202).json({ message: '리뷰가 삭제 되었습니다.' });
  //     } catch (err) {
  //       next(err);
  //     }
  //   };
}
