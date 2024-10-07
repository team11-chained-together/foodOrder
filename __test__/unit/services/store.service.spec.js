import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { StoreService } from '../../../src/services/store.service.js';

let mockStoreRepository = {
  createStore: jest.fn(),
  updateStore: jest.fn(),
  findStoreByUserId: jest.fn(),
};

let storeService = new StoreService(mockStoreRepository);

describe('Store Service Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

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
    expect(mockStoreRepository).toHaveBeenCalledWith(
      sampleStore.userId,
      sampleStore.storeName,
      sampleStore.foodType,
    );

    expect(updatedStore).toEqual({
      storeId: sampleStore.storeId,
      userId: sampleStore.userId,
      storeName: sampleStore.storeName,
      foodType: sampleStore.foodType,
      sales: sampleStore.sales,
      createdAt: sampleStore.createdAt,
      updatedAt: sampleStore.updatedAt,
    });
  });
});
