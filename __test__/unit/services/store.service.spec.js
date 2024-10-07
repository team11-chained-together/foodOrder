import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { StoreService } from '../../../src/services/store.service.js';

let mockStoreRepository = {
  createStore: jest.fn(),
  updateStore: jest.fn(),
  deleteStore: jest.fn(),
  findStoreByUserId: jest.fn(),
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

    const deletedStore = await storeService.updateStore(1, 'Delete StoreName Test');

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
});
