import { ValidationError } from '../../errors/ValidationError.js';

export class SearchStoreValidation {
  constructor(store) {
    this.store = store;
  }

  validate() {
    this.validateStore();
  }

  validateStore() {
    if (this.store.length === 0) {
      throw new ValidationError('검색 결과가 없습니다.');
    }
  }
}

export class CreateStoreValidation {
  constructor(store) {
    this.store = store;
  }

  validate() {
    this.validateStore();
  }

  validateStore() {
    if (this.store) {
      throw new ValidationError('이미 보유하고 있는 가게가 있습니다.');
    }
  }
}

export class StoreValidation {
  constructor(store) {
    this.store = store;
  }

  validate() {
    this.storeValidate();
  }

  storeValidate() {
    if (!this.store) {
      throw new Error('보유하고 있는 가게가 없습니다, 가게를 만들어주세요.');
    }
  }
}

export class GetStoreValidation {
  constructor(store) {
    this.store = store;
  }

  validate() {
    this.getStoreValidate();
  }

  getStoreValidate() {
    if (this.store.length === 0) {
      throw new ValidationError('등록된 가게가 없습니다.');
    }
  }
}
