import { ValidationError } from '../../errors/ValidationError.js';

export class CreateReviewValidation {
  constructor(checkOrderData, userId) {
    this.checkOrderData = checkOrderData;
    this.userId = userId;
  }

  validate() {
    this.validateCheckOrder();
    this.validateCheckUserId();
    this.validateCheckOrderStatement();
  }

  validateCheckOrder() {
    if (!this.checkOrderData) {
      throw new ValidationError('주문 내역이 없습니다.');
    }
  }

  validateCheckUserId() {
    if (this.checkOrderData.userId !== this.userId) {
      throw new ValidationError('해당 주문에 대하여 리뷰를 작성 할 수 없습니다.');
    }
  }

  validateCheckOrderStatement() {
    if (this.checkOrderData.statement !== 'DELIVERY_COMPLETE') {
      throw new ValidationError('배송이 완료되지 않았습니다.');
    }
  }
}

export class UpdateReviewValidation {
  constructor(findReviewData, userId) {
    this.findReviewData = findReviewData;
    this.userId = userId;
  }

  validate() {
    this.validateFindReviewData();
    this.validateFindReviewDataUserId();
  }

  validateFindReviewData() {
    if (!this.findReviewData) {
      throw new ValidationError('해당하는 리뷰가 존재하지 않습니다.');
    }
  }

  validateFindReviewDataUserId() {
    if (this.findReviewData.userId !== this.userId) {
      throw new ValidationError('해당하는 리뷰는 수정할 수 없습니다');
    }
  }
}

export class DeleteReviewValidation {
  constructor(findReviewData, userId) {
    this.findReviewData = findReviewData;
    this.userId = userId;
  }

  validate() {
    this.validateFindReviewData();
    this.validateFindReviewDataUserId();
  }

  validateFindReviewData() {
    if (!this.findReviewData) {
      throw new ValidationError('해당하는 리뷰가 존재하지 않습니다.');
    }
  }

  validateFindReviewDataUserId() {
    if (this.findReviewData.userId !== this.userId) {
      throw new ValidationError('해당하는 리뷰는 삭제할 수 없습니다.');
    }
  }
}

export class GetReviewValidation {
  constructor(getReviewData, findStoreData) {
    this.getReviewData = getReviewData;
    this.findStoreData = findStoreData;
  }

  validate() {
    this.validateGetReviewStoreId();
    this.validateGetReview();
  }

  validateGetReviewStoreId() {
    if (!this.findStoreData) {
      throw new ValidationError('해당하는 가게는 존재하지 않습니다.');
    }
  }

  validateGetReview() {
    if (this.getReviewData.length === 0) {
      throw new ValidationError('해당하는 가게에 대한 리뷰가 없습니다.');
    }
  }
}

export class GetMyReviewValidation {
  constructor(getMyReviewData) {
    this.getMyReviewData = getMyReviewData;
  }

  validate() {
    this.validateGetMyReview();
  }

  validateGetMyReview() {
    if (this.getMyReviewData.length === 0) {
      throw new ValidationError('내가 작성한 리뷰가 없습니다.');
    }
  }
}
