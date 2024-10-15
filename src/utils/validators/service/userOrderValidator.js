import { ValidationError } from '../../errors/ValidationError.js';

export class CheckStoreValidation {
  constructor(checkStore) {
    this.checkStore = checkStore;
  }

  validate() {
    this.checkStoreValidate();
  }

  checkStoreValidate() {
    if (!this.checkStore) {
      throw new ValidationError('해당하는 가게가 존재하지 않습니다.');
    }
  }
}

export class CheckMenuValidation {
  constructor(checkMenu, storeId) {
    this.checkMenu = checkMenu;
    this.storeId = storeId;
  }

  validate() {
    this.checkMenuValidate();
    this.checkMenuStoreIdValidate();
    this.checkMenuStockValidate();
  }

  checkMenuValidate() {
    if (!this.checkMenu) {
      throw new ValidationError('해당하는 메뉴가 존재하지 않습니다.');
    }
  }

  checkMenuStoreIdValidate() {
    if (this.checkMenu.storeId !== this.storeId) {
      throw new ValidationError('해당하는 가게의 메뉴가 아닙니다.');
    }
  }

  checkMenuStockValidate() {
    if (this.checkMenu.stock === 0) {
      throw new ValidationError('해당하는 메뉴가 품절 입니다.');
    }
  }
}

export class PointValidation {
  constructor(totalPrice, user) {
    this.totalPrice = totalPrice;
    this.user = user;
  }

  validate() {
    this.pointValidate();
  }

  pointValidate() {
    if (this.point < this.totalPrice) {
      throw new ValidationError('잔액이 부족합니다.');
    }
  }
}

export class StockValidation {
  constructor(checkStock, quantity) {
    this.checkStock = checkStock;
    this.quantity = quantity;
  }

  validate() {
    this.stockValidate();
  }

  stockValidate() {
    if (this.checkStock.stock < this.quantity) {
      throw new ValidationError('주문하신 메뉴의 재고가 부족 합니다.');
    }
  }
}
