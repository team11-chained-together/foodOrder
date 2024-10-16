import { beforeEach, describe, expect, jest } from '@jest/globals';
import { StoreRepository } from '../../../src/repositories/store.repository.js';

let mockPrisma = {
  store: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
  },
  menu: {
    findMany: jest.fn(),
  },
};

let storeRepository = new StoreRepository(mockPrisma);

describe('가게 리포지토리 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('searchStores 테스트 성공', async () => {
    const sampleStoreData = {
      storeId: 1,
      userId: 1,
      storeName: 'Test StoreName',
      foodType: 'Test Food Type',
      location: '전북',
      sales: 100000,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };
    mockPrisma.store.findMany.mockResolvedValue([sampleStoreData]);

    const searchedStores = await storeRepository.searchStores('Test search');

    expect(mockPrisma.store.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrisma.store.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          {
            storeName: { contains: 'Test search' },
          },
          {
            foodType: { contains: 'Test search' },
          },
          {
            location: { contains: 'Test search' },
          },
          {
            menu: {
              some: {
                menuName: { contains: 'Test search' },
              },
            },
          },
        ],
      },
      include: {
        menu: true,
      },
    });
    expect(searchedStores).toEqual([sampleStoreData]);
  });

  test('findStoreByUserId 테스트 성공', async () => {
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

  test('createStore 테스트 성공', async () => {
    const mockReturn = 'create Store Return String';
    mockPrisma.store.create.mockReturnValue(mockReturn);

    const createStoreParams = {
      userId: 1,
      storeName: 'createStoreName',
      foodType: 'createFoodType',
      sales: 0,
    };

    const createStoreData = await storeRepository.createStore(
      createStoreParams.userId,
      createStoreParams.storeName,
      createStoreParams.location,
      createStoreParams.foodType,
      createStoreParams.sales,
    );

    expect(createStoreData).toEqual(mockReturn);

    expect(mockPrisma.store.create).toHaveBeenCalledTimes(1);

    expect(mockPrisma.store.create).toHaveBeenCalledWith({
      data: {
        userId: createStoreParams.userId,
        storeName: createStoreParams.storeName,
        location: createStoreParams.location,
        foodType: createStoreParams.foodType,
        sales: createStoreParams.sales,
      },
    });
  });

  test('updateStore 테스트 성공', async () => {
    const mockReturn = 'Update Store Return String';
    mockPrisma.store.update.mockResolvedValue(mockReturn);

    const updateStoreParams = {
      userId: 1,
      storeName: 'createStoreName',
      foodType: 'createFoodType',
      location: 'updateLocation',
    };

    const updateStoreData = await storeRepository.updateStore(
      updateStoreParams.userId,
      updateStoreParams.storeName,
      updateStoreParams.foodType,
      updateStoreParams.location,
    );

    expect(updateStoreData).toEqual(mockReturn);

    expect(mockPrisma.store.update).toHaveBeenCalledTimes(1);

    expect(mockPrisma.store.update).toHaveBeenCalledWith({
      where: {
        userId: updateStoreParams.userId,
      },
      data: {
        storeName: updateStoreParams.storeName,
        foodType: updateStoreParams.foodType,
        location: updateStoreParams.location,
      },
    });
  });

  test('deleteStore 테스트 성공', async () => {
    const mockReturn = 'Delete Store Return String';
    mockPrisma.store.delete.mockReturnValue(mockReturn);

    const deleteStoreParams = {
      userId: 1,
    };

    const deleteStoreData = await storeRepository.deleteStore(deleteStoreParams.userId);

    expect(deleteStoreData).toEqual(mockReturn);

    expect(mockPrisma.store.delete).toHaveBeenCalledTimes(1);

    expect(mockPrisma.store.delete).toHaveBeenCalledWith({
      where: {
        userId: deleteStoreParams.userId,
      },
    });
  });

  test('findMenuByStoreId 테스트 성공', async () => {
    const mockReturn = [
      {
        menuId: 1,
        menuName: '육개장',
        image: '이미지 URL',
        price: 5000,
        stock: 20,
      },
    ];

    mockPrisma.menu.findMany.mockResolvedValue(mockReturn);

    const getMenuParams = {
      storeId: 1,
    };

    const findStoreData = await storeRepository.findMenuByStoreId(getMenuParams.storeId);

    expect(findStoreData).toEqual(mockReturn);

    expect(mockPrisma.menu.findMany).toHaveBeenCalledTimes(1);

    expect(mockPrisma.menu.findMany).toHaveBeenCalledWith({
      where: {
        storeId: getMenuParams.storeId,
      },
      select: {
        menuId: true,
        menuName: true,
        image: true,
        price: true,
        stock: true,
      },
    });
  });

  test('가게 찾기 테스트 성공', async () => {
    const mockReturn = 'find store!';
    mockPrisma.store.findMany.mockResolvedValue(mockReturn);

    const findStoreData = await storeRepository.findStore();

    expect(findStoreData).toEqual(mockReturn);
    expect(mockPrisma.store.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrisma.store.findMany).toHaveBeenCalledWith();
  });
});
