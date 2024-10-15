import { ValidationError } from '../errors/ValidationError.js';

export class CreateMenu {
  constructor(isOwner, { menuName, image, price, stock }) {
    this.isOwner = isOwner;
    this.menuName = menuName;
    this.image = image;
    this.price = price;
    this.stock = stock;
  }

  validate() {
    this.validateCreateMenu();
  }

  validateCreateMenu() {
    if (this.isOwner !== true) {
      throw new ValidationError('해당하는 유저는 사장님이 아닙니다.');
    }

    if (!this.menuName || !this.image || !this.price || !this.stock) {
      throw new ValidationError('menuName, image, price, stock을 모두 입력해주세요.');
    }
  }
}

export class UpdateMenu {
  constructor(isOwner, { menuId, menuName, image, price, stock }) {
    this.isOwner = isOwner;
    this.menuId = menuId;
    this.menuName = menuName;
    this.image = image;
    this.price = price;
    this.stock = stock;
  }

  validate() {
    this.validateUpdateMenu();
  }

  validateUpdateMenu() {
    if (this.isOwner !== true) {
      throw new ValidationError('해당하는 유저는 사장님이 아닙니다.');
    }

    if (!this.menuId) {
      throw new ValidationError('menuId를 입력해 주세요.');
    }
  }
}

export class DeleteMenu {
  constructor(isOwner, { menuId }) {
    this.isOwner = isOwner;
    this.menuId = menuId;
  }

  validate() {
    this.validateUpdateMenu();
  }

  validateUpdateMenu() {
    if (this.isOwner !== true) {
      throw new ValidationError('해당하는 유저는 사장님이 아닙니다.');
    }

    if (!this.menuId) {
      throw new ValidationError('menuId를 입력해 주세요.');
    }
  }
}

export class GetMenu {
  constructor({ storeId }) {
    this.storeId = storeId;
  }
  validate() {
    this.validateGetStore();
  }
  validateGetStore() {
    if (!this.storeId) {
      throw new ValidationError('해당하는 storeId를 입력 해 주세요.');
    }
  }
}
