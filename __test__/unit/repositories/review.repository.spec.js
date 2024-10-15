import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { ReviewRepository } from '../../../src/repositories/review.repository';

let mockPrisma = {
  order: {
    findFirst: jest.fn(),
  },
  review: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  store: {
    findFirst: jest.fn(),
  },
};

let reviewRepository = new ReviewRepository(mockPrisma);

describe('리뷰 리포지토리 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('findOrderDataByOrderId 메서드 테스트 성공', async () => {
    const mockReturn = {
      orderId: 1,
    };
    mockPrisma.order.findFirst.mockReturnValue(mockReturn);

    const findOrderDataParams = { orderId: 1 };

    const findOrderData = await reviewRepository.findOrderDataByOrderId(
      findOrderDataParams.orderId,
    );

    expect(findOrderData).toEqual(mockReturn);
    expect(mockPrisma.order.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.order.findFirst).toHaveBeenCalledWith({
      where: {
        orderId: findOrderDataParams.orderId,
      },
    });
  });

  test('findReviewDataByReviewId 메서드 테스트 성공', async () => {
    const mockReturn = {
      reviewId: 1,
    };

    mockPrisma.review.findFirst.mockReturnValue(mockReturn);

    const findReviewDataParams = { reviewId: 1 };

    const findReviewData = await reviewRepository.findReviewDataByReviewId(
      findReviewDataParams.reviewId,
    );

    expect(findReviewData).toEqual(mockReturn);
    expect(mockPrisma.review.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.review.findFirst).toHaveBeenCalledWith({
      where: {
        reviewId: findReviewDataParams.reviewId,
      },
    });
  });

  test('findStoreData 메서드 테스트 성공', async () => {
    const mockReturn = {
      reviewId: 1,
    };

    mockPrisma.store.findFirst.mockReturnValue(mockReturn);

    const findStoreDataParams = { storeId: 1 };

    const findStoreData = await reviewRepository.findStoreData(findStoreDataParams.storeId);

    expect(findStoreData).toEqual(mockReturn);
    expect(mockPrisma.store.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.store.findFirst).toHaveBeenCalledWith({
      where: {
        storeId: findStoreDataParams.storeId,
      },
    });
  });

  test('findReviewData 메서드 테스트 성공', async () => {
    const mockReturn = {
      storeId: 1,
    };

    mockPrisma.review.findMany.mockReturnValue(mockReturn);

    const findReviewDataParams = { storeId: 1 };

    const findReviewData = await reviewRepository.findReviewData(findReviewDataParams.storeId);

    expect(findReviewData).toEqual(mockReturn);
    expect(mockPrisma.review.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrisma.review.findMany).toHaveBeenCalledWith({
      where: {
        storeId: findReviewDataParams.storeId,
      },
    });
  });

  test('findMyReviewData 메서드 테스트 성공', async () => {
    const mockReturn = {
      userId: 1,
    };

    mockPrisma.review.findMany.mockReturnValue(mockReturn);

    const findMyReviewDataParams = { userId: 1 };
    const findMyReviewData = await reviewRepository.findMyReviewData(findMyReviewDataParams.userId);

    expect(findMyReviewData).toEqual(mockReturn);
    expect(mockPrisma.review.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrisma.review.findMany).toHaveBeenCalledWith({
      where: {
        userId: findMyReviewDataParams.userId,
      },
    });
  });

  test('createReview 메서드 테스트 성공', async () => {
    const mockReturn = {
      userId: 1,
      storeId: 2,
      orderId: 3,
      comment: 'comment',
      rate: 4,
    };

    mockPrisma.review.create.mockReturnValue(mockReturn);

    const createReviewParams = {
      userId: 1,
      storeId: 2,
      orderId: 3,
      comment: 'comment',
      rate: 4,
    };

    const createReview = await reviewRepository.createReview(
      createReviewParams.userId,
      createReviewParams.storeId,
      createReviewParams.orderId,
      createReviewParams.comment,
      createReviewParams.rate,
    );

    expect(createReview).toEqual(mockReturn);
    expect(mockPrisma.review.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.review.create).toHaveBeenCalledWith({
      data: {
        userId: createReviewParams.userId,
        storeId: createReviewParams.storeId,
        orderId: createReviewParams.orderId,
        comment: createReviewParams.comment,
        rate: createReviewParams.rate,
      },
    });
  });

  test('updateReview 메서드 테스트 성공', async () => {
    const mockReturn = {
      reviewId: 1,
      comment: 'comment',
      rate: 2,
    };

    mockPrisma.review.update.mockReturnValue(mockReturn);

    const updateReviewParams = {
      reviewId: 1,
      comment: 'comment',
      rate: 2,
    };

    const updateReview = await reviewRepository.updateReview(
      updateReviewParams.reviewId,
      updateReviewParams.comment,
      updateReviewParams.rate,
    );

    expect(updateReview).toEqual(mockReturn);
    expect(mockPrisma.review.update).toHaveBeenCalledTimes(1);
    expect(mockPrisma.review.update).toHaveBeenCalledWith({
      where: { reviewId: updateReviewParams.reviewId },
      data: {
        comment: updateReviewParams.comment,
        rate: updateReviewParams.rate,
      },
    });
  });

  test('deleteReview 메서드 테스트 성공', async () => {
    const mockReturn = {
      reviewId: 1,
    };

    mockPrisma.review.delete.mockReturnValue(mockReturn);

    const deleteReviewParams = {
      reviewId: 1,
    };

    const deleteReview = await reviewRepository.deleteReview(deleteReviewParams.reviewId);

    expect(deleteReview).toEqual(mockReturn);
    expect(mockPrisma.review.delete).toHaveBeenCalledTimes(1);
    expect(mockPrisma.review.delete).toHaveBeenCalledWith({
      where: { reviewId: deleteReviewParams.reviewId },
    });
  });
});
