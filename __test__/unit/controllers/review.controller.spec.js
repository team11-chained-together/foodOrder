import{beforeAll,jest,test} from '@jest/globals';
import{ReviewController} from '../../../src/controllers/review.controller.js';

const mockReviewService ={
    createReview : jest.fn(),
};

const mockRequest = {
    body : jest.fn(),
};

const mockResponse ={
    json:jest.fn(),
    status:jest.fn(),
};

const mockNext = jest.fn();

const reviewController = new ReviewController(mockReviewService);

describe('Review Controller unit test', ()=>{
    beforeEach(()=>{
        jest.resetAllMocks();

        mockResponse.status.mockReturnValue(mockResponse);
    });

    test('createReview Method By Success', async ()=>{
        const createReviewBodyParams = {
            comment:'JMT',
            rate:3
        };
        mockRequest.body = createReviewBodyParams;

        const createReviewValue = {
          reviewId:1,
          userId:1,
          storeId:1,
          ...createReviewValue,
          createdAt:updateReveiw.createdAt,
          updatedAt:updateReveiw.updatedAt,
        }
        mockReviewService.createReview.mockReturnValue(createReviewValue);

        await reviewController.createReview(mockRequest,mockResponse,mockNext);
        expect(mockReviewService.createReview).toHaveBeenCalledTimes(1);
        expect(mockReviewService.createReview).toHaveBeenCallWith({
            data : createdReview
        });
        
        expect(mockRequest.status).toHaveBeenCalledTimes(1);
        expect(mockRequest.status).toHaveBeenCallWith(201);

        expect(mockResponse.json).toHaveBeenCallWith(1);
    })
})