export class MenuController {
  constructor(menuService) {
    this.menuService = menuService;
  }

  createMenu = async (req, res, next) => {
    try {
      const { menuName, image, price, stock } = req.body;

      if (!menuName || !image || !price || !stock) {
        throw new Error('InvalidParamsError');
      }

      const createdMenu = await this.menuService.createMenu(menuName, image, price, stock);

      return res.status(200).json({ data: createdMenu });
    } catch (err) {
      next(err);
    }
  };
}
