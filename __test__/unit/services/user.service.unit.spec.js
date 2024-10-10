import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { UserService } from '../../../src/services/user.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// bcrypt를 Mock 처리
jest.mock('bcrypt');
jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => 'token'),
    verify: jest.fn(() => 'verify'),
  };
});

const mockUserRepository = {
  checkEmail: jest.fn(),
  createdUser: jest.fn(),
  findUserByEmail: jest.fn(),
};

// 의존성 주입하는 부분, 새로운 인스턴스 생성
const userService = new UserService(mockUserRepository);

describe('userService Unit Test', () => {
  beforeEach(() => {
    // 테스트 실행 전 Mock 상태 초기화
    jest.resetAllMocks();

    // bcrypt.hash를 명확히 다시 Mock 처리
    bcrypt.hash = jest.fn();

    //bycrypt.compare Mock 처리
    bcrypt.compare = jest.fn();

    jwt.sign = jest.fn();
  });

  test('signUp Method By Success', async () => {
    const sampleUser = {
      email: 'test@example.com',
      password: 'aaaa4321',
      name: '홍길동',
      address: 'seoul',
      type: true,
    };

    // bcrypt 해시 메서드 Mock 설정
    const hashedPassword = 'hashedPassword';
    bcrypt.hash.mockResolvedValue(hashedPassword); // bcrypt.hash가 해시된 비밀번호를 반환하도록 설정

    // createdUser 반환 Mock 설정
    mockUserRepository.createdUser.mockResolvedValue({
      email: sampleUser.email,
      password: hashedPassword,
      name: sampleUser.name,
      address: sampleUser.address,
      type: sampleUser.type,
      createdAt: new Date(),
    });

    // signUp 메서드 실행
    const createdUser = await userService.signUp(
      sampleUser.email,
      sampleUser.password,
      sampleUser.name,
      sampleUser.address,
      sampleUser.type,
    );

    // createdUser가 한 번 호출되었는지 확인
    expect(mockUserRepository.createdUser).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.createdUser).toHaveBeenCalledWith(
      sampleUser.email,
      hashedPassword, // 해시된 비밀번호가 전달되는지 확인
      sampleUser.name,
      sampleUser.address,
      sampleUser.type,
    );

    // 반환된 유저 정보가 예상대로 반환되었는지 확인
    expect(createdUser).toEqual({
      email: sampleUser.email,
      name: sampleUser.name,
      address: sampleUser.address,
      type: sampleUser.type,
      createdAt: expect.any(Date), //동적 날짜 검증
    });
  });

  test('logIn Method By Success', async () => {
    const sampleUser = {
      email: 'test@example.com',
      password: 'aaaa4321',
    };

    const token = userService.logIn({ userId: 1 });

    mockUserRepository.findUserByEmail.mockReturnValue(sampleUser);
    bcrypt.compare.mockReturnValue(sampleUser);
    jwt.sign.mockReturnValue(sampleUser);

    const getId = await userService.logIn(sampleUser);

    expect(getId).toEqual(sampleUser);
    expect(mockUserRepository.findUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(
      sampleUser.email,
      sampleUser.password,
    );

    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, JWT_SECRET);
    expect(token).toBe('token');
  });
});
