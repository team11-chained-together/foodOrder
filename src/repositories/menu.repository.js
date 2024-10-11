export class MenuRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findMenuName = async (storeId, menuName) => {
    const menu = await this.prisma.menu.findUnique({
      where: {
        storeId_menuName: {
          storeId: +storeId,
          menuName,
        },
      },
    });
    return menu;
  };

  // userId를 사용해서 store 테이블에서 storeId를 가져오기 위한 로직
  findStoreIdByUserId = async (userId) => {
    const menu = await this.prisma.store.findFirst({
      where: { userId: +userId },
    });

    return menu;
  };

  createMenu = async (storeId, menuName, image, price, stock) => {
    const createdMenu = await this.prisma.menu.create({
      data: {
        storeId: storeId,
        menuName: menuName,
        image: image,
        price: price,
        stock: stock,
      },
    });

    return createdMenu;
  };

  updateMenu = async (menuId, menuName, image, price, stock) => {
    const updatedMenu = await this.prisma.menu.update({
      where: {
        menuId: menuId,
      },
      data: {
        menuName: menuName,
        image: image,
        price: price,
        stock: stock,
      },
    });
    return updatedMenu;
  };
  // 업데이트시 이미지링크만 수정 불가능한거 수정요망 10/11 15:31

  deleteMenu = async (menuId) => {
    const deleteMenu = await this.prisma.menu.delete({
      where: { menuId: menuId },
    });
    return deleteMenu;
  };

  findMenuById = async (menuId) => {
    const menu = await this.prisma.menu.findUnique({
      where: { menuId: menuId },
    });
    return menu;
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
        menuName: true,
        image: true,
        price: true,
        stock: true,
      },
    });

    return getMenu;
  };
}
