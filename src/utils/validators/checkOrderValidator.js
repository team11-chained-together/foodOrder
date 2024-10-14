import { ValidationError } from '../errors/ValidationError.js';

export class CheckedOrder {
  constructor(isOwner) {
    this.isOwner = isOwner;
  }

  validate() {
    this.validateOwner();
  }

  validateOwner() {
    if (!this.isOwner) {
      throw new ValidationError('사장님만 접근 가능한 페이지입니다.');
    }
  }
}

export class UpdatedOrderStatement {
  constructor(isOwner, { orderId, statement }) {
    this.isOwner = isOwner;
    this.orderId = orderId;
    this.statement = statement;
  }

  validate() {
    this.validateOwner();
    this.validateStatement();
  }

  validateOwner() {
    if (!this.isOwner) {
      throw new ValidationError('사장님만 접근 가능한 페이지입니다.');
    }
  }
  validateStatement() {
    if (
      statement !== 'PREPARE' &&
      statement !== 'IN_DELIVERY' &&
      statement !== 'DELIVERY_COMPLETE'
    ) {
      throw new ValidationError('올바른 상태값을 입력해주세요.');
    }
  }
}
