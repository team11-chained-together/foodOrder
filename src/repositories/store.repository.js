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

  // userId로 가게를 생성하기 위한 로직
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

  // userId로 storeName, foodType을 변경하기 위한 로직
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

  // userId로 가게를 삭제하기 위한 로직
  deleteStore = async (userId) => {
    const deletedStore = await this.prisma.store.delete({
      where: {
        userId: +userId,
      },
    });

    return deletedStore;
  };

  // storeName으로 가게를 찾기 위한 로직
  findStoreByStoreName = async (storeName) => {
    const getStore = await this.prisma.store.findFirst({
      where: {
        storeName: storeName,
      },
    });

    return getStore;
  };

  // storeId로 메뉴 테이블에 있는 menuName을 가져오기 위한 로직
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
