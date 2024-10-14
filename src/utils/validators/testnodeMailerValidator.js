import { ValidationError } from '../errors/ValidationError.js';

export class TestNodValidator {
  constructor({ email }) {
    this.email = email;
  }
  validate() {
    this.validateEmail();
  }

  validateEmail() {
    if (!this.email) {
      throw new Error('이메일을 입력하세요.');
    }
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!emailRegex.test(this.email)) {
      throw new ValidationError('유효한 이메일 형식을 입력하세요.');
    }
  }
}
