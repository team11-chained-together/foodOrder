import { jest, test } from '@jest/globals';
import { MenuService } from '../../../src/services/menu.service.js';

//
let mockMenuRepository = {
  createMenu: jest.fn(),
  findStoreIdByUserId: jest.fn(),
  findMenuName: jest.fn(),
  updateMenu: jest.fn(),
};

// menuService의 repository를 Mock Repository로 의존성을 주입
let menuService = new MenuService(mockMenuRepository);

describe('Menu Service Unit Test', () => {
  // 각 테스트가 실행되기 전에 실행
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createMenu Method By Success', async () => {
    const sampleMenu = {
      menuId: 1,
      storeId: 1,
      menuName: 'Create Test MenuName',
      image: 'Create Test image',
      price: 10,
      stock: 1,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: null,
    };
    const sampleStore = {
      storeId: 1,
      userId: 1,
      storeName: 'StoreName Test',
      foodType: 'FoodType Test',
      sales: 0,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };
    mockMenuRepository.createMenu.mockReturnValue(sampleMenu);
    mockMenuRepository.findStoreIdByUserId.mockReturnValue(sampleStore);
    mockMenuRepository.findMenuName.mockReturnValue(null);

    const createdMenu = await menuService.createMenu(
      sampleMenu.storeId,
      sampleMenu.menuName,
      sampleMenu.image,
      sampleMenu.price,
      sampleMenu.stock,
    );

    expect(createdMenu).toEqual(sampleMenu);
    expect(mockMenuRepository.createMenu).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.createMenu).toHaveBeenCalledWith(
      sampleMenu.storeId,
      sampleMenu.menuName,
      sampleMenu.image,
      sampleMenu.price,
      sampleMenu.stock,
    );
    expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledWith(sampleMenu.storeId);
    expect(mockMenuRepository.findMenuName).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.findMenuName).toHaveBeenCalledWith(
      sampleStore.storeId,
      sampleMenu.menuName,
    );
  });

  test('updateMenu Method By Success', async () => {
    const sampleMenu = {
      menuId: 1,
      storeId: 1,
      menuName: 'Update Test MenuName',
      image: 'Update Test image',
      price: 10,
      stock: 1,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };

    const sampleStore = {
      storeId: 1,
      userId: 1,
      storeName: 'StoreName Test',
      foodType: 'FoodType Test',
      sales: 0,
      createdAt: '2024-09-28T09:35:43.410Z',
      updatedAt: '2024-09-28T09:35:43.410Z',
    };

    mockMenuRepository.findStoreIdByUserId.mockReturnValue(sampleStore);
    const mockName = mockMenuRepository.findMenuName.mockReturnValue(
      sampleStore.storeId,
      sampleMenu.menuName,
    );
    mockMenuRepository.updateMenu.mockReturnValue(sampleMenu);

    const updatedMenu = await menuService.updateMenu(
      sampleMenu.storeId,
      sampleMenu.menuName,
      sampleMenu.image,
      sampleMenu.price,
      sampleMenu.stock,
    );

    expect(mockMenuRepository.updateMenu).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.updateMenu).toHaveBeenCalledWith(
      sampleMenu.storeId,
      mockName.menuName,
      sampleMenu.menuName,
      sampleMenu.image,
      sampleMenu.price,
      sampleMenu.stock,
    );

    expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledWith(sampleMenu.storeId);

    expect(mockMenuRepository.findMenuName).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.findMenuName).toHaveBeenCalledWith(
      sampleStore.storeId,
      sampleMenu.menuName,
    );

    expect(updatedMenu).toEqual({
      menuId: sampleMenu.menuId,
      menuName: sampleMenu.menuName,
      image: sampleMenu.image,
      price: sampleMenu.price,
      stock: sampleMenu.stock,
      createdAt: sampleMenu.createdAt,
      updatedAt: sampleMenu.updatedAt,
    });
  });
});
