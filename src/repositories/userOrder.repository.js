export class UserOrderRepository {
  constructor(prisma, Prisma) {
    this.prisma = prisma;
    this.Prisma = Prisma;
  }
  getStoreData = async (storeId) => {
    const store = await this.prisma.store.findFirst({
      where: { storeId: storeId },
    });

    return store;
  };

  getMenuData = async (menuId) => {
    const menuData = await this.prisma.menu.findFirst({
      where: { menuId: menuId },
    });

    return menuData;
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
      orderBy: { createdAt: 'desc' },
    });

    return getOrderData;
  };

  getOrderMenu = async (orderId) => {
    const getOrderMenu = await this.prisma.orderMenu.findMany({
      where: { orderId: orderId },
    });

    return getOrderMenu;
  };

  createOrder = async (storeId, userId, totalPrice, menuId, quantity) => {
    const createOrder = await this.prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          storeId: storeId,
          userId: userId,
          totalPrice: totalPrice,
          statement: 'PREPARE',
        },
      });
      for (let i = 0; i < menuId.length; i++) {
        let create = await tx.orderMenu.create({
          data: {
            orderId: createdOrder.orderId,
            menuId: menuId[i],
            quantity: quantity[i],
          },
        });
        console.log(create);
      }
    });
    return createOrder;
  };

  updateCash = async (totalPrice, userId, storeId, menuId, quantity) => {
    const updateCash = await this.prisma.$transaction(
      async (tx) => {
        for (let i = 0; i < menuId.length; i++) {
          await tx.menu.update({
            where: { menuId: menuId[i] },
            data: {
              stock: { decrement: quantity[i] },
            },
          });
        }

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
