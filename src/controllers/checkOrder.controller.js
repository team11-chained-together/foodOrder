import { Statement } from '@prisma/client';

export class CheckOrderController {
  constructor(checkOrderService) {
    this.checkOrderService = checkOrderService;
  }

  checkOrder = async (req, res, next) => {
    try {
      const { userId, isOwner } = req.user;
      if (!isOwner) {
        throw new Error('사장님만 접근 가능한 페이지입니다.');
      }
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
      const isOwner = req.user.isOwner;
      const { orderId, statement } = req.body;

      if (!isOwner) {
        throw new Error('사장님만 접근 가능한 페이지입니다.');
      }

      if (
        statement !== 'PREPARE' &&
        statement !== 'IN_DELIVERY' &&
        statement !== 'DELIVERY_COMPLETE'
      ) {
        throw new Error('올바른 상태값을 입력해주세요.');
      }

      const updateOrder = await this.checkOrderService.updateOrderStatement(orderId, statement);

      return res.status(200).json({ data: updateOrder });
    } catch (error) {
      next(error);
    }
  };
}
