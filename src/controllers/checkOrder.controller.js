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
      console.log(checkOrder);

      return res.status(200).json({ data: checkOrder });
    } catch (err) {
      next(err);
    }
  };
}
