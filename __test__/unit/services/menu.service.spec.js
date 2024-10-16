import { expect, jest, test } from '@jest/globals';
import { MenuService } from '../../../src/services/menu.service.js';
import {
  CreateMenuValidation,
  CreateIsMenuNameValidation,
  UpdateMenuValidation,
  GetMenuValidation,
} from '../../../src/utils/validators/service/menuValidator.js';

const mockMenuRepository = {
  findMenuByStoreId: jest.fn(),
  findStoreIdByUserId: jest.fn(),
  createMenu: jest.fn(),
  updateMenu: jest.fn(),
  deleteMenu: jest.fn(),
  findMenuByMenuId: jest.fn(),
  findStore: jest.fn(),
  findMenuByStoreId: jest.fn(),
};

const menuService = new MenuService(mockMenuRepository);
new CreateMenuValidation(CreateMenuValidation.checkStoreId);
new CreateIsMenuNameValidation(CreateIsMenuNameValidation.checkStoreId);
new GetMenuValidation(GetMenuValidation.store);
new UpdateMenuValidation(UpdateMenuValidation.checkStoreId);

describe('메뉴 서비스 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('메뉴 생성 성공 유닛 테스트', async () => {
    const sampleStore1 = {
      userId: 1,
    };
    mockMenuRepository.findStoreIdByUserId.mockReturnValue(sampleStore1);

    const sampleStore2 = null;
    mockMenuRepository.findMenuByStoreId.mockReturnValue(sampleStore2);

    const sampleStoreReturnValue3 = {
      storeId: 1,
      menuName: 'menuName',
      image: 'image',
      price: 10000,
      stock: 10,
      createdAt: '20241016',
      updatedAt: null,
    };
    mockMenuRepository.createMenu.mockReturnValue(sampleStoreReturnValue3);
    const createMenuServiceData = await menuService.createMenu(1, 'menuName', 'image', 10000, 10);
    expect(createMenuServiceData).toEqual(sampleStoreReturnValue3);
    expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledWith(1);

    expect(mockMenuRepository.findMenuByStoreId).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.findMenuByStoreId).toHaveBeenCalledWith(
      CreateIsMenuNameValidation.checkStoreId,
      sampleStoreReturnValue3.menuName,
    );

    expect(mockMenuRepository.createMenu).toHaveBeenCalledTimes(1);
    expect(mockMenuRepository.createMenu).toHaveBeenCalledWith(
      CreateIsMenuNameValidation.storeId,
      sampleStoreReturnValue3.menuName,
      sampleStoreReturnValue3.image,
      sampleStoreReturnValue3.price,
      sampleStoreReturnValue3.stock,
    );
  });

  test('메뉴 업데이트 성공 유닛 테스트', async () => {
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
      userId: 1, // userId 추가
      storeName: 'StoreName Test',
      foodType: 'FoodType Test',
      sales: 0,
      updatedAt: '2024-09-28T09:35:43.410Z',
    };

    // Mock 리턴값 설정
    mockMenuRepository.findStoreIdByUserId.mockReturnValue(sampleStore); // userId가 있는 sampleStore 반환
    mockMenuRepository.findMenuByMenuId.mockReturnValue(sampleMenu);
    mockMenuRepository.updateMenu.mockReturnValue(sampleMenu);

    // 업데이트할 메뉴 실행
    const updatedMenu = await menuService.updateMenu(
      sampleStore.userId, // userId 전달
      sampleMenu.menuId,
      sampleMenu.menuName,
      sampleMenu.image,
      sampleMenu.price,
      sampleMenu.stock,
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

  // test('메뉴 생성 실패 유닛 테스트', async () => {
  //   const sampleStore = { userId: 1, storeId: 1 };
  //   const sampleMenu = { menuName: 'menuName' };
  //   mockMenuRepository.findStoreIdByUserId.mockReturnValue(sampleStore);
  //   mockMenuRepository.findMenuNameByStoreId.mockReturnValue(sampleMenu);

  //   try {
  //     await menuService.createMenu(1, 'menuName');
  //   } catch (err) {
  //     expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledTimes(1);
  //     expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledWith(1);

  //     expect(mockMenuRepository.findMenuNameByStoreId).toHaveBeenCalledTimes(1);
  //     expect(mockMenuRepository.findMenuNameByStoreId).toHaveBeenCalledWith(1, 'menuName');

  //     expect(err.message).toEqual('저희 가게에 이미 존재하는 메뉴 이름입니다.');
  //   }
  // });

  // test('메뉴 업테이트 실패 유닛 테스트', async () => {
  //   const sampleStore = { userId: 1, storeId: 1 };

  //   mockMenuRepository.findStoreIdByUserId.mockReturnValue(sampleStore);
  //   mockMenuRepository.findMenuByMenuId.mockReturnValue(null);

  //   try {
  //     await menuService.updateMenu(1, 1, 'menuName', 'imageURL', 1000, 10);
  //   } catch (err) {
  //     expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledTimes(1);
  //     expect(mockMenuRepository.findStoreIdByUserId).toHaveBeenCalledWith(1);

  //     expect(mockMenuRepository.findMenuByMenuId).toHaveBeenCalledTimes(1);
  //     expect(mockMenuRepository.findMenuByMenuId).toHaveBeenCalledWith(1, 1);

  //     expect(err.message).toEqual('저희 가게에 존재하지 않는 메뉴입니다.');
  //   }
  // });
});
