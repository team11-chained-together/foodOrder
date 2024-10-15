import { ValidationError } from '../../errors/ValidationError.js';

export class SignUpUser {
  constructor({ email, password, code, confirmPassword, name, address, isOwner }, emailCode) {
    this.email = email;
    this.code = code;
    this.emailCode = emailCode;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.name = name;
    this.address = address;
    this.isOwner = isOwner;
  }

  validate() {
    this.validateEmail();
    this.validateEmailCode();
    this.validatePassword();
    this.validateName();
    this.validateAddress();
  }

  validateEmail() {
    if (!this.email) {
      throw new ValidationError('이메일을 입력해주세요.');
    }
    const investigateEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!investigateEmail.test(this.email)) {
      throw new ValidationError('이메일 형식에 맞게 입력해주세요.');
    }
  }

  validateEmailCode() {
    if (this.code !== this.emailCode) {
      throw new ValidationError('이메일 인증 코드가 다릅니다.');
    }
  }

  validatePassword() {
    if (!this.password) {
      throw new ValidationError('비밀번호를 입력해주세요.');
    }
    if (this.password.length < 8) {
      throw new ValidationError('비밀번호는 8자리 이상으로 작성해 주세요.');
    }
    if (this.password !== this.confirmPassword) {
      throw new ValidationError('비밀번호 확인이 일치하지 않습니다.');
    }
  }

  validateName() {
    if (!this.name) {
      throw new ValidationError('이름을 입력해주세요.');
    }
  }

  validateAddress() {
    if (!this.address) {
      throw new ValidationError('주소를 입력해주세요.');
    }
  }
}

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
      throw new ValidationError('이메일을 입력해주세요.');
    }
  }

  validatePassword() {
    if (!this.password) {
      throw new ValidationError('비밀번호를 입력해주세요.');
    }
  }
}
