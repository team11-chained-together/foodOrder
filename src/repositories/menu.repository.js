export class MenuRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findMenuByStoreId = async (storeId, menuName) => {
    const menu = await this.prisma.menu.findUnique({
      where: {
        storeId_menuName: { storeId: +storeId, menuName },
      },
    });
    return menu;
  };

  findStoreIdByUserId = async (userId) => {
    const store = await this.prisma.store.findFirst({
      where: { userId: userId },
    });

    return store;
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

  deleteMenu = async (menuId) => {
    const deleteMenu = await this.prisma.menu.delete({
      where: { menuId: menuId },
    });
    return deleteMenu;
  };

  findMenuByMenuId = async (storeId, menuId) => {
    const menu = await this.prisma.menu.findFirst({
      where: { storeId: storeId, menuId: menuId },
    });
    return menu;
  };

  findStore = async (storeId) => {
    const getStore = await this.prisma.store.findFirst({
      where: {
        storeId: storeId,
      },
    });

    return getStore;
  };

  findMenuByStoreId = async (storeId) => {
    const getMenu = await this.prisma.menu.findMany({
      where: { storeId: storeId },
      orderBy: { createdAt: 'asc' },
    });

    return getMenu;
  };
}
