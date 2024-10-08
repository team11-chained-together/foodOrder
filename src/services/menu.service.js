export class MenuService {
  constructor(menuRepository) {
    this.menuRepository = menuRepository;
  }

  createMenu = async (userId, menuName, image, price, stock) => {
    // 여기서도 storeId를 받아야할 삘인데: 유저아이디로 찾아 주세요
    // 메뉴 생성
    const checkStoreId = await this.menuRepository.findStoreIdByUserId(userId);
    // getMenu 메서드로 동일한 이름의 메뉴가 존재하는지 확인 필요
    const isMenuNameExists = await this.menuRepository.findMenuName(checkStoreId.storeId, menuName);

    if (isMenuNameExists) {
      throw new Error('이미 존재하는 메뉴 이름입니다.');
    }

    const createdMenu = await this.menuRepository.createMenu(
      checkStoreId.storeId,
      menuName,
      image,
      price,
      stock,
    );

    return {
      menuId: createdMenu.menuId,
      storeId: createdMenu.storeId,
      menuName: createdMenu.menuName,
      image: createdMenu.image,
      price: createdMenu.price,
      stock: createdMenu.stock,
      createdAt: createdMenu.createdAt,
      updatedAt: createdMenu.updatedAt,
    };
  };

  updateMenu = async (userId, menuName, image, price, stock) => {
    const checkStoreId = await this.menuRepository.findStoreIdByUserId(userId);
    // getMenu 메서드로 동일한 이름의 메뉴가 존재하는지 확인 필요
    const isMenuNameExists = await this.menuRepository.findMenuName(checkStoreId.storeId, menuName);

    if (!isMenuNameExists) {
      throw new Error('존재하지 않는 메뉴입니다.');
    }

    const updatedMenu = await this.menuRepository.updateMenu(
      checkStoreId.storeId,
      isMenuNameExists.menuName, // 검색을 위한 메뉴 이름
      menuName, // 업데이트할 메뉴 이름
      image,
      price,
      stock,
    );

    return {
      menuId: updatedMenu.menuId,
      menuName: updatedMenu.menuName,
      image: updatedMenu.image,
      price: updatedMenu.price,
      stock: updatedMenu.stock,
      createdAt: updatedMenu.createdAt,
      updatedAt: updatedMenu.updatedAt,
    };
  };
}
