import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { CheckOrderRepository } from '../../../src/repositories/checkOrder.repository';

let mockPrisma = {
  store: {
    findFirst: jest.fn(),
  },
  order: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

let checkOrderRepository = new CheckOrderRepository(mockPrisma);

describe('주문 확인 리포지토리 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('findStorIdByUserId 메서드 테스트 성공', async () => {
    const mockReturn = {
      userId: 1,
    };

    mockPrisma.store.findFirst.mockReturnValue(mockReturn);

    const findStorIdByUserIdParams = { userId: 1 };

    const findStorIdByUserId = await checkOrderRepository.findStorIdByUserId(
      findStorIdByUserIdParams.userId,
    );

    expect(findStorIdByUserId).toEqual(mockReturn);
    expect(mockPrisma.store.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.store.findFirst).toHaveBeenCalledWith({
      where: {
        userId: findStorIdByUserIdParams.userId,
      },
    });
  });

  test('findOrderIdByStoreId 메서드 테스트 성공', async () => {
    const mockReturn = { storeId: 1 };

    mockPrisma.order.findMany.mockReturnValue(mockReturn);

    const findOrderIdByStoreIdParams = {
      storeId: 1,
    };

    const findOrderIdByStoreId = await checkOrderRepository.findOrderIdByStoreId(
      findOrderIdByStoreIdParams.storeId,
    );

    expect(findOrderIdByStoreId).toEqual(mockReturn);
    expect(mockPrisma.order.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrisma.order.findMany).toHaveBeenCalledWith({
      where: {
        storeId: findOrderIdByStoreIdParams.storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  });

  test('findOrderIdByUserId 메서드 테스트 성공', async () => {
    const mockReturn = {
      userId: 1,
    };

    mockPrisma.order.findMany.mockReturnValue(mockReturn);

    const findOrderIdByUserIdParams = {
      userId: 1,
    };

    const findOrderIdByUserId = await checkOrderRepository.findOrderIdByUserId(
      findOrderIdByUserIdParams.userId,
    );

    expect(findOrderIdByUserId).toEqual(mockReturn);
    expect(mockPrisma.order.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrisma.order.findMany).toHaveBeenCalledWith({
      where: { userId: findOrderIdByUserIdParams.userId },
      orderBy: { createdAt: 'desc' },
    });
  });

  test('findOrderByOrderId 메서드 테스트 성공', async () => {
    const mockReturn = { orderId: 1 };
    mockPrisma.order.findUnique.mockReturnValue(mockReturn);

    const findOrderByOrderIdParams = {
      orderId: 1,
    };

    const findOrderByOrderId = await checkOrderRepository.findOrderByOrderId(
      findOrderByOrderIdParams.orderId,
    );

    expect(findOrderByOrderId).toEqual(mockReturn);
    expect(mockPrisma.order.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrisma.order.findUnique).toHaveBeenCalledWith({
      where: { orderId: findOrderByOrderIdParams.orderId },
    });
  });

  test('updateOrderStatement 메서드 테스트 성공', async () => {
    const mockReturn = {
      orderId: 1,
      storeId: 2,
      statement: 'statement',
    };
    mockPrisma.order.update.mockReturnValue(mockReturn);

    const updateOrderStatementParams = {
      orderId: 1,
      storeId: 2,
      statement: 'statement',
    };

    const updateOrderStatement = await checkOrderRepository.updateOrderStatement(
      updateOrderStatementParams.orderId,
      updateOrderStatementParams.storeId,
      updateOrderStatementParams.statement,
    );

    expect(updateOrderStatement).toEqual(mockReturn);
    expect(mockPrisma.order.update).toHaveBeenCalledTimes(1);
    expect(mockPrisma.order.update).toHaveBeenCalledWith({
      where: {
        orderId: updateOrderStatementParams.orderId,
        storeId: updateOrderStatementParams.storeId,
      },
      data: {
        statement: updateOrderStatementParams.statement,
      },
    });
  });
});
