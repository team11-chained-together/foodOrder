import { beforeEach, describe, expect, jest } from '@jest/globals';
import { MenuRepository } from '../../../src/repositories/menu.repository.js';

let mockPrisma = {
  menu: {
    findFirst: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

let menuRepository = new MenuRepository(mockPrisma);

describe('Store Repository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('FindStoreIdByUserId Method By Success', async () => {
    // 1. findStoreIdByUserId 메서드의 반환값을 설정한다.
    const mockReturn = 'find StoreId';
    mockPrisma.menu.findFirst.mockReturnValue(mockReturn);

    // 2. findStoreIdByUserId 메서드를 실행하기 위한 userId 데이터 전달
    const findStoreIdParams = {
      userId: 1,
    };

    const findStoreData = await menuRepository.findStoreIdByUserId(findStoreIdParams.userId);

    // findFirst 메서드의 반환값은 Return 값과 동일하다.
    expect(findStoreData).toEqual(mockReturn);

    // findFirst 메서드는 1번만 실행된다.
    expect(mockPrisma.menu.findFirst).toHaveBeenCalledTimes(1);

    // findStoreIdByUserId 메서드를 실행할때, findFirst 메서드는 전달한 userId를 전달
    expect(mockPrisma.menu.findFirst).toHaveBeenCalledWith({
      where: { userId: findStoreIdParams.userId },
    });
  });

  test('Create Menu Method By Success', async () => {
    // 1. createMenu 메서드의 반환값을 설정한다.
    const mockReturn = 'create Menu Return String';
    mockPrisma.menu.create.mockReturnValue(mockReturn);

    // 2. createMenu 메서드를 실행하기 위한 데이터 전달
    const createMenuParams = {
      storeId: 1,
      menuName: 'menuName',
      image: 'image',
      price: 10000,
      stock: 30,
    };

    // 해당하는 데이터를 리포지토리로 Mock화
    const createMenuData = await menuRepository.createMenu(
      createMenuParams.storeId,
      createMenuParams.menuName,
      createMenuParams.image,
      createMenuParams.price,
      createMenuParams.stock,
    );

    // create 메서드의 반환값은 Return 값과 동일하다.
    expect(createMenuData).toEqual(mockReturn);

    // create 메서드는 1번만 실행된다.
    expect(mockPrisma.menu.create).toHaveBeenCalledTimes(1);

    // createMenu 메서드를 실행할때, create 메서드는 전달한 순서대로 전달된다.
    expect(mockPrisma.menu.create).toHaveBeenCalledWith({
      data: {
        storeId: createMenuParams.storeId,
        menuName: createMenuParams.menuName,
        image: createMenuParams.image,
        price: createMenuParams.price,
        stock: createMenuParams.stock,
      },
    });
  });

  test('FindMenuName Method By Success', async () => {
    // 1. FindMenuName 메서드의 반환값을 설정한다.
    const mockReturn = 'find MenuName';
    mockPrisma.menu.findUnique.mockReturnValue(mockReturn);

    // 2. findStoreIdByUserId 메서드를 실행하기 위한 userId 데이터 전달
    const findStoreIdParams = {
      storeId: 1,
      menuName: 'Find MenuName Test',
    };

    const findMenuNameData = await menuRepository.findMenuName(
      findStoreIdParams.storeId,
      findStoreIdParams.menuName,
    );

    expect(findMenuNameData).toEqual(mockReturn);
    expect(mockPrisma.menu.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrisma.menu.findUnique).toHaveBeenCalledWith({
      where: { storeId: findStoreIdParams.storeId, menuName: findStoreIdParams.menuName },
    });
  });

  test('updateMenu Method By Success', async () => {
    // 1.updateMenu 메서드의 반환값을 설정한다.
    const mockReturn = 'update Menu';
    mockPrisma.menu.update.mockReturnValue(mockReturn); // 근데 여기는 문자열을 반환값으로 해주네 서비스에서는 sample 객체를 만들어주는데 무슨 차이지

    // 2. updateMenu 메서드를 실행하기 위한 storeId, menuName, newMenuName, image, price, stock 데이터 전달
    const updateStoreParams = {
      storeId: 1,
      menuName: '육개장 사발면',
      newMenuName: '더 맛있는 육계장 사발면',
      image: '변경할 이미지 URL',
      price: 1200,
      stock: 100,
    };

    const updateMenuData = await menuRepository.updateMenu(
      updateStoreParams.storeId,
      updateStoreParams.menuName,
      updateStoreParams.newMenuName,
      updateStoreParams.image,
      updateStoreParams.price,
      updateStoreParams.stock,
    );

    expect(updateMenuData).toEqual(mockReturn);
    expect(mockPrisma.menu.update).toHaveBeenCalledTimes(1);
    expect(mockPrisma.menu.update).toHaveBeenCalledWith({
      where: { storeId: updateStoreParams.storeId, menuName: updateStoreParams.menuName },
      data: {
        menuName: updateStoreParams.newMenuName,
        image: updateStoreParams.image,
        price: updateStoreParams.price,
        stock: updateStoreParams.stock,
      },
    });
  });
});
