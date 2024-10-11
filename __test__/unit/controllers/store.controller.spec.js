import { expect, jest, test } from '@jest/globals';
import { StoreController } from '../../../src/controllers/store.controller';
import { query } from 'express';

const mockStoreService = {
  searchStores: jest.fn(),
  createStore: jest.fn(),
  updateStore: jest.fn(),
  deleteStore: jest.fn(),
  getStore: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  query:{},
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
  
 // 검색 기능 컨트롤러 부분
 test('searchStores Method By success',async()=>{

    const searchQuery = 'Test search';
    const sampleStore ={
      storeId: 1,
      storeName: 'Test StoreName',
      foodType: 'Test Food Type',
      location: '전북',
    };

    mockRequest.query = {search: searchQuery};

    mockStoreService.searchStores.mockReturnValue([sampleStore]);

    await storeController.searchStores(mockRequest,mockResponse,mockNext);

    expect(mockStoreService.searchStores).toHaveBeenCalledTimes(1);
    expect(mockStoreService.searchStores).toHaveBeenCalledWith(searchQuery);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: [sampleStore] });
 });

  /** Create Store Controller Test */
  test('createStore Method by Success', async () => {
    const createStoreRequestBodyParams = {
      userId: 1,
      storeName: 'Store_name_Success',
      foodType: 'Food_Type_Success',
      type: true,
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

  /** Update Store Controller Test */
  test('updateStore Method by Success', async () => {
    const updateStoreRequestBodyParams = {
      userId: 1,
      storeName: 'New_Store_name_Success',
      foodType: 'New_Food_Type_Success',
      type: true,
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

  /** Delete Store Controller Test */
  test('deleteStore Method by Success', async () => {
    const deleteStoreRequestBodyParams = {
      userId: 1,
      storeName: 'Delete Store Name',
      type: true,
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

  /** Get Store Controller Test */
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

  /** Created Store Controller Fail Test */
  test('createStore Method By Invalid Params Error', async () => {
    mockRequest.body = {
      userId: 1,
      storeName: 'StoreName_InvalidParamsError',
      type: true,
    };

    await storeController.createStore(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error('InvalidParamsError'));
  });

  /** 사장님이 아닐때 발생하는 에러 Test*/
  test('Store Method By Type Error', async () => {
    mockRequest.body = {
      userId: 1,
      storeName: 'storeName',
      foodType: 'foodType',
      type: false,
    };

    await storeController.createStore(mockRequest, mockResponse, mockNext);
    await storeController.updateStore(mockRequest, mockResponse, mockNext);
    await storeController.deleteStore(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error('해당하는 유저는 사장님이 아닙니다.'));
  });
});
