import { ValidationError } from '../errors/ValidationError.js';


export class StoreValidation {
  constructor(userId, isOwner, {storeName, location, foodType}) {
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
    if (!this.storeName){
      throw new ValidationError('상점 이름을 입력해주세요');
    }
  }

  locationValidate() {
    if (!location) {
      throw new ValidationError('주소를 입력해주세요');
    }
  }

  foodTypeValidate() {
    if (!this.foodType) {
      throw new ValidationError('카테고리를 입력해주세요');
    }
  }
}