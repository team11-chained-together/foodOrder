export class CheckOrderService {
  constructor(checkOrderRepository) {
    this.checkOrderRepository = checkOrderRepository;
  }

  checkOrder = async (userId) => {
    const storeData = await this.checkOrderRepository.findStorIdByUserId(userId);
    if (!storeData) {
      throw new Error('상점이 없습니다. 상점을 만들어주세요.');
    }

    const orderData = await this.checkOrderRepository.findOrderIdByStoreId(storeData.storeId);
    if (!orderData) {
      throw new Error('주문이 없습니다.');
    }

    return {
      orderData: orderData,
    };
  };
}
