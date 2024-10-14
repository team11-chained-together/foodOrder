import { test, jest, describe, beforeEach, expect } from '@jest/globals';
import { CheckOrderController } from '../../../src/controllers/checkOrder.controller.js';
import {
  CheckedOrder,
  UpdatedOrderStatement,
} from '../../../src/utils/validators/checkOrderValidator.js';
import { json } from 'express';

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
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: checkMyOrderReturnValue,
    });
  });
});
