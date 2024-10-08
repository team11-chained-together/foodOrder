export class MenuController {
  constructor(menuService) {
    this.menuService = menuService;
  }

  createMenu = async (req, res, next) => {
    try {
      const { userId, menuName, image, price, stock } = req.body;

      if (!menuName || !image || !price || !stock) {
        throw new Error('InvalidParamsError');
      }

      const createdMenu = await this.menuService.createMenu(userId, menuName, image, price, stock);

      return res.status(201).json({ data: createdMenu });
    } catch (err) {
      next(err);
    }
  };

  updateMenu = async (req, res, next) => {
    try {
      const { userId, menuName, image, price, stock } = req.body;

      const updateMenu = await this.menuService.updateMenu(userId, menuName, image, price, stock);

      return res.status(200).json({ data: updateMenu });
    } catch (err) {
      next(err);
    }
  };
}
