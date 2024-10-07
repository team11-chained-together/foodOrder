import { jest } from '@jest/globals';
import { StoreController } from '../../../src/controllers/store.controller';

const mockStoreService = {
  createStore: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const storeController = new StoreController(mockStoreService);

describe('Store Controller Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('createStore Method by Success', async () => {
    const createStoreRequestBodyParams = {
      storeName: 'Store_name_Success',
      foodType: 'Food_Type_Success',
    };
    mockRequest.body = createStoreRequestBodyParams;

    // Service 계층에서 구현된 createStore 메서드를 실행했을때, 반환되는 데이터 형식
    const createdStoreReturnValue = {
      storeId: 1,
      ...createStoreRequestBodyParams,
      createdAt: new Date().toString,
    };

    mockStoreService.createStore.mockReturnValue(createdStoreReturnValue);

    const createdStore = await storeController.createStore(mockRequest, mockResponse, mockNext);

    expect(mockStoreService.createStore).toHaveBeenCalledTimes(1);
    expect(mockStoreService.createStore).toHaveBeenCalledWith(
      createStoreRequestBodyParams.storeName,
      createStoreRequestBodyParams.foodType,
    );

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createdStoreReturnValue,
    });
  });
});
