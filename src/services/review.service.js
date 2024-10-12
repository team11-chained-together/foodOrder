export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  createReview = async (userId, storeId, comment, rate) => {
    const checkOrderData = await this.reviewRepository.findOrderDataByUserId(userId, storeId);
    if (!checkOrderData) {
      throw new Error('주문 내역이 없습니다.');
    }

    const createdReview = await this.reviewRepository.createReview(userId, storeId, comment, rate);
    return {
      createdReview,
      order: checkOrderData,
    };
  };

  updateReview = async (userId, reviewId, comment, rate) => {
    const findReviewData = await this.reviewRepository.findReviewDataByUserId(userId);

    if (findReviewData.reviewId !== reviewId) {
      throw new Error('해당하는 리뷰는 수정할 수 없습니다');
    }

    const updateReview = await this.reviewRepository.updateReview(reviewId, comment, rate);

    return {
      reviewId: updateReview.reviewId,
      userId: updateReview.userId,
      storeId: updateReview.storeId,
      comment: updateReview.comment,
      rate: updateReview.rate,
      updatedAt: updateReview.updatedAt,
    };
  };

  deleteReview = async (userId, reviewId) => {
    const findReviewData = await this.reviewRepository.findReviewDataByUserId(userId);

    if (findReviewData.reviewId !== reviewId) {
      throw new Error('해당하는 리뷰는 수정할 수 없습니다.');
    }

    const deletedReview = await this.reviewRepository.deleteReview(userId, reviewId);

    return {
      deletedReview,
    };
  };

  getReview = async (storeId) => {
    const getReviewData = await this.reviewRepository.findReviewData(storeId);

    return {
      getReviewData,
    };
  };

  getMyReview = async (userId) => {
    const getMyReviewData = await this.reviewRepository.findMyReviewData(userId);

    return { getMyReviewData };
  };
}
