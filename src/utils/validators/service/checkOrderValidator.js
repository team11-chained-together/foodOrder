import { ValidationError } from '../../errors/ValidationError.js';

export class CheckOrderValidation {
  constructor(storeData) {
    this.storeData = storeData;
  }

  validate() {
    this.validateStoreData();
  }

  validateStoreData() {
    if (!this.storeData) {
      throw new ValidationError('상점이 없습니다. 상점을 만들어주세요.');
    }
  }
}

export class CheckOrderDataValidation {
  constructor(orderData) {
    this.orderData = orderData;
  }

  validate() {
    this.validateOrderData();
  }

  validateOrderData() {
    if (this.orderData.length === 0) {
      throw new ValidationError('사장님의 가게에 주문이 없습니다.');
    }
  }
}

export class CheckMyOrderValidation {
  constructor(orderData) {
    this.orderData = orderData;
  }

  validate() {
    this.validateOrderData();
  }

  validateOrderData() {
    if (this.orderData.length === 0) {
      throw new ValidationError('내가 주문한 목록이 없습니다.');
    }
  }
}

export class UpdateOrderStatementValidation {
  constructor(store, order) {
    this.store = store;
    this.order = order;
  }

  validate() {
    this.validateUpdateOrderStatement();
    this.validateStoreIdOrderId();
  }

  validateUpdateOrderStatement() {
    if (!this.order) {
      throw new ValidationError('해당 주문은 존재하지 않습니다.');
    }
  }

  validateStoreIdOrderId() {
    if (this.store.storeId !== this.order.storeId) {
      throw new ValidationError('해당하는 오더는 사장님 가게의 주문목록에 없습니다.');
    }
  }
}
