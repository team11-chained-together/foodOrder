import { CreateMenu, UpdateMenu, DeleteMenu, GetMenu } from '../utils/validators/menuValidator.js';

export class MenuController {
  constructor(menuService) {
    this.menuService = menuService;
  }

  createMenu = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const createMenu = new CreateMenu(isOwner, req.body);
      createMenu.validate();

      const createdMenu = await this.menuService.createMenu(userId, menuName, image, price, stock);

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
        menuId,
        menuName,
        image,
        price,
        stock,
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

      const menu = await this.menuService.getMenu(storeId);

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

      const deleteMenu = await this.menuService.deleteMenu(userId, menuId);

      return res.status(204).json({ data: deleteMenu });
    } catch (err) {
      next(err);
    }
  };
}
