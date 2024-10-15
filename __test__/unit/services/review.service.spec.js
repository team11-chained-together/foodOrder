import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { ReviewService } from '../../../src/services/review.service';

let mockReviewRepository = {
  findOrderDataByOrderId: jest.fn(),
  createReview: jest.fn(),
};

let reviewService = new ReviewService(mockReviewRepository);

describe('리뷰 서비스 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  // TODO : 내일 일어나자마자 테스트 돌려서 발생하는 에러 들고가서 튜터님한테 물어보기 왜 에러가 리뷰 서비스 파일에 뜨는건지
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

    const createReview = await reviewService.createReview(1, 2, 'comment', 3);
    mockReviewRepository.createReview.mockReturnValue(sampleCreatedReviewData);

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
});
