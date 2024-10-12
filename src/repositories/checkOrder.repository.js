export class CheckOrderRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  findStorIdByUserId = async (userId) => {
    const store = await this.prisma.store.findFirst({
      where: { userId: userId },
    });

    return store;
  };

  findOrderIdByStoreId = async (storeId) => {
    const order = await this.prisma.order.findMany({
      where: {
        storeId: storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return order;
  };

  findOrderIdByUserId = async (userId) => {
    const order = await this.prisma.order.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });

    return order;
  };

  findOrderByOrderId = async (orderId) => {
    const order = await this.prisma.order.findUnique({
      where: { orderId: orderId },
    });
    return order;
  };

  updateOrderStatement = async (orderId, statement) => {
    const updatedOrder = await this.prisma.order.update({
      where: { orderId: +orderId },
      data: {
        statement: statement,
      },
    });
    return updatedOrder;
  };
}
