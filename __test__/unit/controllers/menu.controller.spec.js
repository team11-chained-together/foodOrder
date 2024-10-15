import { beforeAll, describe, jest, test } from '@jest/globals';
import { MenuController } from '../../../src/controllers/menu.controller';
import {CreateMenu,UpdateMenu,DeleteMenu,GetMenu} from '../../../src/utils/validators/controller/menuValidator.js'
const mockMenuService = {
  createMenu: jest.fn(),
  updateMenu: jest.fn(),
  deleteMenu: jest.fn(),
  getMenu:jest.fn(),
};

const mockRequest = {
  body: {},
  user:{},
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const menuController = new MenuController(mockMenuService);
new CreateMenu(mockRequest.user.isOwner,mockRequest.body);
new UpdateMenu(mockRequest.user.isOwner,mockRequest.body);
new DeleteMenu(mockRequest.user.isOwner,mockRequest.body);
new GetMenu(mockRequest.body);
describe('메뉴 컨트롤러 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('메뉴 생성 성공 유닛 테스트', async () => {
    const createMenuRequestBodyParams = {
      userId: 1,
      isOwner: true,
      menuName: '훌랄라 치킨',
      image: '치킨 이미지',
      price: 10000,
      stock: 30,
    };
    mockRequest.body = createMenuRequestBodyParams;
    mockRequest.user = { userId: 1, isOwner: true };

    // Service 계층에서 구현된 createMenu 메서드를 실행했을때, 반환되는 데이터 형식
    const createdMenuReturnValue = {
      menuId: 1,
      ...createMenuRequestBodyParams,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    mockMenuService.createMenu.mockReturnValue(createdMenuReturnValue);

    await menuController.createMenu(mockRequest, mockResponse, mockNext);
    
    expect(mockMenuService.createMenu).toHaveBeenCalledTimes(1);
    expect(mockMenuService.createMenu).toHaveBeenCalledWith(
      mockRequest.user.userId,
      createMenuRequestBodyParams.menuName,
      createMenuRequestBodyParams.image,
      createMenuRequestBodyParams.price,
      createMenuRequestBodyParams.stock,
    );

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createdMenuReturnValue,
    });
  });

  test('메뉴 업데이트 성공 유닛 테스트', async () => {
    const updateMenuRequestBodyParams = {
      userId: 1,
      menuId: 1,
      menuName: '수정할 메뉴이름',
      image: '수정할 이미지 URL',
      price: 1000,
      stock: 29,
    };

    mockRequest.body = updateMenuRequestBodyParams;
    mockRequest.user = { userId: 1, isOwner: true };

    // service 계층에서 구현된 updateMenu 메소드를 실행하였을 때, 반환되는 데이터 형식
    const updatedMenuReturnValue = {
      menuId: 1,
      ...updateMenuRequestBodyParams,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    mockMenuService.updateMenu.mockReturnValue(updatedMenuReturnValue);

    await menuController.updateMenu(mockRequest, mockResponse, mockNext);
    expect(mockMenuService.updateMenu).toHaveBeenCalledTimes(1);
    expect(mockMenuService.updateMenu).toHaveBeenCalledWith(
      mockRequest.user.userId,
      updateMenuRequestBodyParams.menuId,
      updateMenuRequestBodyParams.menuName,
      updateMenuRequestBodyParams.image,
      updateMenuRequestBodyParams.price,
      updateMenuRequestBodyParams.stock,
    );

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: updatedMenuReturnValue,
    });
  });
  test('메뉴 삭제 성공 유닛 테스트', async()=>{
    const deletedMenuBodyParams = {
      menuId : 1,
    }
    mockRequest.body = deletedMenuBodyParams;
    mockRequest.user = { userId: 1, isOwner: true };

    const deletedMenuReturnValue = {
      menuId :1,
      menuName : 'menuName',
      image:"image",
      price:1000,
      stock:10,
    }

    mockMenuService.deleteMenu.mockReturnValue(deletedMenuReturnValue)
    await  menuController.deleteMenu(mockRequest, mockResponse, mockNext);
    expect(mockMenuService.deleteMenu).toHaveBeenCalledTimes(1);
    expect(mockMenuService.deleteMenu).toHaveBeenCalledWith(
      mockRequest.user.userId,
      deletedMenuBodyParams.menuId
    )

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(204);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: deletedMenuReturnValue
    })
  })
  test('해당가게 메뉴 조회 성공 유닛 테스트', async()=>{
    const getMenuBodyParams = {
      storeId:1,
    }
    mockRequest.body = getMenuBodyParams;
    mockRequest.user = {userId:1, isOwner :true};

    const getMenuReturnValue = {
      storeId:1,
      storeName:"storeName",
      foodType:"foodType",
      menu:"menu",
    }

    mockMenuService.getMenu.mockReturnValue(getMenuReturnValue);
    await menuController.getMenu(mockRequest,mockResponse,mockNext);
    expect(mockMenuService.getMenu).toHaveBeenCalledTimes(1);
    expect(mockMenuService.getMenu).toHaveBeenCalledWith(
      getMenuBodyParams.storeId
    )

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1)
    expect(mockResponse.json).toHaveBeenCalledWith({
      data:getMenuReturnValue
    });
    })
});
