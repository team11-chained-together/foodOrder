import {
  CheckOrderValidation,
  CheckMyOrderValidation,
  UpdateOrderStatementValidation,
  CheckOrderDataValidation,
} from '../utils/validators/service/checkOrderValidator.js';
export class CheckOrderService {
  constructor(checkOrderRepository) {
    this.checkOrderRepository = checkOrderRepository;
  }

  checkOrder = async (userId) => {
    const storeData = await this.checkOrderRepository.findStorIdByUserId(userId);
    const storeValidation = new CheckOrderValidation(storeData);
    storeValidation.validate();

    const orderData = await this.checkOrderRepository.findOrderIdByStoreId(storeData.storeId);
    const orderValidation = new CheckOrderDataValidation(orderData);
    orderValidation.validate();

    return {
      orderData: orderData,
    };
  };

  checkMyOrder = async (userId) => {
    const orderData = await this.checkOrderRepository.findOrderIdByUserId(userId);
    const myOrderValidation = new CheckMyOrderValidation(orderData);
    myOrderValidation.validate();

    return {
      orderData: orderData,
    };
  };

  updateOrderStatement = async (userId, orderId, statement) => {
    const store = await this.checkOrderRepository.findStorIdByUserId(userId);
    const order = await this.checkOrderRepository.findOrderByOrderId(orderId);
    const updateOrderStatementValidation = new UpdateOrderStatementValidation(store, order);
    updateOrderStatementValidation.validate();

    const updatedOrder = await this.checkOrderRepository.updateOrderStatement(
      orderId,
      store.storeId,
      statement,
    );

    return {
      updatedOrder: updatedOrder,
    };
  };
}
