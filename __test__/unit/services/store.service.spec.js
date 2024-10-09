import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { StoreService } from '../../../src/services/store.service.js';

let mockStoreRepository = {
  createStore: jest.fn(),
  updateStore: jest.fn(),
  deleteStore: jest.fn(),
  findStoreByUserId: jest.fn(),
  findStoreByStoreName: jest.fn(),
};

let storeService = new StoreService(mockStoreRepository);

describe('Store Service Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  /** Create Store Service Method 테스트 */
  test('createStore Method By Success', async () => {
    // 반환값 설정
    const sampleStore = {
      storeId: 1,
      userId: 1,
      storeName: 'StoreName Test',
      foodType: 'FoodType Test',
      sales: 0,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };
    mockStoreRepository.findStoreByUserId.mockReturnValue(null);
    mockStoreRepository.createStore.mockReturnValue(sampleStore);

    // createStore 메소드에서 userId, storeName, FoodType에 해당하는 데이터 넣기
    const createdStore = await storeService.createStore(1, 'StoreName Test', 'FoodType Test');

    expect(mockStoreRepository.createStore).toHaveBeenCalledTimes(1);
    expect(mockStoreRepository.createStore).toHaveBeenCalledWith(
      sampleStore.userId,
      sampleStore.storeName,
      sampleStore.foodType,
    );

    expect(createdStore).toEqual({
      storeId: sampleStore.storeId,
      userId: sampleStore.userId,
      storeName: sampleStore.storeName,
      foodType: sampleStore.foodType,
      sales: sampleStore.sales,
      createdAt: sampleStore.createdAt,
      updatedAt: sampleStore.updatedAt,
    });
  });

  /** Update Store Service Method 테스트 */
  test('updateStore Method By Success', async () => {
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
      'New StoreName Test',
      'New FoodType Test',
    );

    expect(mockStoreRepository.updateStore).toHaveBeenCalledTimes(1);
    expect(mockStoreRepository.updateStore).toHaveBeenCalledWith(
      sampleStore.userId,
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

  /** Delete Store Service Method 테스트 */
  test('deleteStore Method By Success', async () => {
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

    const deletedStore = await storeService.deleteStore(1, 'Delete StoreName Test');

    expect(mockStoreRepository.deleteStore).toHaveBeenCalledTimes(1);
    expect(mockStoreRepository.deleteStore).toHaveBeenCalledWith(
      sampleStore.userId,
      sampleStore.storeName,
    );

    expect(deletedStore).toEqual({
      storeId: sampleStore.storeId,
      storeName: sampleStore.storeName,
      foodType: sampleStore.foodType,
      sales: sampleStore.sales,
    });
  });

  /** Get Store Service Method 테스트 */
  test('getStore Method By Success', async () => {
    const sampleStore = {
      storeId: 1,
      userId: 1,
      storeName: 'Get storeName Test',
      foodType: 'Get FoodType Test',
      createdAt: '2024-09-28T09:35:43.410Z',
    };

    mockStoreRepository.findStoreByStoreName.mockReturnValue(sampleStore);
    const getStore = await storeService.getStore(sampleStore.storeName);

    expect(getStore).toEqual(sampleStore);
    expect(mockStoreRepository.findStoreByStoreName).toHaveBeenCalledTimes(1);
    expect(mockStoreRepository.findStoreByStoreName).toHaveBeenCalledWith(sampleStore.storeName);
  });

  /** Create Store Service Method Fail 테스트 */
  test('createStore Method By Fail', async () => {
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

  /** Update Store Service Method Fail 테스트 */
  test('updateStore Method By Fail', async () => {
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

  /** Delete Store Service Method Fail 테스트 */
  test('deleteStore Method By Fail', async () => {
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

  /** Get Store Service Method Fail 테스트 */
  test('getStore Method By Fail', async () => {
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
