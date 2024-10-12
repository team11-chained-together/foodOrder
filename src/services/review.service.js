export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  createReview = async (userId, orderId, comment, rate) => {
    const checkOrderData = await this.reviewRepository.findOrderDataByOrderId(orderId);

    if (!checkOrderData) {
      throw new Error('주문 내역이 없습니다.');
    }

    if (checkOrderData.statement !== 'DELIVERY_COMPLETE') {
      throw new Error('배송이 완료되지 않았습니다.');
    }

    if (checkOrderData.reviewType === false) {
      throw new Error('이미 리뷰를 작성 하셨습니다.');
    }

    const createdReview = await this.reviewRepository.createReview(
      userId,
      checkOrderData.storeId,
      comment,
      rate,
      orderId,
    );
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

  deleteReview = async (orderId, reviewId) => {
    const findReviewData = await this.reviewRepository.findOrderDataByOrderId(orderId);

    if (findReviewData.reviewId !== reviewId) {
      throw new Error('해당하는 리뷰는 수정할 수 없습니다.');
    }

    const deletedReview = await this.reviewRepository.deleteReview(reviewId);

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
