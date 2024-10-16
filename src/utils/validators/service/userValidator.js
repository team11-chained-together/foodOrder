import { ValidationError } from '../../errors/ValidationError.js';

export class UserValidation {
  constructor(existEmail) {
    this.existEmail = existEmail;
  }

  validate() {
    this.validateExistEmail();
  }

  validateExistEmail() {
    if (this.existEmail) throw new ValidationError('이미 사용중인 이메일 입니다.');
  }
}

export class LogInValidation {
  constructor(user, isPasswordValid) {
    this.user = user;
    this.isPasswordValid = isPasswordValid;
  }

  validate() {
    this.userValidate();
    this.passwordValidate();
  }

  userValidate() {
    if (!this.user) {
      throw new ValidationError('해당 이메일의 사용자가 존재하지 않습니다.');
    }
  }

  passwordValidate() {
    if (!this.isPasswordValid) {
      throw new ValidationError('비밀번호가 일치하지 않습니다.');
    }
  }
}
