import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { ReviewRepository } from '../../../src/repositories/review.repository';

let mockPrisma = {
  review: {
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

    mockPrisma.review.findFirst.mockReturnValue(mockReturn);

    const findFirstOrderId = { orderId: 1 };

    const findOrderData = await review;

    expect();
  });
});
