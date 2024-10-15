export class StoreRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  searchStores = async (search) => {
    const stores = await this.prisma.store.findMany({
      where: {
        OR: [
          {
            storeName: { contains: search },
          },
          {
            foodType: { contains: search },
          },
          {
            location: { contains: search },
          },
          {
            menu: {
              some: {
                menuName: { contains: search },
              },
            },
          },
        ],
      },
      include: {
        menu: true,
      },
    });
    return stores;
  };

  findStoreByUserId = async (userId) => {
    const store = await this.prisma.store.findUnique({
      where: { userId: +userId },
    });

    return store;
  };

  createStore = async (userId, storeName, location, foodType) => {
    const createdStore = await this.prisma.store.create({
      data: {
        userId: +userId,
        storeName: storeName,
        location: location,
        foodType: foodType,
        sales: 0,
      },
    });

    return createdStore;
  };

  updateStore = async (userId, storeName, foodType, location) => {
    const updatedStore = await this.prisma.store.update({
      where: {
        userId: userId,
      },
      data: {
        storeName: storeName,
        foodType: foodType,
        location: location,
      },
    });

    return updatedStore;
  };

  deleteStore = async (userId) => {
    const deletedStore = await this.prisma.store.delete({
      where: {
        userId: userId,
      },
    });

    return deletedStore;
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

  findStore = async () => {
    const getStore = await this.prisma.store.findMany();

    return getStore;
  };
}
