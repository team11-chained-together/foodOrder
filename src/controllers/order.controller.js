export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }
  postOrder = async (req, res, next) => {
    const userId = req.user.userId;
    const { storeName, status } = req.body;
  };
}
