export class StoreRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  //음식점 검색 기능 -> 음식점 이름,음식이름,지역,푸드타입(피자면 피자)으로 검색

  searchStores = async (search) => {
    const stores = await this.prisma.store.findMany({
      where: {
        //이중 하나의 값이라도 해당하면 검색
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
        ],
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

  updateStore = async (userId, storeId, storeName, foodType) => {
    const updatedStore = await this.prisma.store.update({
      where: {
        userId: userId,
        storeId: storeId,
      },
      data: {
        storeName: storeName,
        foodType: foodType,
      },
    });

    return updatedStore;
  };

  deleteStore = async (userId, storeId) => {
    const deletedStore = await this.prisma.store.delete({
      where: {
        userId: userId,
        storeId: storeId,
      },
    });

    return deletedStore;
  };

  findStore = async () => {
    const getStore = await this.prisma.store.findMany();

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
