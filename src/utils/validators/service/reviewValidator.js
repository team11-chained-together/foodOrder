import { ValidationError } from '../../errors/ValidationError.js';

export class CreateReviewValidation {
  constructor(checkOrderData, userId) {
    this.checkOrderData = checkOrderData;
    this.userId = userId;
  }

  validate() {
    this.validateCheckOrderData();
    this.validateCheckUserId();
    this.validateCheckOrderStatement();
  }

  validateCheckOrderData() {
    if (this.checkOrderData.length === 0) {
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
