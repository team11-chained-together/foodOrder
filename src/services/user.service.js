import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//회원가입 로직
export class UserService {
  //레포지토리 인스턴스 생성
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  signUp = async (email, password, name, address, isOwner) => {
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
      isOwner,
    );

    return {
      email: createdUser.email,
      name: createdUser.name,
      address: createdUser.address,
      isOwner: createdUser.isOwner,
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
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('authorization', `Bearer ${token}`);
  };

  getUserPoint = async (userId) => {
    const userPoint = await this.userRepository.getUserPoint(userId);
    return {
      userId: userPoint.userId,
      point: userPoint.point,
    };
  };
}
