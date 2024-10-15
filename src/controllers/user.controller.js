import { SignUpUser, SignInUser } from '../utils/validators/controller/userValidator.js';

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
      // }
      next(err);
    }
  };

  userLogin = async (req, res, next) => {
    try {
      // TODO: 로그인시 @ 없어지면 오류
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
