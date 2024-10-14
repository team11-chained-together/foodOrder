import { beforeEach, describe, jest, test } from '@jest/globals';
import { UserOrderController } from '../../../src/controllers/userOrder.controller';

const mockUserOrderservice = {
  createUserOrder: jest.fn(),
};

const mockRequest = {
  body: {},
  user: {},
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const userOrderController = new UserOrderController(mockUserOrderservice);

describe('유저오더 컨트롤러 유닛 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('유저 오더 성공 테스트', async () => {
    const createUserOrderBodyParams = {
      storeId: 1,
      menuId: 1,
      quantity: 2,
    };
    mockRequest.body = createUserOrderBodyParams;
    mockRequest.user = { userId: 1 };

    const createUserOrderValue = {
      orderId: 1,
      userId: 1,
      statement: orderData.statement,
      storeId: 1,
      createdAt: new Date().toString,
      //   orderMenu: ,
    };
  });
});
