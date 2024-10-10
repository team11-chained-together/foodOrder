// User의 컨트롤러(Controller)역할을 하는 클래스
export class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  // 유저 생성 ( 회원 가입 )

  userSignup = async (req, res, next) => {
    try {
      const { email, password, name, address, type } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'email 과 password를 입력해주세요.' });
      }
      const investigateEmail =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (!investigateEmail.test(email)) {
        return res.status(400).json({ message: '이메일 형식에 맞게 입력해주세요.' });
      }
      if (password.length < 8) {
        return res.status(400).json({ message: '비밀번호를 다시 설정하세요.' });
      }

      // 서비스 계층에 구현된 createUser 로직을 실행합니다.
      const createdUser = await this.userService.signUp(email, password, name, address, type);

      return res.status(201).json({
        message: '회원가입 성공!',
        data: createdUser,
      });
    } catch (err) {
      next(err);
    }
  };

  //로그인 로직
  userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error('InvalidParamsError');
      }

      await this.userService.logIn(email, password, res);

      return res.status(201).json({ message: '로그인 성공!' });
    } catch (err) {
      next(err);
    }
  };

  // 포인트 확인
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
