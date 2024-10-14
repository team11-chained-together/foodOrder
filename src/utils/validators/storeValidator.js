import { ValidationError } from '../errors/ValidationError.js';

export class StoreValidation {
  constructor(userId, isOwner, { storeName, location, foodType }) {
    this.userId = userId;
    this.isOwner = isOwner;
    this.storeName = storeName;
    this.location = location;
    this.foodType = foodType;
  }

  validate() {
    this.userIdValidate();
    this.isOwnerValidate();
    this.storeNameValidate();
    this.locationValidate();
    this.foodTypeValidate();
  }

  userIdValidate() {
    if (!this.userId) {
      throw new ValidationError('로그인 후 시도해주세요');
    }
  }

  isOwnerValidate() {
    if (this.isOwner === false) {
      throw new ValidationError('사장님만 이용가능합니다');
    }
  }

  storeNameValidate() {
    if (!this.storeName) {
      throw new ValidationError('상점 이름을 입력해주세요');
    }
  }

  locationValidate() {
    if (!this.location) {
      throw new ValidationError('주소를 입력해주세요');
    }
  }

  foodTypeValidate() {
    if (!this.foodType) {
      throw new ValidationError('카테고리를 입력해주세요');
    }
  }
}

export class UpdateStoreValidation {
  constructor(userId, isOwner, { storeName, location, foodType }) {
    this.userId = userId;
    this.isOwner = isOwner;
    this.storeName = storeName;
    this.location = location;
    this.foodType = foodType;
  }

  validate() {
    this.isOwnerValidate();
    this.storeValidate();
  }

  isOwnerValidate() {
    if (this.isOwner === false) {
      throw new ValidationError('사장님만 이용가능합니다.');
    }
  }

  storeValidate() {
    if (!this.storeName || !this.location || !this.foodType) {
      throw new ValidationError('변경할 내용을 입력해주세요.');
    }
  }
}

export class DeleteStoreValidation {
  constructor(userId, isOwner) {
    this.userId = userId;
    this.isOwner = isOwner;
  }

  validate() {
    this.isOwnerValidate();
  }

  isOwnerValidate() {
    if (this.isOwner === false) {
      throw new ValidationError('사장님만 이용가능합니다.');
    }
  }
}

export class GetStoreValidation {
  constructor({ storeName }) {
    this.storeName = storeName;
  }

  validate() {
    this.storeNameValidate();
  }

  storeNameValidate() {
    if (!this.storeName) {
      throw new ValidationError('검색할 상점 이름을 입력해주세요.');
    }
  }
}

export class SearchStoreValidation {
  constructor({ search }) {
    this.search = search;
  }

  validate() {
    this.searchValidate();
  }
  searchValidate() {
    if (!this.search) {
      throw new ValidationError('검색어를 입력해주세요.');
    }
  }
}
