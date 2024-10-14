export class UserOrderService {
  constructor(userOrderRepository) {
    this.userOrderRepository = userOrderRepository;
  }

  createUserOrder = async (userId, storeId, menuId, quantity) => {
    let totalPrice = 0;
    let index = 0;

    const checkStore = await this.userOrderRepository.getStoreData(storeId);
    if (!checkStore) {
      throw new Error('해당하는 가게가 존재하지 않습니다.');
    }

    for (let i = 0; i < Array(menuId).length; i++) {
      const checkMenu = await this.userOrderRepository.getMenuData(menuId[i]);
      if (!checkMenu) {
        throw new Error('해당하는 메뉴가 존재하지 않습니다.');
      }
      if (checkMenu.stock === 0) {
        throw new Error('해당하는 메뉴의 재고가 없습니다.');
      }
    }

    for (const element of menuId) {
      const menu = await this.userOrderRepository.getMenuData(element);
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
    }

    await this.userOrderRepository.createOrder(storeId, userId, totalPrice, menuId, quantity);

    const orderData = await this.userOrderRepository.getOrderData(userId);

    await this.userOrderRepository.updateCash(
      totalPrice,
      userId,
      storeId,
      orderData.orderId,
      menuId,
      quantity,
    );

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
