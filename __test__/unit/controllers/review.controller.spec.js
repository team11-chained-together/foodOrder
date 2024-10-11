import { jest, test } from '@jest/globals';
import { ReviewController } from '../../../src/controllers/review.controller.js';

const mockReviewService = {
  createReview: jest.fn(),
  updateReview: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  json: jest.fn(),
  status: jest.fn(),
};

const mockNext = jest.fn();

const reviewController = new ReviewController(mockReviewService);

describe('리뷰 컨트롤러 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('리뷰 작성 성공 테스트', async () => {
    const createReviewBodyParams = {
      storeId: 1,
      comment: 'JMT',
      rate: 3,
    };
    mockRequest.body = createReviewBodyParams;

    const createReviewValue = {
      reviewId: 1,
      userId: 1,
      storeId: 1,
      ...createReviewBodyParams,
      createdAt: updateReview.createdAt,
      updatedAt: updateReview.updatedAt,
    };
    mockReviewService.createReview.mockReturnValue(createReviewValue);

    await reviewController.createReview(mockRequest, mockResponse, mockNext);
    expect(mockReviewService.createReview).toHaveBeenCalledTimes(1);
    expect(mockReviewService.createReview).toHaveBeenCallWith(
      createReviewBodyParams.reviewId,
      createReviewBodyParams.userId,
      createReviewBodyParams.storeId,
      createReviewBodyParams.comment,
      createReviewBodyParams.rate,
      createReviewBodyParams.createdAt,
      createReviewBodyParams.updatedAt,
    );

    expect(mockRequest.status).toHaveBeenCalledTimes(1);
    expect(mockRequest.status).toHaveBeenCallWith(201);

    expect(mockResponse.json).toHaveBeenCallWith(1);
    expect(mockResponse.json).toHaveBeenCallWith({
      message: '리뷰가 정상적으로 작성되었습니다.',
      data: createReviewValue,
    });
  });

  test('리뷰 업데이트 성공 테스트', async () => {
    const updateReviewRequestBodyParams = {
      reviewId: 1,
      comment: 'JWT123',
      rate: 2,
    };

    mockRequest.body = updateReviewRequestBodyParams;

    const updateReviewReturnValue = {
      reviewId: 1,
      userId: 1,
      storeId: 1,
      comment: 'JWT12341234',
      rate: 4,
      createdAt: new Date().toString,
      updatedAt: new Date().toString,
    };

    mockReviewService.updateReview.mockReturnValue(updateReviewReturnValue);

    await reviewController.putReview(mockRequest, mockResponse, mockNext);
    expect(mockReviewService.updateReview).toHaveBeenCalledTimes(1);
    expect(mockReviewService.updateReview).toHaveBeenCallWith(
      updateReviewRequestBodyParams.reviewId,
      updateReviewRequestBodyParams.userId,
      updateReviewRequestBodyParams.storeId,
      updateReviewRequestBodyParams.comment,
      updateReviewRequestBodyParams.rate,
      updateReviewRequestBodyParams.createdAt,
      updateReviewRequestBodyParams.updatedAt,
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCallWith(201);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCallWith({
      data: updateReviewReturnValue,
    });
  });

  test('리뷰 삭제 성공 테스트', async () => {
    const deleteReviewRequestBodyParams = {
      reviewId: 1,
    };

    mockRequest.body = deleteReviewRequestBodyParams;

    const deleteReviewReturnValue = {
      userId: 1,
      reviewId: 1,
      storeId: 1,
      comment: 'JWT',
    };

    mockReviewService.deleteReview.mockReturnValue(deleteReviewReturnValue);
    await reviewController.deleteReview(mockRequest, mockResponse, mockNext);
    expect(mockReviewService.deleteReview).toHaveBeenCalledTimes(1);
    expect(mockReviewService.deleteReview).toHaveBeenCallWith(
      deleteReviewRequestBodyParams.userId,
      deleteReviewRequestBodyParams.reviewId,
      deleteReviewRequestBodyParams.storeId,
      deleteReviewRequestBodyParams.comment,
    );
  });
  expect(mockResponse.status).toHaveBeenCalledTimes(1);
  expect(mockResponse.status).toHaveBeenCallWith(200);

  expect(mockResponse.json).toHaveBeenCalledTimes(1);
  expect(mockResponse.json).toHaveBeenCallWith({
    message: '삭제되었습니다.',
  });
});
