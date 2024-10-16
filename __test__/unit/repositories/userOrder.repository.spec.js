import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { UserOrderRepository } from '../../../src/repositories/userOrder.repository';

describe('유저 주문 리포지토리 유닛 테스트', () => {
  const mockPrisma = {
    store: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    menu: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    order: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    orderMenu: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const userOrderRepository = new UserOrderRepository(mockPrisma);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('상점 조회 테스트 성공', async () => {
    const mockReturn = 'get store Test';

    mockPrisma.store.findFirst.mockResolvedValue(mockReturn);

    const getStoreParams = {
      storeId: 1,
    };

    const findStoreData = await userOrderRepository.getStoreData(getStoreParams.storeId);

    expect(findStoreData).toEqual(mockReturn);

    expect(mockPrisma.store.findFirst).toHaveBeenCalledTimes(1);

    expect(mockPrisma.store.findFirst).toHaveBeenCalledWith({
      where: {
        storeId: getStoreParams.storeId,
      },
    });
  });

  test('메뉴 조회 테스트 성공', async () => {
    const mockReturn = 'get menu Test';

    mockPrisma.menu.findFirst.mockResolvedValue(mockReturn);

    const getMenuParams = {
      menuId: 1,
    };

    const findMenuData = await userOrderRepository.getMenuData(getMenuParams.menuId);

    expect(findMenuData).toEqual(mockReturn);

    expect(mockPrisma.menu.findFirst).toHaveBeenCalledTimes(1);

    expect(mockPrisma.menu.findFirst).toHaveBeenCalledWith({
      where: {
        menuId: getMenuParams.menuId,
      },
    });
  });

  test('포인트 조회 테스트 성공', async () => {
    const mockReturn = 'get point Test';

    mockPrisma.user.findUnique.mockResolvedValue(mockReturn);

    const getUserParams = {
      userId: 1,
    };

    const findUserData = await userOrderRepository.getUserPoint(getUserParams.userId);

    expect(findUserData).toEqual(mockReturn);

    expect(mockPrisma.user.findUnique).toHaveBeenCalledTimes(1);

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        userId: getUserParams.userId,
      },
    });
  });

  test('주문 조회 테스트 성공', async () => {
    const mockReturn = 'get order Test';

    mockPrisma.order.findFirst.mockResolvedValue(mockReturn);

    const getOrderParams = {
      userId: 1,
    };

    const findOrderData = await userOrderRepository.getOrderData(getOrderParams.userId);

    expect(findOrderData).toEqual(mockReturn);

    expect(mockPrisma.order.findFirst).toHaveBeenCalledTimes(1);

    expect(mockPrisma.order.findFirst).toHaveBeenCalledWith({
      where: {
        userId: getOrderParams.userId,
      },
      orderBy: { createdAt: 'desc' },
    });
  });

  test('주문 메뉴 조회 테스트 성공', async () => {
    const mockReturn = 'get order Menu Test';

    mockPrisma.orderMenu.findMany.mockResolvedValue(mockReturn);

    const getOrderMenuParams = {
      orderId: 1,
    };

    const findOrderMenuData = await userOrderRepository.getOrderMenu(getOrderMenuParams.orderId);

    expect(findOrderMenuData).toEqual(mockReturn);

    expect(mockPrisma.orderMenu.findMany).toHaveBeenCalledTimes(1);

    expect(mockPrisma.orderMenu.findMany).toHaveBeenCalledWith({
      where: {
        orderId: getOrderMenuParams.orderId,
      },
    });
  });

  test('주문 생성 트랜잭션 테스트 성공', async () => {
    const mockReturn = 'createOrder transaction Test';

    mockPrisma.$transaction.mockImplementation(async (fn) => {
      return await fn(mockPrisma);
    });

    const createOrderTransactionParams = {
      storeId: 1,
      userId: 1,
      totalPrice: 10000,
      menuId: [10, 11, 12],
      quantity: [1, 1, 1],
    };

    const sampleCreatedOrder = {
      orderId: 1,
    };

    mockPrisma.order.create.mockReturnValue(sampleCreatedOrder);

    const createOrderData = await userOrderRepository.createOrder(
      createOrderTransactionParams.storeId,
      createOrderTransactionParams.userId,
      createOrderTransactionParams.totalPrice,
      createOrderTransactionParams.menuId,
      createOrderTransactionParams.quantity,
    );
    expect(createOrderData).toEqual(mockReturn);
    expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);
    expect(mockPrisma.$transaction).toHaveBeenCalledWith(
      mockPrisma.order.create({
        storeId: createOrderTransactionParams.storeId,
        userId: createOrderTransactionParams.userId,
        totalPrice: createOrderTransactionParams.totalPrice,
        statement: 'PREPARE',
      }),
    );
    expect(mockPrisma.order.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.order.create).toHaveBeenCalledWith({
      data: {
        ...createOrderTransactionParams,
        statement: 'PREPARE',
      },
    });
    expect(mockPrisma.orderMenu.create).toHaveBeenCalledTimes(3);
    expect(mockPrisma.orderMenu.create).toHaveBeenCalledWith({
      data: sampleCreatedOrder.orderId,
      menuId: menuId[0],
      quantity: quantity[0],
    });
  });
});
