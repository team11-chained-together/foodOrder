export class MenuRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findMenuName = async (storeId, menuName) => {
    const menu = await this.prisma.menu.findUnique({
      where: {
        storeId: +storeId,
        menuName,
      },
    });
    return menu;
  };

  findStoreIdByUserId = async (userId) => {
    // ORM인 Prisma에서 findFirst 메서드를 사용해 데이터를 요청합니다.
    const menu = await this.prisma.menu.findFirst({
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
