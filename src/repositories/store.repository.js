export class StoreRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findStoreByUserId = async (userId) => {
    const store = await this.prisma.store.findUnique({
      where: { userId: +userId },
    });

    return store;
  };

  createStore = async (userId, storeName, foodType, location) => {
    const createdStore = await this.prisma.store.create({
      data: {
        userId: +userId,
        storeName: storeName,
        foodType: foodType,
        sales: 0,
        location: location,
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

    return getStore;
  };

  findMenuByStoreId = async (storeId) => {
    const getMenu = await this.prisma.menu.findMany({
      where: { storeId: storeId },
      select: {
        menuId: true,
        menuName: true,
        image: true,
        price: true,
        stock: true,
      },
    });

    return getMenu;
  };
}
