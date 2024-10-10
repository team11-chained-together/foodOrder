import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//회원가입 로직
export class UserService {
  //레포지토리 인스턴스 생성
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  signUp = async (email, password, name, address, type) => {
    if (!email || !password) {
      throw new Error('email 과 password를 입력해주세요 ');
    }
    const investigateEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!investigateEmail.test(email)) {
      throw new Error('이메일 형식에 맞게 입력해주세요');
    }
    if (password.length < 8) {
      throw new Error('비밀번호를 다시 설정하세요');
    }
    //이메일 중복인지 체크하는 부분 existEmail 이 정의되지 않았었음.
    const existEmail = await this.userRepository.checkEmail(email);
    if (existEmail) {
      throw new Error('이미 존재하는 email 입니다.');
    }
    //비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
    //새로운 유저 생성
    const createdUser = await this.userRepository.createdUser(
      email,
      hashedPassword,
      name,
      address,
      type,
    );

    return {
      email: createdUser.email,
      name: createdUser.name,
      address: createdUser.address,
      type: createdUser.type,
      createdAt: createdUser.createdAt,
    };
  };

  logIn = async (email, password, res) => {
    const user = await this.userRepository.findUserByEmail(email);
    //이메일을 통해 사용자 존재여부
    if (!user) {
      throw new Error('해당 email의 사용자가 존재하지 않습니다.');
    }
    //비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    //JMT 토큰 생성
    const { JWT_SECRET } = process.env;
    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });
    res.header('authorization', `Bearer ${token}`);
  };

  getUserPoint = async (userId) => {
    // const ckeckPoint = this.userRepository.ckeckPoint(point);
    // if (ckeckPoint === 0) {
    //   throw new Error('포인트가 부족합니다');
    // }

    const userPoint = await this.userRepository.getUserPoint(userId);
    return {
      userId: userPoint.userId,
      point: userPoint.point,
    };
  };
}
