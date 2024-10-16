import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { ReviewService } from '../../../src/services/review.service';

let mockReviewRepository = {
  findOrderDataByOrderId: jest.fn(),
  createReview: jest.fn(),
  findReviewDataByReviewId: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
};

let reviewService = new ReviewService(mockReviewRepository);

describe('리뷰 서비스 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('리뷰 생성 성공 테스트', async () => {
    const sampleOrderData = {
      orderId: 1,
      storeId: 1,
      userId: 1,
      statement: 'DELIVERY_COMPLETE',
      totalPrice: 10000,
    };

    const sampleCreatedReviewData = {
      userId: 2,
      storeId: 1,
      comment: 'comment2',
      rate: 4,
      orderId: 3,
    };

    mockReviewRepository.findOrderDataByOrderId.mockReturnValue(sampleOrderData);
    mockReviewRepository.createReview.mockReturnValue(sampleCreatedReviewData);

    const createReview = await reviewService.createReview(1, 2, 'comment', 3);

    expect(mockReviewRepository.createReview).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.createReview).toHaveBeenCalledWith(
      1,
      sampleOrderData.storeId,
      'comment',
      3,
      2,
    );

    expect(createReview).toEqual({
      userId: sampleCreatedReviewData.userId,
      storeId: sampleCreatedReviewData.storeId,
      comment: sampleCreatedReviewData.comment,
      rate: sampleCreatedReviewData.rate,
      order: sampleOrderData,
    });
  });

  test('리뷰 업데이트 성공 테스트', async () => {
    const sampleUpdateReview = {
      reviewId: 1,
      userId: 1,
      storeId: 1,
      comment: 'comment',
      rate: 2,
      updatedAt: '2024-09-28T09:35:43.410Z',
    };

    const sampleReviewData = {
      reviewId: 1,
      userId: 1,
      storeId: 1,
      orderId: 1,
      comment: 'comment',
      rate: 2,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };

    mockReviewRepository.findReviewDataByReviewId.mockReturnValue(sampleReviewData);
    mockReviewRepository.updateReview.mockReturnValue(sampleUpdateReview);
    const updateReview = await reviewService.updateReview(1, 1, 'comment', 2);

    expect(mockReviewRepository.updateReview).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.updateReview).toHaveBeenCalledWith(1, 'comment', 2);

    expect(updateReview).toEqual({
      reviewId: sampleReviewData.reviewId,
      userId: sampleReviewData.userId,
      storeId: sampleReviewData.storeId,
      comment: sampleReviewData.comment,
      rate: sampleReviewData.rate,
      updatedAt: sampleReviewData.updatedAt,
    });
  });

  test('리뷰 삭제 성공 테스트', async () => {
    const sampleFindReviewData = {
      reviewId: 1,
      userId: 1,
      storeId: 1,
      orderId: 1,
      comment: 'comment',
      rate: 2,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };

    const sampleDeletedReview = {
      reviewId: 1,
      orderId: 1,
      comment: 'comment',
      rate: 2,
      createdAt: '2024-09-28T09:35:43.410Z',
    };

    mockReviewRepository.findReviewDataByReviewId.mockReturnValue(sampleFindReviewData);
    mockReviewRepository.deleteReview.mockReturnValue(sampleDeletedReview);

    const deleteReview = await reviewService.deleteReview(1, 1);

    expect(deleteReview).toEqual({
      deletedReview: {
        reviewId: sampleDeletedReview.reviewId,
        orderId: sampleDeletedReview.orderId,
        comment: sampleDeletedReview.comment,
        rate: sampleDeletedReview.rate,
        createdAt: sampleDeletedReview.createdAt,
      },
    });
  });

  test('가게 리뷰 목록 조회 선공 테스트', async () => {
    const sampleFindStoreData = {
      storeId: 1,
      userId: 1,
      storeName: 'storeName',
      location: 'location',
      foodType: 'foodType',
      sales: 5000,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };

    const sampleGetReviewData = {};
  });
});
