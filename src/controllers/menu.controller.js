export class MenuController {
  constructor(menuService) {
    this.menuService = menuService;
  }

  createMenu = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const isOwner = req.user.isOwner;

      const { menuName, image, price, stock } = req.body;

      // 사장과 손님 확인 작업
      if (isOwner !== true) {
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
      const userId = req.user.isOwner;
      const isOwner = req.user.isOwner;
      const { menuId, menuName, image, price, stock } = req.body;

      // 사장과 손님 확인 작업
      if (isOwner !== true) {
        return res.status(400).json({ message: '해당하는 유저는 사장님이 아닙니다.' });
      }

      if (!menuId) {
        return res.status(400).json({ message: '변경할 메뉴아이디를 입력해 주세요.' });
      }

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
      const { storeName } = req.body;

      if (!storeName) {
        return res.status(200).json({ message: '해당하는 가게이름을 입력 해 주세요.' });
      }

      const getMenu = await this.menuService.getMenu(storeName);

      return res.status(200).json({ data: getMenu });
    } catch (err) {
      next(err);
    }
  };

  // 작업중
  /**메뉴 삭제 */
  deleteMenu = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const isOwner = req.user.isOwner;

      const { menuId } = req.body;

      // 사장과 손님 확인 작업
      if (isOwner !== true) {
        throw new Error('해당하는 유저는 사장님이 아닙니다.');
      }

      const deleteMenu = await this.menuService.deleteMenu(userId, menuId);

      return res.status(201).json({ data: deleteMenu });
    } catch (err) {
      next(err);
    }
  };
}
