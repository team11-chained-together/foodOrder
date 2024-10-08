export class StoreRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findStoreByUserId = async (userId) => {
    // ORM인 Prisma에서 Posts 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
    const store = await this.prisma.store.findUnique({
      where: { userId: +userId },
    });

    return store;
  };

  createStore = async (userId, storeName, foodType) => {
    const createdStore = await this.prisma.store.create({
      data: {
        userId: +userId,
        storeName: storeName,
        foodType: foodType,
        sales: 0,
      },
    });

    return createdStore;
  };

  updateStore = async (userId, storeName, foodType) => {
    const updatedStore = await this.prisma.store.update({
      where: {
        userId: +userId,
      },
      data: {
        storeName: storeName,
        foodType: foodType,
      },
    });

    return updatedStore;
  };

  deleteStore = async (userId) => {
    const deletedStore = await this.prisma.store.delete({
      where: {
        userId: +userId,
      },
    });

    return deletedStore;
  };

  findStoreByStoreName = async (storeName) => {
    const getStore = await this.prisma.store.findFirst({
      where: {
        storeName: storeName,
      },
    });
  };
}
