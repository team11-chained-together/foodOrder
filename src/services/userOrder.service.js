export class UserOrderService {
  constructor(userOrderRepository, menuRepository) {
    this.userOrderRepository = userOrderRepository;
    this.menuRepository = menuRepository;
  }

  createUserOrder = async (userId, storeId, menuId, quantity) => {
    let totalPrice = 0;
    let index = 0;

    console.log(menuId.length);

    for (const element of menuId) {
      const menu = await this.menuRepository.findMenuById(element);
      // 메뉴 가격 * 주문수량
      totalPrice += menu.price * quantity[index];
      index++;

      const user = await this.userOrderRepository.getUserPoint(userId);

      if (user.point < totalPrice) {
        throw new Error('잔액이 부족합니다.');
      }
    }

    for (let i = 0; i < menuId.length; i++) {
      const checkStock = await this.userOrderRepository.getMenuData(menuId[i]);

      if (checkStock.stock < quantity[i]) {
        throw new Error('주문하신 메뉴의 재고가 부족 합니다.');
      }

      await this.userOrderRepository.updateStock(menuId[i], quantity[i]);
    }

    await this.userOrderRepository.createOrder(storeId, userId, totalPrice);

    const orderData = await this.userOrderRepository.getOrderData(userId);

    for (let i = 0; i < menuId.length; i++) {
      await this.userOrderRepository.createOrderMenu(orderData.orderId, menuId[i], quantity[i]);
    }

    await this.userOrderRepository.updateCash(totalPrice, userId, storeId, orderData.orderId);

    const getOrderMenu = await this.userOrderRepository.getOrderMenu(orderData.orderId);

    return {
      orderId: orderData.orderId,
      userId: orderData.userId,
      statement: orderData.statement,
      storeId: orderData.storeId,
      createdAt: orderData.createdAt,
      orderMenu: getOrderMenu,
    };
  };
}
