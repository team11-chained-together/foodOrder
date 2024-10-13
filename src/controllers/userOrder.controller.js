export class UserOrderController {
  constructor(userOrderService) {
    this.userOrderService = userOrderService;
  }

  createUserOrder = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const { storeId, menuId, quantity } = req.body;

      const createdUserOrder = await this.userOrderService.createUserOrder(
        userId,
        storeId,
        menuId,
        quantity,
      );
      return res.status(201).json({ data: createdUserOrder });
    } catch (err) {
      next(err);
    }
  };
}
