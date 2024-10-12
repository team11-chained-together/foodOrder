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
        statement: 'PREPARE',
      },
    });

    return order;
  };
}
