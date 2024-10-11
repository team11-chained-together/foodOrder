export class UserOrderRepository {
  constructor(prisma, Prisma) {
    this.prisma = prisma;
    this.Prisma = Prisma;
  }

  getMenuData = async (menuId) => {
    const menuPrice = await this.prisma.menu.findFirst({
      where: { menuId: menuId },
    });

    return menuPrice;
  };

  getUserPoint = async (userId) => {
    const userPrice = await this.prisma.user.findUnique({
      where: { userId: userId },
    });

    return userPrice;
  };

  getOrderData = async (userId) => {
    const getOrderData = await this.prisma.order.findFirst({
      where: { userId: userId },
    });

    return getOrderData;
  };

  getOrderMenu = async (orderId) => {
    const getOrderMenu = await this.prisma.orderMenu.findFirst({
        where: {orderId: orderId},
    })
    
    return getOrderMenu;
  }

  createOrder = async (storeId, userId, totalPrice) => {
    const createdOrder = await this.prisma.order.create({
      data: {
        storeId: storeId,
        userId: userId,
        totalPrice: totalPrice,
        statement: "PREPARE",
      },
    });
    return createdOrder;
  };

  createOrderMenu = async (orderId, menuId, quantity) => {
    const createdOrderMenu = await this.prisma.orderMenu.create({
      data: {
        orderId,
        menuId,
        quantity,
      },
    });
    return createdOrderMenu;
  };

  updateStock = async (menuId, quantity) => {
    const updateStock = await this.prisma.menu.update({
      where: { menuId: menuId },
      data: {
        stock: { decrement: quantity },
      },
    });
    return updateStock;
  };

  updateCash = async (totalPrice, userId, storeId) => {
    const updateCash = await this.prisma.$transaction(
      async (tx) => {
        await tx.user.update({
          where: { userId: userId },
          data: {
            point: { decrement: totalPrice },
          },
        });

        await tx.store.update({
          where: { storeId: storeId },
          data: {
            sales: { increment: totalPrice },
          },
        });
      },
      {
        isolationLevel: this.Prisma.TransactionIsolationLevel.ReadCommitted,
      },
    );
    return updateCash;
  };
}
