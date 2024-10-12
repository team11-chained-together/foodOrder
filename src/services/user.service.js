import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';

//회원가입 로직
export class UserService {
  //레포지토리 인스턴스 생성
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  //TODO: 비밀번호 확인 부분 추가
  signUp = async (email, password, name, address, isOwner) => {
    const existEmail = await this.userRepository.checkEmail(email);

    if (existEmail) {
      throw new Error('이미 존재하는 email 입니다.');
    }
    console.log('service : ' + existEmail);

    const hashedPassword = await bcrypt.hash(password, 10);

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

  logIn = async (email, password) => {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('해당 email의 사용자가 존재하지 않습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  };

  getUserPoint = async (userId) => {
    const userPoint = await this.userRepository.getUserPoint(userId);
    return {
      userId: userPoint.userId,
      point: userPoint.point,
    };
  };
}
