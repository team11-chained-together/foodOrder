import {
  CreateMenu,
  UpdateMenu,
  DeleteMenu,
  GetMenu,
} from '../utils/validators/controller/menuValidator.js';

export class MenuController {
  constructor(menuService) {
    this.menuService = menuService;
  }

  createMenu = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const createMenu = new CreateMenu(req.user.isOwner, req.body);
      createMenu.validate();

      const createdMenu = await this.menuService.createMenu(
        userId,
        createMenu.menuName,
        createMenu.image,
        createMenu.price,
        createMenu.stock,
      );

      return res.status(201).json({ data: createdMenu });
    } catch (err) {
      next(err);
    }
  };

  updateMenu = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const updatedMenu = new UpdateMenu(req.user.isOwner, req.body);
      updatedMenu.validate();

      const updateMenu = await this.menuService.updateMenu(
        userId,
        updatedMenu.menuId,
        updatedMenu.menuName,
        updatedMenu.image,
        updatedMenu.price,
        updatedMenu.stock,
      );

      return res.status(200).json({ data: updateMenu });
    } catch (err) {
      next(err);
    }
  };

  getMenu = async (req, res, next) => {
    try {
      const getMenu = new GetMenu(req.body);
      getMenu.validate();

      const menu = await this.menuService.getMenu(getMenu.storeId);

      return res.status(200).json({ data: menu });
    } catch (err) {
      next(err);
    }
  };

  deleteMenu = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const deletedMenu = new DeleteMenu(req.user.isOwner, req.body);
      deletedMenu.validate();

      const deleteMenu = await this.menuService.deleteMenu(userId, deletedMenu.menuId);
      return res.status(200).json({ message: '메뉴 삭제를 성공하였습니다.', data: deleteMenu });
    } catch (err) {
      next(err);
    }
  };
}
