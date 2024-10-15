import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserValidation, LogInValidation } from '../utils/validators/service/userValidator.js';
export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  signUp = async (email, password, name, address, isOwner) => {
    const existEmail = await this.userRepository.checkEmail(email);
    const emailValidation = new UserValidation(existEmail);
    emailValidation.validate();

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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const loginValidation = new LogInValidation(user, isPasswordValid);
    loginValidation.validate();

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
