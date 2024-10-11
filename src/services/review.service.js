export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  createReview = async (storeId, comment, rate) => {
    const ckeckStoreId = await this.reviewRepository.findReviewByUserIdStoreId(storeId);
    if (ckeckStoreId) {
      throw new Error('없는 가게 입니다. 다시 확인해주세요.');
    }

    const createdReview = await this.reviewRepository.createReview(
      ckeckStoreId.storeId,
      comment,
      rate,
    );
    return {
      reviewId: createdReview.reviewId,
      storeId: createdReview.storeId,
      comment: createdReview.comment,
      rate: createdReview.rate,
      order: createdReview.order,
      createdAt: createdReview.createdAt,
    };
  };

  updateReview = async (userId, reviewId, comment, rate) => {
    const findByuserId = await this.reviewRepository.findReviewByUserIdStoreId(userId);
    const review = await this.reviewRepository.findReviewById(reviewId);
    if (findByuserId.userId !== review.reviewId) {
      throw new Error('리뷰를 수정할 수 없습니다');
    }
    await this.reviewRepository.updatedReview(reviewId, comment, rate);

    const updateReview = await this.reviewRepository.findReviewById(reviewId);

    return {
      reviewId: updateReview.reviewId,
      userId: updateReview.userId,
      storeId: updateReview.storeId,
      comment: updateReview.comment,
      rate: updateReview.rate,
      createdAt: updateReview.createdAt,
      updatedAt: updateReview.updatedAt,
    };
  };

  deleteReview = async (userId, reviewId) => {
    const review = await this.reviewRepository.findReviewById(reviewId);
    //리뷰가 존재하는지 + 리뷰 작성자가 본인이 맞는지 확인
    if (review.userId !== userId) {
      throw new Error('리뷰를 삭제할 수 없습니다');
    }

    await this.reviewRepository.deleteReview(userId, reviewId);

    return {
      userId: review.userId,
      reviewId: review.reviewId,
      storeId: review.storeId,
      comment: review.comment,
    };
  };
}
