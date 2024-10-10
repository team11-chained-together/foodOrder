export class MenuController {
  constructor(menuService) {
    this.menuService = menuService;
  }

  createMenu = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const type = req.user.type;
      const { menuName, image, price, stock } = req.body;

      // 사장과 손님 확인 작업
      if (type === false) {
        throw new Error('해당하는 유저는 사장님이 아닙니다.');
      }

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
      const userId = req.user;
      const type = req.user;
      const { menuName, image, price, stock } = req.body;

      // 사장과 손님 확인 작업
      if (type !== true) {
        throw new Error('해당하는 유저는 사장님이 아닙니다.');
      }

      const updateMenu = await this.menuService.updateMenu(userId, menuName, image, price, stock);

      return res.status(200).json({ data: updateMenu });
    } catch (err) {
      next(err);
    }
  };

  /**메뉴 삭제 */
  deleteMenu = async (req, res, next) => {
    try {
      const userId = req.user;
      const type = req.user;
      const { menuName, image, price, stock } = req.body;

      const deleteMenu = await this.menuService.updateMenu(userId, menuName, image, price, stock);

      return res.status(200).json({ data: deleteMenu });
    } catch (err) {
      next(err);
    }
  };
}
