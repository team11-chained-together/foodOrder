export class UserOrderService {
  constructor(userOrderRepository, menuRepository) {
    this.userOrderRepository = userOrderRepository;
    this.menuRepository = menuRepository;
  }

  createUserOrder = async (userId, storeId, menuId, quantity) => {
    let totalPrice = 0;

    const orderData = await this.userOrderRepository.getOrderData(userId);

    for (let i = 0; i < menuId.length; i++) {
      const checkStock = await this.userOrderRepository.getMenuData(menuId[i]);

      if (checkStock.stock < quantity[i]) {
        throw new Error('주문하신 메뉴의 재고가 부족 합니다.');
      }

      const updateStock = await this.userOrderRepository.updateStock(menuId[i], quantity[i]);
      console.log(`주문수량${i}: ${quantity[i]}`);
      console.log(`변경수량${i}: ${menuId[i]}`);
      const createOrderMenu = await this.userOrderRepository.createOrderMenu(orderData.orderId, menuId[i], quantity[i])
    }


    let index = 0;
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

    const updateCash = await this.userOrderRepository.updateCash(totalPrice, userId, storeId);

    const createOrder = await this.userOrderRepository.createOrder(storeId, userId, totalPrice);


    const getOrderMenu = await this.userOrderRepository.getOrderMenu(orderData.orderId);

    return {
      orderId: orderData.orderId,
      userId: orderData.userId,
      statement: orderData.statement,
      storeId: orderData.storeId,
      createdAt: orderData.createdAt,
      orderMenu:{
        orderMenuId: getOrderMenu.orderMenuId,
        orderId: getOrderMenu.orderId,
        menuId: getOrderMenu.menuId,
        quantity: getOrderMenu.quantity,
      }
    }
  };

}
