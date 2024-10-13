import { ValidationError } from '../errors/ValidationError.js';

export class SignInUser {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }

  validate() {
    this.validateEmail();
    this.validatePassword();
  }

  validateEmail() {
    if (!this.email) {
      throw new ValidationError('이메일을 입력하세요.');
    }
  }

  validatePassword() {
    if (!this.password) {
      throw new ValidationError('비밀번호를 입력하세요.');
    }
  }
}
