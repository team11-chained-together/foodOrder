import { beforeEach, describe, expect, jest } from '@jest/globals';
import { StoreRepository } from '../../../src/repositories/store.repository.js';

let mockPrisma = {
  stores: {
    create: jest.fn(),
  },
};

let storesRepository = new StoreRepository(mockPrisma);

describe('Store Repository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('createStore Method', async () => {
    // 1. 최종적으로 createStore 메서드의 반환값을 설정한다.
    const mockReturn = 'create Store Return String';
    mockPrisma.stores.create.mockReturnValue(mockReturn);

    // 2. createPost 메서드를 실행하기 위한, storeName, foodType의 데이터를 전달한다.
    const createStoreParams = {
      storeName: 'createStoreName',
      foodType: 'createFoodType',
    };

    const createStoreData = await storesRepository.createStore(
      createStoreParams.storeName,
      createStoreParams.foodType,
    );

    // create 메서드의 반환값은 Return 값과 동일하다.
    expect(createStoreData).toEqual(mockReturn);

    // create 메서드는 1번만 실행된다.
    expect(mockPrisma.stores.create).toHaveBeenCalledTimes(1);

    // createStore 메서드를 실행할때, create 메서드는 전달한 storeName, foodType이 순서대로 전달된다.
    expect(mockPrisma.stores.create).toHaveBeenCalledWith({
      data: {
        storeName: createStoreParams.storeName,
        foodType: createStoreParams.foodType,
      },
    });
  });
});
