import { beforeAll, describe, jest, test } from '@jest/globals';
import { MenuController } from '../../../src/controllers/menu.controller';

const mockMenuService = {
  createMenu: jest.fn(),
  updateMenu: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const menuController = new MenuController(mockMenuService);

describe('Menu Controller Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });

  /** Create Menu Controller Test*/
  test('createMenu Method By Success', async () => {
    const createMenuRequestBodyParams = {
      userId: 1,
      menuName: '훌랄라 치킨',
      image: '치킨 이미지',
      price: 10000,
      stock: 30,
    };
    mockRequest.body = createMenuRequestBodyParams;

    // Service 계층에서 구현된 createMenu 메서드를 실행했을때, 반환되는 데이터 형식
    const createdMenuReturnValue = {
      menuId: 1,
      ...createMenuRequestBodyParams,
      createdAt: new Date().toString,
      updatedAt: new Date().toString,
    };

    mockMenuService.createMenu.mockReturnValue(createdMenuReturnValue);

    await menuController.createMenu(mockRequest, mockResponse, mockNext);
    expect(mockMenuService.createMenu).toHaveBeenCalledTimes(1);
    expect(mockMenuService.createMenu).toHaveBeenCalledWith(
      createMenuRequestBodyParams.userId,
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

  test('updateMethod By Success', async () => {
    const updateMenuRequestBodyParams = {
      userId: 1,
      menuName: '수정할 메뉴이름',
      image: '수정할 이미지 URL',
      price: 1000,
      stock: 29,
    };

    mockRequest.body = updateMenuRequestBodyParams;

    // service 계층에서 구현된 updateMenu 메소드를 실행하였을 때, 반환되는 데이터 형식
    const updatedMenuReturnValue = {
      menuId: 1,
      ...updateMenuRequestBodyParams,
      createdAt: new Date().toString,
      updatedAt: new Date().toString,
    };

    mockMenuService.updateMenu.mockReturnValue(updatedMenuReturnValue);

    await menuController.updateMenu(mockRequest, mockResponse, mockNext);
    expect(mockMenuService.updateMenu).toHaveBeenCalledTimes(1);
    expect(mockMenuService.updateMenu).toHaveBeenCalledWith(
      updateMenuRequestBodyParams.userId,
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
});
