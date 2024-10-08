import { jest, test } from '@jest/globals';
import { StoreController } from '../../../src/controllers/store.controller';

const mockStoreService = {
  createStore: jest.fn(),
  updateStore: jest.fn(),
  deleteStore: jest.fn(),
  getStore: jest.fn(),
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

  /** Create Controller Test */
  test('createStore Method by Success', async () => {
    const createStoreRequestBodyParams = {
      userId: 1,
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

    await storeController.createStore(mockRequest, mockResponse, mockNext);
    expect(mockStoreService.createStore).toHaveBeenCalledTimes(1);
    expect(mockStoreService.createStore).toHaveBeenCalledWith(
      createStoreRequestBodyParams.userId,
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

  /** Update Controller Test */
  test('updateStore Method by Success', async () => {
    const updateStoreRequestBodyParams = {
      userId: 1,
      storeName: 'New_Store_name_Success',
      foodType: 'New_Food_Type_Success',
    };

    mockRequest.body = updateStoreRequestBodyParams;

    // Service 계층에서 구현된 updateStore 메서드를 실행했을때, 반환되는 데이터 형식
    const updatedStoreReturnValue = {
      ...updateStoreRequestBodyParams,
      updatedAt: new Date().toString,
    };

    mockStoreService.updateStore.mockReturnValue(updatedStoreReturnValue);

    await storeController.updateStore(mockRequest, mockResponse, mockNext);
    expect(mockStoreService.updateStore).toHaveBeenCalledTimes(1);
    expect(mockStoreService.updateStore).toHaveBeenCalledWith(
      updateStoreRequestBodyParams.userId,
      updateStoreRequestBodyParams.storeName,
      updateStoreRequestBodyParams.foodType,
    );

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: updatedStoreReturnValue,
    });
  });

  /** Delete Controller Test */
  test('deleteStore Method by Success', async () => {
    const deleteStoreRequestBodyParams = {
      userId: 1,
      storeName: 'Delete Store Name',
    };

    mockRequest.body = deleteStoreRequestBodyParams;

    const deletedStoreReturnValue = {
      ...deleteStoreRequestBodyParams,
    };

    mockStoreService.deleteStore.mockReturnValue(deletedStoreReturnValue);

    await storeController.deleteStore(mockRequest, mockResponse, mockNext);
    expect(mockStoreService.deleteStore).toHaveBeenCalledTimes(1);
    expect(mockStoreService.deleteStore).toHaveBeenCalledWith(
      deleteStoreRequestBodyParams.userId,
      deleteStoreRequestBodyParams.storeName,
    );

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '가게 삭제를 완료 하였습니다.',
      data: deletedStoreReturnValue,
    });
  });

  /** Get Controller Test */
  test('getStore Method by Success', async () => {
    const getStoreRequestBodyParams = {
      storeName: 'Get Store Name',
    };

    mockRequest.body = getStoreRequestBodyParams;

    const getStoreReturnValue = {
      ...getStoreRequestBodyParams,
    };

    mockStoreService.getStore.mockReturnValue(getStoreReturnValue);

    await storeController.getStore(mockRequest, mockResponse, mockNext);
    expect(mockStoreService.getStore).toHaveBeenCalledTimes(1);
    expect(mockStoreService.getStore).toHaveBeenCalledWith(getStoreRequestBodyParams.storeName);

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: getStoreReturnValue,
    });
  });
});
