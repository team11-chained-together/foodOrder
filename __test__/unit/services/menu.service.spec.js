import { expect, jest, test } from '@jest/globals';
import { MenuService } from '../../../src/services/menu.service.js';

let mockMenuRepository = {
  createMenu: jest.fn(),
  findStoreIdByUserId: jest.fn(),
  findMenuName: jest.fn(),
  updateMenu: jest.fn(),
  findMenuNameByStoreId: jest.fn(),
  findMenuByMenuId:jest.fn(),
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
      storeId: 1,
      menuId: 1,
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
    mockMenuRepository.findMenuNameByStoreId.mockReturnValue(null);

    const createdMenu = await menuService.createMenu(
      sampleMenu.userId,
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
    expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledWith(sampleMenu.userId);

    expect(mockMenuRepository.findMenuNameByStoreId).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.findMenuNameByStoreId).toHaveBeenCalledWith(
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
      updatedAt: '2024-09-28T09:35:43.410Z',
    };
  
    const sampleStore = {
      storeId: 1,
      userId: 1,  // userId 추가
      storeName: 'StoreName Test',
      foodType: 'FoodType Test',
      sales: 0,
      updatedAt: '2024-09-28T09:35:43.410Z',
    };
  
    // Mock 리턴값 설정
    mockMenuRepository.findStoreIdByUserId.mockReturnValue(sampleStore);  // userId가 있는 sampleStore 반환
    mockMenuRepository.findMenuByMenuId.mockReturnValue(sampleMenu);  
    mockMenuRepository.updateMenu.mockReturnValue(sampleMenu);
  
    // 업데이트할 메뉴 실행
    const updatedMenu = await menuService.updateMenu(
      sampleStore.userId,  // userId 전달
      sampleMenu.menuId,
      sampleMenu.menuName,
      sampleMenu.image,
      sampleMenu.price,
      sampleMenu.stock
    );
  
    // 업데이트된 메뉴가 정확히 호출되었는지 확인
    expect(mockMenuRepository.updateMenu).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.updateMenu).toHaveBeenCalledWith(
      sampleMenu.menuId,
      sampleMenu.menuName,
      sampleMenu.image,
      sampleMenu.price,
      sampleMenu.stock,
    );
  
    // findStoreIdByUserId 호출 여부 확인
    expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledWith(sampleStore.userId);  
  
    // findMenuByMenuId 호출 여부 확인
    expect(mockMenuRepository.findMenuByMenuId).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.findMenuByMenuId).toHaveBeenCalledWith(
      sampleStore.storeId,
      sampleMenu.menuId,
    );
  
    // 반환값 테스트
    expect(updatedMenu).toEqual({
      menuId: sampleMenu.menuId,
      menuName: sampleMenu.menuName,
      image: sampleMenu.image,
      price: sampleMenu.price,
      stock: sampleMenu.stock,
      updatedAt: sampleMenu.updatedAt,
    });
  });
  

  /** Create Menu Service Method Fail 테스트 */
  test('createMenu Method By Fail', async () => {
    const sampleStore = { userId: 1, storeId: 1 };
    const sampleMenu = { menuName: 'menuName' };
    mockMenuRepository.findStoreIdByUserId.mockReturnValue(sampleStore);
    mockMenuRepository.findMenuNameByStoreId.mockReturnValue(sampleMenu);

    try {
      await menuService.createMenu(1, 'menuName');
    } catch (err) {
      expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledTimes(1);
      expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledWith(1);

      expect(mockMenuRepository.findMenuNameByStoreId).toHaveBeenCalledTimes(1);
      expect(mockMenuRepository.findMenuNameByStoreId).toHaveBeenCalledWith(1, 'menuName');

      expect(err.message).toEqual('저희 가게에 이미 존재하는 메뉴 이름입니다.');
    }
  });

  /** Update Menu Service Method Fail 테스트 */
  test('updateMenu Method By Fail', async () => {
    const sampleStore = { userId: 1, storeId: 1 };

    mockMenuRepository.findStoreIdByUserId.mockReturnValue(sampleStore);
    mockMenuRepository.findMenuByMenuId.mockReturnValue(null);

    try {
      await menuService.updateMenu(1, 1, 'menuName', 'imageURL', 1000, 10);
    } catch (err) {
      expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledTimes(1);
      expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledWith(1);

      expect(mockMenuRepository.findMenuByMenuId).toHaveBeenCalledTimes(1);
      expect(mockMenuRepository.findMenuByMenuId).toHaveBeenCalledWith(1, 1);

      expect(err.message).toEqual('저희 가게에 존재하지 않는 메뉴입니다.');
    }
  });
});
