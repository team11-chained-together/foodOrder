import { expect, jest, test } from '@jest/globals';
import { StoreController } from '../../../src/controllers/store.controller';
import { query } from 'express';
import cookieParser from 'cookie-parser';
import {
  StoreValidation,
  UpdateStoreValidation,
  DeleteStoreValidation,
  SearchStoreValidation,
} from '../../../src/utils/validators/storeValidator'

const mockStoreService = {
  searchStores: jest.fn(),
  createStore: jest.fn(),
  updateStore: jest.fn(),
  deleteStore: jest.fn(),
  getStore: jest.fn(),
};

const mockNext = jest.fn();

// const searchStoreValidation= new SearchStoreValidation(mockRequest.query) 


describe('스토어 컨트롤러 유닛 테스트', () => {

  const storeController = new StoreController(mockStoreService);

  const mockRequest = {
    body: {},
    user: {},
    query: {},
  };

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('가게목록 조회 성공 테스트', async () => {
    const searchQuery = 'Test search';
    const sampleStore = {
      storeId: 1,
      storeName: 'Test StoreName',
      foodType: 'Test Food Type',
      location: '전북',
    };

    mockRequest.query = { search: searchQuery };


    mockStoreService.searchStores.mockResolvedValue([sampleStore]);//sampleStore가 비동기함수이면 mockReturnValue 대신 mockResolvedValue 사용해야함

    await storeController.searchStores(mockRequest, mockResponse, mockNext);

    expect(mockStoreService.searchStores).toHaveBeenCalledTimes(1);
    expect(mockStoreService.searchStores).toHaveBeenCalledWith(searchQuery);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: [sampleStore] });
  });

  test('가게 만들기 성공 테스트', async () => {
    const createdStoreUser = { userId: 1, isOwner: true };
    const createStoreRequestBodyParams = {
      userId:1,
      storeId:1,
      storeName: 'Store_name_Success',
      location: 'Store Location',
      foodType: 'Food_Type_Success',
    };
    mockRequest.user = createdStoreUser;
    mockRequest.body = createStoreRequestBodyParams;

    // Service 계층에서 구현된 createStore 메서드를 실행했을때, 반환되는 데이터 형식
    const createdStoreReturnValue = {
      storeId: 1,
      createdStoreUser,
      ...createStoreRequestBodyParams,
      createdAt: new Date().toString,
    };

    mockStoreService.createStore.mockReturnValue(createdStoreReturnValue);

    await storeController.createStore(mockRequest, mockResponse, mockNext);

    expect(mockStoreService.createStore).toHaveBeenCalledTimes(1);
    expect(mockStoreService.createStore).toHaveBeenCalledWith(
      createdStoreUser.userId,
      createStoreRequestBodyParams.storeName,
      createStoreRequestBodyParams.location,
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
  test('스토어 업데이트 테스트 성공', async () => {
    const storeUpdateValidation = new UpdateStoreValidation(mockRequest.body)
    const updateStoreRequestBodyParams = {
      userId: 1,
      isOwner : true,
      storeName: 'New_Store_name_Success',
      foodType: 'New_Food_Type_Success',
      location:'TestLocation',
    };

    mockRequest.user = {
      userId:1,
      isOwner: true,
    };

    mockRequest.body = updateStoreRequestBodyParams;

    // Service 계층에서 구현된 updateStore 메서드를 실행했을때, 반환되는 데이터 형식
    const updatedStoreReturnValue = {
      ...updateStoreRequestBodyParams,
      storeId:1,
      sales:0,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    mockStoreService.updateStore.mockReturnValue(updatedStoreReturnValue);

    await storeController.updateStore(mockRequest, mockResponse, mockNext);

    expect(mockStoreService.updateStore).toHaveBeenCalledTimes(1);
    expect(mockStoreService.updateStore).toHaveBeenCalledWith(
      mockRequest.user.userId,
      updateStoreRequestBodyParams.storeName,
      updateStoreRequestBodyParams.foodType,
      updateStoreRequestBodyParams.location,
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
  test('가게 삭제 테스트 성공', async () => {
    const deleteStoreRequestBodyParams = {
      userId: 1,
      storeId: 1,
    };

    mockRequest.user ={
      userId:1,
      isOwner:true,
    }

    mockRequest.body = deleteStoreRequestBodyParams;

    const deletedStoreReturnValue = {
      ...deleteStoreRequestBodyParams,
    };

    mockStoreService.deleteStore.mockReturnValue(deletedStoreReturnValue);

    await storeController.deleteStore(mockRequest, mockResponse, mockNext);
    expect(mockStoreService.deleteStore).toHaveBeenCalledTimes(1);
    expect(mockStoreService.deleteStore).toHaveBeenCalledWith(
      deleteStoreRequestBodyParams.userId,
      deleteStoreRequestBodyParams.storeId,
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
  test('스토어 목록 조회 테스트 성공', async () => {
    
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
  test('스토어 생성 시 값이 없으면 에러 발생', async () => {
    mockRequest.body = {
      userId: 1,
      storeName: 'StoreName_InvalidParamsError',
      isOwner: true,
    };

    await storeController.createStore(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error('InvalidParamsError'));
  });

  test('가게 사장님이 아닐떄 오류 발생', async () => {
    mockRequest.user = {
      userId: 1,
      isOwner: false,
    };
    mockRequest.body = {
      storeName: 'storeName',
      foodType: 'foodType',
      isOwner: false,
    };

    await storeController.createStore(mockRequest, mockResponse, mockNext);
    await storeController.updateStore(mockRequest, mockResponse, mockNext);
    await storeController.deleteStore(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error('해당하는 유저는 사장님이 아닙니다.'));
  });
});
