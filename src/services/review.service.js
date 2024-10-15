import {
  CreateReviewValidation,
  UpdateReviewValidation,
  DeleteReviewValidation,
  GetReviewValidation,
  GetMyReviewValidation,
} from '../utils/validators/service/reviewValidator.js';

export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  createReview = async (userId, orderId, comment, rate) => {
    const checkOrderData = await this.reviewRepository.findOrderDataByOrderId(orderId);

    const checkOrderValidation = new CreateReviewValidation(checkOrderData, userId);
    checkOrderValidation.validate();

    const createdReview = await this.reviewRepository.createReview(
      userId,
      checkOrderData.storeId,
      comment,
      rate,
      orderId,
    );
    return {
      userId: createdReview.userId,
      storeId: createdReview.storeId,
      comment: createdReview.comment,
      rate: createdReview.rate,
      order: checkOrderData,
    };
  };

  updateReview = async (userId, reviewId, comment, rate) => {
    const findReviewData = await this.reviewRepository.findReviewDataByReviewId(reviewId);

    const findReviewDataValidation = new UpdateReviewValidation(findReviewData);
    findReviewDataValidation.validate();

    const findReviewDataUserId = new UpdateReviewValidation(findReviewData.userId, userId);
    findReviewDataUserId.validate();

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
    const findReviewData = await this.reviewRepository.findReviewDataByReviewId(reviewId);
    const findReviewDataValidation = new DeleteReviewValidation(findReviewData);
    findReviewDataValidation.validate();

    const findReviewDataUserIdValidation = new DeleteReviewValidation(findReviewData, userId);
    findReviewDataUserIdValidation.validate();

    const deletedReview = await this.reviewRepository.deleteReview(reviewId);

    return {
      deletedReview,
    };
  };

  getReview = async (storeId) => {
    const findStoreData = await this.reviewRepository.findStoreData(storeId);
    const findStoreDataValidation = new GetReviewValidation(findStoreData);
    findStoreDataValidation.validate();

    const getReviewData = await this.reviewRepository.findReviewData(storeId);
    const getReviewDataValidation = new GetReviewValidation(getReviewData);
    getReviewDataValidation.validate();
    return {
      getReviewData,
    };
  };

  getMyReview = async (userId) => {
    const getMyReviewData = await this.reviewRepository.findMyReviewData(userId);
    const getMyReviewDataValidation = new GetMyReviewValidation(getMyReviewData);
    getMyReviewDataValidation.validate();

    return { getMyReviewData };
  };
}
