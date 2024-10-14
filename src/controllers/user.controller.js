// class ValidationError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'ValidationError';
//   }
// }

// // new ValidationError("이메일 안 맞음")

// class SignUpUser {
//   constructor({ email, password, confirmPassword, name, address, isOwner }) {
//     this.email = email;
//     this.password = password;
//     this.confirmPassword = confirmPassword;
//     this.name = name;
//     this.address = address;
//     this.isOwner = isOwner;
//   }

//   validate() {
//     this.validateEmail();
//     this.validatePassword();
//   }

//   validateEmail() {
//     if (!this.email) {
//       throw new ValidationError('email를 입력하세요.');
//     }
//     const investigateEmail =
//       /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
//     if (!investigateEmail.test(this.email)) {
//       throw new ValidationError('이메일 형식에 맞게 입력해주세요.');
//     }
//   }

//   validatePassword() {
//     if (!this.password) {
//       throw new ValidationError('password를 입력하세요.');
//     }
//     if (this.password.length < 8) {
//       throw new ValidationError('비밀번호를 다시 설정하세요.');
//     }
//     if (this.password !== this.confirmPassword) {
//       throw new ValidationError('비밀번호 확인이 일치하지 않습니다.');
//     }
//   }
// }
import { SignUpUser, SignInUser } from '../utils/validators/userValidator.js';

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  userSignup = async (req, res, next) => {
    try {
      const emailCode = req.session.emailCode;
      const signUpUser = new SignUpUser(req.body, emailCode);
      signUpUser.validate();

      const createdUser = await this.userService.signUp(
        signUpUser.email,
        signUpUser.password,
        signUpUser.confirmPassword,
        signUpUser.name,
        signUpUser.address,
        signUpUser.isOwner,
      );

      return res.status(201).json({
        message: '회원가입 성공!',
        data: createdUser,
      });
    } catch (err) {
      // if (err instanceof ValidationError) {
      //   return res.status(400).json({
      //     message: err.message,
      //   });
      //   return err.message
      // }
      next(err);
    }
  };

  userLogin = async (req, res, next) => {
    try {
      const loginUser = new SignInUser(req.body);
      loginUser.validate();

      const login = await this.userService.logIn(loginUser.email, loginUser.password);
      res.cookie('authorization', `Bearer ${login}`);

      return res.status(201).json({ message: '로그인 성공!' });
    } catch (err) {
      next(err);
    }
  };

  userPoint = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const userPoint = await this.userService.getUserPoint(userId);
      return res.status(200).json({ data: userPoint });
    } catch (err) {
      next(err);
    }
  };
}
