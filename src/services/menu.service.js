import {
  CreateMenuValidation,
  CreateIsMenuNameValidation,
  UpdateMenuValidation,
  GetMenuValidation,
} from '../utils/validators/service/menuValidator.js';

export class MenuService {
  constructor(menuRepository) {
    this.menuRepository = menuRepository;
  }

  createMenu = async (userId, menuName, image, price, stock) => {
    const checkStoreId = await this.menuRepository.findStoreIdByUserId(userId);
    const checkStoreIdValidation = new CreateMenuValidation(checkStoreId);
    checkStoreIdValidation.validate();

    const isMenuNameExists = await this.menuRepository.findMenuByStoreId(
      checkStoreId.storeId,
      menuName,
    );

    const createMenuValidation = new CreateIsMenuNameValidation(isMenuNameExists);
    createMenuValidation.validate();

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
    const checkStoreIdValidation = new CreateMenuValidation(checkStoreId);
    checkStoreIdValidation.validate();

    const isMenuNameExists = await this.menuRepository.findMenuByMenuId(
      checkStoreId.storeId,
      menuId,
    );

    const updateMenuValidation = new UpdateMenuValidation(isMenuNameExists);
    updateMenuValidation.validate();

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

    const getStoreValidation = new GetMenuValidation(store);
    getStoreValidation.validate();

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
    const checkStoreIdValidation = new CreateMenuValidation(checkStoreId);
    checkStoreIdValidation.validate();

    const isMenuNameExists = await this.menuRepository.findMenuByMenuId(
      checkStoreId.storeId,
      menuId,
    );

    const deleteMenuValidation = new UpdateMenuValidation(isMenuNameExists);
    deleteMenuValidation.validate();

    const deleteMenu = await this.menuRepository.deleteMenu(menuId);

    return {
      deleteMenu,
    };
  };
}
