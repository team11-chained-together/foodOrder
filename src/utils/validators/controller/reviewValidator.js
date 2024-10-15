import { ValidationError } from '../../errors/ValidationError.js';

export class CreateReview {
  constructor({ orderId, comment, rate }) {
    this.orderId = orderId;
    this.comment = comment;
    this.rate = rate;
  }

  validate() {
    this.validateCommentRate();
    this.validateRate();
  }

  validateCommentRate() {
    if (!this.comment || !this.rate) {
      throw new ValidationError('comment, rate를 작성해주세요.');
    }
  }

  validateRate() {
    if (this.rate < 1 || !this.rate > 5) {
      throw new ValidationError('가게 리뷰 점수는 1 ~ 5점을 입력해주세요.');
    }
  }
}

export class UpdateReview {
  constructor({ reviewId, comment, rate }) {
    this.reviewId = reviewId;
    this.comment = comment;
    this.rate = rate;
  }

  validate() {
    this.validateReviewId();
  }

  validateReviewId() {
    if (!this.reviewId) {
      throw new ValidationError('해당하는 reviewId를 입력해 주세요.');
    }
  }
}

export class DeleteReview {
  constructor({ reviewId }) {
    this.reviewId = reviewId;
  }

  validate() {
    this.validateReviewId();
  }

  validateReviewId() {
    if (!this.reviewId) {
      throw new ValidationError('해당하는 reviewId를 입력해 주세요.');
    }
  }
}
