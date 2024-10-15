import { ValidationError } from '../../errors/ValidationError.js';

export class CreateMenuValidation {
  constructor(isMenuNameExists) {
    this.isMenuNameExists = isMenuNameExists;
  }

  validate() {
    this.validateIsMenuNameExists();
  }

  validateIsMenuNameExists() {
    if (this.isMenuNameExists) {
      throw new ValidationError('저희 가게에 이미 존재하는 메뉴 이름입니다.');
    }
  }
}

export class UpdateMenuValidation {
  constructor(isMenuNameExists) {
    this.isMenuNameExists = isMenuNameExists;
  }

  validate() {
    this.validateIsMenuNameExists();
  }

  validateIsMenuNameExists() {
    if (!this.isMenuNameExists) {
      throw new ValidationError('저희 가게에 존재하지 않는 메뉴입니다.');
    }
  }
}

export class GetMenuValidation {
  constructor(store) {
    this.store = store;
  }

  validate() {
    this.validateStore();
  }

  validateStore() {
    if (!this.store) {
      throw new ValidationError('해당하는 가게가 없습니다.');
    }
  }
}
