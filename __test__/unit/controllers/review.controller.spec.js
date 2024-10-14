import { jest, test } from '@jest/globals';
import { ReviewController } from '../../../src/controllers/review.controller.js';
import{CreateReview,UpdateReview,DeleteReview} from '../../../src/utils/validators/reviewValidator.js';

const mockReviewService = {
  createReview: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(), 
};
const mockNext = jest.fn();


describe('리뷰 컨트롤러 유닛 테스트', () => {

  const reviewController = new ReviewController(mockReviewService); 
  
  const mockRequest = {
    body:{},
    user:{},
  };
  
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn(),
  };
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status.mockReturnValue(mockResponse);
  });
  
  test('리뷰 작성 성공 테스트', async () => {
    const reviewCreateValidation = new CreateReview(mockRequest.body)
    const createReviewBodyParams = {
      orderId:1,
      comment: 'JMT',
      rate: 3,
    };
    
    mockRequest.body = createReviewBodyParams;
    mockRequest.user.userId = 1;

    const createReviewValue = {
      userId: 1,
      storeId: 1,
      comment: "Test Comment",
      rate: 3,
      order: {order:3},
    };
    mockReviewService.createReview.mockReturnValue(createReviewValue);

    await reviewController.createReview(mockRequest, mockResponse, mockNext);
    expect(mockReviewService.createReview).toHaveBeenCalledTimes(1);
    expect(mockReviewService.createReview).toHaveBeenCalledWith(
        mockRequest.user.userId,
        createReviewBodyParams.orderId,
        createReviewBodyParams.comment,
        createReviewBodyParams.rate,
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '리뷰가 정상적으로 작성되었습니다.',
      data: createReviewValue,
    });
  });

  test('리뷰 업데이트 성공 테스트', async () => {
const reviewUpdateValidation = new UpdateReview(mockRequest.body);
    const updateReviewRequestBodyParams = {
        reviewId: 1,
        userId: 1,
        storeId: 1,
        comment: 'JWT12341234',
        rate: 4,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
    };

    mockRequest.body = updateReviewRequestBodyParams;
    mockRequest.user = { userId: 1 };

    const updateReviewReturnValue = {
      reviewId: 1,
      userId: 1,
      storeId: 1,
      comment: 'JWT12341234',
      rate: 4,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    mockReviewService.updateReview.mockReturnValue(updateReviewReturnValue);

    await reviewController.updateReview(mockRequest, mockResponse, mockNext);
    expect(mockReviewService.updateReview).toHaveBeenCalledTimes(1);
    expect(mockReviewService.updateReview).toHaveBeenCalledWith(
        mockRequest.user.userId,
        updateReviewRequestBodyParams.reviewId,
        updateReviewRequestBodyParams.comment,
        updateReviewRequestBodyParams.rate,
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
    message: '리뷰가 수정되었습니다.',
    data: updateReviewReturnValue,
    });
  });

  test('리뷰 삭제 성공 테스트', async () => {
    
const reviewDeleteValidation = new DeleteReview(mockRequest.body);
    const deleteReviewRequestBodyParams = {
      reviewId: 1,
    };

    mockRequest.body = deleteReviewRequestBodyParams;
    mockRequest.user = { userId: 1 };

    const deleteReviewReturnValue = {
      userId: 1,
      reviewId: 1,
      storeId: 1,
      comment: 'JWT',
    };

    mockReviewService.deleteReview.mockResolvedValue(deleteReviewReturnValue);
    await reviewController.deleteReview(mockRequest, mockResponse, mockNext);
    expect(mockReviewService.deleteReview).toHaveBeenCalledTimes(1);
    expect(mockReviewService.deleteReview).toHaveBeenCalledWith(
        mockRequest.user.userId,
     deleteReviewRequestBodyParams.reviewId,
    );

  expect(mockResponse.status).toHaveBeenCalledTimes(1);
  expect(mockResponse.status).toHaveBeenCalledWith(202);

  expect(mockResponse.json).toHaveBeenCalledTimes(1);
  expect(mockResponse.json).toHaveBeenCalledWith({
    message : '리뷰가 삭제 되었습니다.',
  });
});
});