import { UserOrderValidation } from '../utils/validators/controller/userOrderValidator.js';

export class UserOrderController {
  constructor(userOrderService) {
    this.userOrderService = userOrderService;
  }

  createUserOrder = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const userOrderValidation = new UserOrderValidation(req.body);
      userOrderValidation.validate();

      const createdUserOrder = await this.userOrderService.createUserOrder(
        userId,
        userOrderValidation.storeId,
        userOrderValidation.menuId,
        userOrderValidation.quantity,
      );
      return res.status(201).json({ data: createdUserOrder });
    } catch (err) {
      next(err);
    }
  };
}
