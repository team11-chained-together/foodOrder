import {
  CheckStoreValidation,
  CheckMenuValidation,
  PointValidation,
  StockValidation,
} from '../utils/validators/service/userOrderValidator.js';

export class UserOrderService {
  constructor(userOrderRepository) {
    this.userOrderRepository = userOrderRepository;
  }

  createUserOrder = async (userId, storeId, menuId, quantity) => {
    let totalPrice = 0;
    let index = 0;

    const checkStore = await this.userOrderRepository.getStoreData(storeId);
    const checkStoreValidation = new CheckStoreValidation(checkStore);
    checkStoreValidation.validate();
    for (let i = 0; i < Array(menuId).length; i++) {
      const checkMenu = await this.userOrderRepository.getMenuData(menuId[i]);
      const checkMenuValidation = new CheckMenuValidation(checkMenu);
      checkMenuValidation.validate;
    }

    for (const element of menuId) {
      const menu = await this.userOrderRepository.getMenuData(element);
      totalPrice += menu.price * quantity[index];
      index++;

      const user = await this.userOrderRepository.getUserPoint(userId);
      const pointValidation = new PointValidation(totalPrice, user);
      pointValidation.validate();
    }

    for (let i = 0; i < menuId.length; i++) {
      const checkStock = await this.userOrderRepository.getMenuData(menuId[i]);
      let quantityData = quantity[i];
      const stockValidation = new StockValidation(checkStock, quantityData);
      stockValidation.validate();
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
