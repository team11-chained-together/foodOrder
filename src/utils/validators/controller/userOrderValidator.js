import { ValidationError } from '../../errors/ValidationError.js';

export class UserOrderValidation {
  constructor({ storeId, menuId, quantity }) {
    this.storeId = storeId;
    this.menuId = menuId;
    this.quantity = quantity;
  }

  validate() {
    this.storeValidate();
    this.menuIdValidate();
    this.quantityValidate();
  }

  storeValidate() {
    if (!this.storeId) {
      throw new ValidationError('상점 ID를 입력해주세요.');
    }
  }

  menuIdValidate() {
    if (!this.menuId) {
      throw new ValidationError('메뉴 ID를 입력해주세요.');
    }
  }
  quantityValidate() {
    if (!this.quantity) {
      throw new ValidationError('수량을 입력해주세요.');
    }
  }
}
