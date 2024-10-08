import { beforeEach, describe, expect, jest } from '@jest/globals';
import { StoreRepository } from '../../../src/repositories/store.repository.js';

let mockPrisma = {
  store: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn(),
  },
};

let storeRepository = new StoreRepository(mockPrisma);

describe('Store Repository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('findStoreByUserId Method', async () => {
    // 1. findStoreByUserId 메서드의 반환값을 설정한다.
    const mockReturn = 'find UserId';
    mockPrisma.store.findUnique.mockReturnValue(mockReturn);

    // 2. findStoreByUserId 메서드를 실행하기 위한 userId 데이터 전달
    const findUserIdParams = {
      userId: 1,
    };

    const findUserData = await storeRepository.findStoreByUserId(findUserIdParams.userId);

    // findUnique 메서드의 반환값은 Return 값과 동일하다.
    expect(findUserData).toEqual(mockReturn);

    // findUnique 메서드는 1번만 실행된다.
    expect(mockPrisma.store.findUnique).toHaveBeenCalledTimes(1);

    // findStoreByUserId 메서드를 실행할때, findUnique 메서드는 전달한 userId를 전달
    expect(mockPrisma.store.findUnique).toHaveBeenCalledWith({
      where: { userId: findUserIdParams.userId },
    });
  });

  test('createStore Method', async () => {
    // 1. createStore 메서드의 반환값을 설정한다.
    const mockReturn = 'create Store Return String';
    mockPrisma.store.create.mockReturnValue(mockReturn);

    // 2. createStore 메서드를 실행하기 위한 userId, storeName, foodType의 데이터를 전달한다.
    const createStoreParams = {
      userId: 1,
      storeName: 'createStoreName',
      foodType: 'createFoodType',
      sales: 0,
    };

    const createStoreData = await storeRepository.createStore(
      createStoreParams.userId,
      createStoreParams.storeName,
      createStoreParams.foodType,
      createStoreParams.sales,
    );

    // create 메서드의 반환값은 Return 값과 동일하다.
    expect(createStoreData).toEqual(mockReturn);

    // create 메서드는 1번만 실행된다.
    expect(mockPrisma.store.create).toHaveBeenCalledTimes(1);

    // createStore 메서드를 실행할때, create 메서드는 전달한 userId, storeName, foodType이 순서대로 전달된다.
    expect(mockPrisma.store.create).toHaveBeenCalledWith({
      data: {
        userId: createStoreParams.userId,
        storeName: createStoreParams.storeName,
        foodType: createStoreParams.foodType,
        sales: createStoreParams.sales,
      },
    });
  });

  test('updateStore Method', async () => {
    // 1. updateStore 메서드의 반환값을 설정한다.
    const mockReturn = 'Update Store Return String';
    mockPrisma.store.update.mockReturnValue(mockReturn);

    // 2. updateStore 메서드를 실행하기 위한 userId, storeName, foodType의 데이터를 전달한다.
    const updateStoreParams = {
      userId: 1,
      storeName: 'createStoreName',
      foodType: 'createFoodType',
    };

    const updateStoreData = await storeRepository.updateStore(
      updateStoreParams.userId,
      updateStoreParams.storeName,
      updateStoreParams.foodType,
    );

    expect(updateStoreData).toEqual(mockReturn);

    // create 메서드는 1번만 실행된다.
    expect(mockPrisma.store.update).toHaveBeenCalledTimes(1);

    // createStore 메서드를 실행할때, update 메서드는 전달한 userId, storeName, foodType이 순서대로 전달된다.
    expect(mockPrisma.store.update).toHaveBeenCalledWith({
      where: {
        userId: updateStoreParams.userId,
      },
      data: {
        storeName: updateStoreParams.storeName,
        foodType: updateStoreParams.foodType,
      },
    });
  });

  test('deleteStore Method', async () => {
    // 1. deleteStore 메서드의 반환값을 설정
    const mockReturn = 'Delete Store Return String';
    mockPrisma.store.delete.mockReturnValue(mockReturn);

    // 2. deleteStore 메서드를 실행하기 위한 userId 전달
    const deleteStoreParams = {
      userId: 1,
    };

    // 3. deleteStore 실행
    const deleteStoreData = await storeRepository.deleteStore(deleteStoreParams.userId);

    // delete 메서드의 반환값은 return 값과 동일하다.
    expect(deleteStoreData).toEqual(mockReturn);

    // delete 메서드는 1번만 실행된다.
    expect(mockPrisma.store.delete).toHaveBeenCalledTimes(1);

    // deleteStore 메서드를 실행할 때 delete 메서드는 전달한 postId를 전달한다.
    expect(mockPrisma.store.delete).toHaveBeenCalledWith({
      where: {
        userId: deleteStoreParams.userId,
      },
    });
  });

  test('findStoreByStoreName Method', async () => {
    // 1. findStoreByStoreName 메서드의 반환값을 설정
    const mockReturn = 'get Store Name';
    mockPrisma.store.findFirst.mockReturnValue(mockReturn);

    // 2. findStoreByStoreName 메서드를 실행하기 위한 storeName 전달
    const getStoreParams = {
      storeName: 'Get Store Name',
    };

    // 3. findStoreByStoreName 실행
    await storeRepository.findStoreByStoreName(getStoreParams.storeName);

    // findFirst 메서드는 1번만 실행된다.
    expect(mockPrisma.store.findFirst).toHaveBeenCalledTimes(1);

    expect(mockPrisma.store.findFirst).toHaveBeenCalledWith({
      where: {
        storeName: getStoreParams.storeName,
      },
    });
  });
});
