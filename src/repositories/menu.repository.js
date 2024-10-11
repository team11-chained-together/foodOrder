export class MenuRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findMenuName = async (storeId, menuName) => {
    const menu = await this.prisma.menu.findUnique({
      where: {
        storeId_menuName: { storeId: +storeId, menuName },
      },
    });
    return menu;
  };

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

  updateMenu = async (storeId, menuName, newMenuName, image, price, stock) => {
    // TODO: 값 확인해보고 공유하기!
    const updatedMenu = await this.prisma.menu.update({
      where: {
        storeId: +storeId,
        menuName,
      },
      data: {
        menuName: newMenuName,
        image: image,
        price: price,
        stock: stock,
      },
    });
    return updatedMenu;
  };
}
