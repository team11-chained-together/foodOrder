import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { StoreService } from '../../../src/services/store.service.js';

let mockStoreRepository = {
  createStore: jest.fn(),
  updateStore: jest.fn(),
  deleteStore: jest.fn(),
  findStoreByUserId: jest.fn(),
  findStoreByStoreName: jest.fn(),
  findMenuByStoreId: jest.fn(),
  searchStores: jest.fn(),
};

let storeService = new StoreService(mockStoreRepository);

describe('스토어 서비스 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('스토어 검색 성공 테스트', async () => {
    const sampleStore = {
      storeId: 1,
      userId: 1,
      storeName: 'Test StoreName',
      foodType: 'Test Food Type',
      location: '전북',
      sales: 100000,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };

    mockStoreRepository.searchStores.mockReturnValue([sampleStore]);
    const searchedStores = await storeService.searchStores('Test search');

    expect(mockStoreRepository.searchStores).toHaveBeenCalledTimes(1);
    expect(mockStoreRepository.searchStores).toHaveBeenCalledWith('Test search');
    expect(searchedStores).toEqual([sampleStore]);
  });

  test('스토어 생성 성공 테스트', async () => {
    // 반환값 설정
    const sampleStore = {
      storeId: 1,
      userId: 1,
      storeName: 'StoreName Test',
      location: 'Location Test',
      foodType: 'FoodType Test',
      sales: 0,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };
    mockStoreRepository.findStoreByUserId.mockReturnValue(null);
    mockStoreRepository.createStore.mockReturnValue(sampleStore);

    // createStore 메소드에서 userId, storeName, FoodType에 해당하는 데이터 넣기
    const createdStore = await storeService.createStore(
      1,
      'StoreName Test',
      'Location Test',
      'FoodType Test',
    );

    expect(mockStoreRepository.createStore).toHaveBeenCalledTimes(1);
    expect(mockStoreRepository.createStore).toHaveBeenCalledWith(
      sampleStore.userId,
      sampleStore.storeName,
      sampleStore.location,
      sampleStore.foodType,
    );

    expect(createdStore).toEqual({
      storeId: sampleStore.storeId,
      userId: sampleStore.userId,
      storeName: sampleStore.storeName,
      location: sampleStore.location,
      foodType: sampleStore.foodType,
      sales: sampleStore.sales,
      createdAt: sampleStore.createdAt,
      updatedAt: sampleStore.updatedAt,
    });
  });

  /** Update Store Service Method 테스트 */
  test('스토어 업데이트 성공 테스트', async () => {
    const sampleStore = {
      storeId: 1,
      userId: 1,
      storeName: 'New StoreName Test',
      foodType: 'New FoodType Test',
      sales: 0,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };
    mockStoreRepository.findStoreByUserId.mockReturnValue(sampleStore);
    mockStoreRepository.updateStore.mockReturnValue(sampleStore);

    const updatedStore = await storeService.updateStore(
      1,
      1,
      'New StoreName Test',
      'New FoodType Test',
    );

    expect(mockStoreRepository.updateStore).toHaveBeenCalledTimes(1);
    expect(mockStoreRepository.updateStore).toHaveBeenCalledWith(
      sampleStore.userId,
      sampleStore.storeId,
      sampleStore.storeName,
      sampleStore.foodType,
    );

    expect(updatedStore).toEqual({
      userId: sampleStore.userId,
      storeId: sampleStore.storeId,
      storeName: sampleStore.storeName,
      foodType: sampleStore.foodType,
      sales: sampleStore.sales,
      createdAt: sampleStore.createdAt,
      updatedAt: sampleStore.updatedAt,
    });
  });

  test('스토어 삭제 성공 테스트', async () => {
    const sampleStore = {
      storeId: 1,
      userId: 1,
      storeName: 'Delete StoreName Test',
      foodType: 'Delete FoodType Test',
      sales: 0,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };

    mockStoreRepository.findStoreByUserId.mockReturnValue(sampleStore);
    mockStoreRepository.deleteStore.mockReturnValue(sampleStore);

    const deletedStore = await storeService.deleteStore(1,1);

    expect(mockStoreRepository.deleteStore).toHaveBeenCalledTimes(1);
    expect(mockStoreRepository.deleteStore).toHaveBeenCalledWith(
      sampleStore.userId,
      sampleStore.storeId,
    );

    expect(deletedStore).toEqual({
      storeId: sampleStore.storeId,
      storeName: sampleStore.storeName,
      foodType: sampleStore.foodType,
      sales: sampleStore.sales,
    });
  });

  test('스토어 목록 조회 성공 테스트', async () => {
    const sampleStore = {
      userId: 1,
      storeId: 1,
      storeName: 'Get storeName Test',
      foodType: 'Get FoodType Test',
      createdAt: '2024-09-28T09:35:43.410Z',
    };

    mockStoreRepository.findStoreByStoreName.mockReturnValue(sampleStore);

    const getStore = await storeService.getStore(sampleStore.storeName);

    expect(getStore).toEqual({
      store:sampleStore,
    });
    expect(mockStoreRepository.findStoreByStoreName).toHaveBeenCalledTimes(1);
    expect(mockStoreRepository.findStoreByStoreName).toHaveBeenCalledWith(sampleStore.storeName);
  });

  test('스토어 생성 실패 테스트', async () => {
    const sampleStore = { userId: 1 };
    mockStoreRepository.findStoreByUserId.mockReturnValue(sampleStore);

    try {
      await storeService.createStore(1, 'storeName', '한식');
    } catch (err) {
      expect(mockStoreRepository.findStoreByUserId).toHaveBeenCalledTimes(1);
      expect(mockStoreRepository.findStoreByUserId).toHaveBeenCalledWith(1);

      expect(err.message).toEqual('이미 보유하고 있는 식당이 있습니다.');
    }
  });

  test('스토어 업데이트 실패 테스트', async () => {
    const sampleStore = null;
    mockStoreRepository.findStoreByUserId.mockReturnValue(sampleStore);

    try {
      await storeService.updateStore(1, 'storeName', 'foodType');
    } catch (err) {
      expect(mockStoreRepository.findStoreByUserId).toHaveBeenCalledTimes(1);
      expect(mockStoreRepository.findStoreByUserId).toHaveBeenCalledWith(1);

      expect(mockStoreRepository.updateStore).toBeCalledTimes(0);

      expect(err.message).toEqual('보유하고 있는 식당이 없습니다, 식당을 만들어주세요.');
    }
  });

  test('스토어 삭제 실패 테스트', async () => {
    const sampleStore = null;
    mockStoreRepository.findStoreByUserId.mockReturnValue(sampleStore);

    try {
      await storeService.deleteStore(1, 'storeName');
    } catch (err) {
      expect(mockStoreRepository.findStoreByUserId).toHaveBeenCalledTimes(1);
      expect(mockStoreRepository.findStoreByUserId).toHaveBeenCalledWith(1);

      expect(mockStoreRepository.deleteStore).toBeCalledTimes(0);

      expect(err.message).toEqual('보유하고 있는 식당이 없습니다.');
    }
  });

  test('스토어 생성 실패 테스트', async () => {
    const sampleStore = null;
    mockStoreRepository.findStoreByStoreName.mockReturnValue(sampleStore);

    try {
      await storeService.getStore('storeName');
    } catch (err) {
      expect(mockStoreRepository.findStoreByStoreName).toHaveBeenCalledTimes(1);
      expect(mockStoreRepository.findStoreByStoreName).toHaveBeenCalledWith('storeName');

      expect(err.message).toEqual('해당하는 음식점이 없습니다.');
    }
  });
});
