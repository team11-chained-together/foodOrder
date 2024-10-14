import { CheckedOrder, UpdatedOrderStatement } from '../utils/validators/checkOrderValidator.js';
export class CheckOrderController {
  constructor(checkOrderService) {
    this.checkOrderService = checkOrderService;
  }

  checkOrder = async (req, res, next) => {
    try {
      const checkedOrder = new CheckedOrder(req.user.isOwner);
      checkedOrder.validate();

      const userId = req.user.userId;

      const checkOrder = await this.checkOrderService.checkOrder(userId);

      return res.status(200).json({ data: checkOrder });
    } catch (err) {
      next(err);
    }
  };

  checkMyOrder = async (req, res, next) => {
    try {
      const userId = req.user.userId;

      const checkMyOrder = await this.checkOrderService.checkMyOrder(userId);

      return res.status(200).json({ data: checkMyOrder });
    } catch (err) {
      next(err);
    }
  };

  updateOrderStatement = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const updatedOrderStatement = new UpdatedOrderStatement(req.user.isOwner, req.body);
      updatedOrderStatement.validate();

      const updateOrder = await this.checkOrderService.updateOrderStatement(
        userId,
        updatedOrderStatement.orderId,
        updatedOrderStatement.statement,
      );

      return res.status(200).json({ data: updateOrder });
    } catch (error) {
      next(error);
    }
  };
}
