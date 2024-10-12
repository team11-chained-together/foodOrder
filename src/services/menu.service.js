export class MenuService {
  constructor(menuRepository) {
    this.menuRepository = menuRepository;
  }

  createMenu = async (userId, menuName, image, price, stock) => {
    const checkStoreId = await this.menuRepository.findStoreIdByUserId(userId);

    const isMenuNameExists = await this.menuRepository.findMenuNameByStoreId(
      checkStoreId.storeId,
      menuName,
    );

    if (isMenuNameExists) {
      throw new Error('저희 가게에 이미 존재하는 메뉴 이름입니다.');
    }

    const createdMenu = await this.menuRepository.createMenu(
      checkStoreId.storeId,
      menuName,
      image,
      price,
      stock,
    );

    return {
      storeId: createdMenu.storeId,
      menuId: createdMenu.menuId,
      menuName: createdMenu.menuName,
      image: createdMenu.image,
      price: createdMenu.price,
      stock: createdMenu.stock,
      createdAt: createdMenu.createdAt,
      updatedAt: createdMenu.updatedAt,
    };
  };

  updateMenu = async (userId, menuId, menuName, image, price, stock) => {
    const checkStoreId = await this.menuRepository.findStoreIdByUserId(userId);

    const isMenuNameExists = await this.menuRepository.findMenuByMenuId(
      checkStoreId.storeId,
      menuId,
    );

    if (!isMenuNameExists) {
      throw new Error('저희 가게에 존재하지 않는 메뉴입니다.');
    }

    const updatedMenu = await this.menuRepository.updateMenu(menuId, menuName, image, price, stock);

    return {
      menuId: updatedMenu.menuId,
      menuName: updatedMenu.menuName,
      image: updatedMenu.image,
      price: updatedMenu.price,
      stock: updatedMenu.stock,
      updatedAt: updatedMenu.updatedAt,
    };
  };

  getMenu = async (storeId) => {
    const store = await this.menuRepository.findStore(storeId);

    if (!store) {
      throw new Error('해당하는 음식점이 없습니다.');
    }

    const menu = await this.menuRepository.findMenuByStoreId(storeId);

    return {
      storeId: store.storeId,
      storeName: store.storeName,
      foodType: store.foodType,
      menu: menu,
    };
  };

  deleteMenu = async (userId, menuId) => {
    const checkStoreId = await this.menuRepository.findStoreIdByUserId(userId);

    const isMenuNameExists = await this.menuRepository.findMenuByMenuId(
      checkStoreId.storeId,
      menuId,
    );

    if (!isMenuNameExists) {
      throw new Error('저희 가게에 존재하지 않는 메뉴입니다.');
    }

    const deleteMenu = await this.menuRepository.deleteMenu(menuId);

    return {
      menuId: deleteMenu.menuId,
      menuName: deleteMenu.menuName,
      image: deleteMenu.image,
      price: deleteMenu.price,
      stock: deleteMenu.stock,
    };
  };
}
