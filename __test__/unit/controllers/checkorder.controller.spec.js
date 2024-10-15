import { test, jest, describe, beforeEach, expect } from '@jest/globals';
import { CheckOrderController } from '../../../src/controllers/checkOrder.controller.js';
import {
  CheckedOrder,
  UpdatedOrderStatement,
} from '../../../src/utils/validators/checkOrderValidator.js';

const mockCheckOrderService = {
  checkOrder: jest.fn(),
  checkMyOrder: jest.fn(),
  updateOrderStatement: jest.fn(),
};

const mockNext = jest.fn();

describe('체크오더 컨트롤러 유닛 테스트', () => {
  const checkeOrderController = new CheckOrderController(mockCheckOrderService);
  const mockRequest = {
    body: {},
    user: {},
  };

  const mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('체크오더 확인 성공 컨트롤러 유닛 테스트 ', async () => {
    new CheckedOrder(mockRequest.user.isOwner);
    const checkOrderBodyParams = {};
    mockRequest.user = { userId: 1, isOwner: true };

    const checkOrderReturnValue = {
      orderData: 1,
    };
    mockCheckOrderService.checkOrder.mockReturnValue(checkOrderReturnValue);
    await checkeOrderController.checkOrder(mockRequest, mockResponse, mockNext);
    expect(mockCheckOrderService.checkOrder).toHaveBeenCalledTimes(1);
    expect(mockCheckOrderService.checkOrder).toHaveBeenCalledWith(mockRequest.user.userId);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toBeCalledWith({
      data: checkOrderReturnValue,
    });
  });

  test('체크 마이 오더 확인 성공 유닛 테스트', async () => {
    mockRequest.user = { userId: 1 };

    const checkMyOrderReturnValue = {
      orderData: 1,
    };
    mockCheckOrderService.checkMyOrder.mockReturnValue(checkMyOrderReturnValue);
    await checkeOrderController.checkMyOrder(mockRequest, mockResponse, mockNext);
    expect(mockCheckOrderService.checkMyOrder).toHaveBeenCalledTimes(1);
    expect(mockCheckOrderService.checkMyOrder).toHaveBeenCalledWith(mockRequest.user.userId);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: checkMyOrderReturnValue,
    });
  });

  test('배달현황 업데이트 성공 유닛 테스트', async () => {
    new UpdatedOrderStatement(mockRequest.user.isOwner, mockRequest.body);
    mockRequest.user = { userId: 1 };
    const updateOrderBodyParams = {
      orderId: 1,
      statement: 'PREPARE',
    };
    mockRequest.body = updateOrderBodyParams;

    const updateOrderReturnValue = {
      oderId: 1,
      storeId: 1,
      statement: 'PREPARE',
    };
    mockCheckOrderService.updateOrderStatement.mockReturnValue(updateOrderReturnValue);
    await checkeOrderController.updateOrderStatement(mockRequest, mockResponse, mockNext);
    expect(mockCheckOrderService.updateOrderStatement).toHaveBeenCalledTimes(1);
    expect(mockCheckOrderService.updateOrderStatement).toHaveBeenCalledWith(
      mockRequest.user.userId,
      updateOrderBodyParams.orderId,
      updateOrderBodyParams.statement,
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: updateOrderReturnValue,
    });
  });
});
