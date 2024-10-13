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
      isOwner: true,
    };

    const hashedPassword = 'hashedPassword';
    bcrypt.hash.mockResolvedValue(hashedPassword);

    // createdUser 반환 Mock 설정
    mockUserRepository.createdUser.mockResolvedValue({
      email: sampleUser.email,
      password: hashedPassword,
      name: sampleUser.name,
      address: sampleUser.address,
      isOwner: sampleUser.isOwner,
      createdAt: new Date(),
    });

    // signUp 메서드 실행
    const createdUser = await userService.signUp(
      sampleUser.email,
      sampleUser.password,
      sampleUser.name,
      sampleUser.address,
      sampleUser.isOwner,
    );

    expect(mockUserRepository.createdUser).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.createdUser).toHaveBeenCalledWith(
      sampleUser.email,
      hashedPassword,
      sampleUser.name,
      sampleUser.address,
      sampleUser.isOwner,
    );

    expect(createdUser).toEqual({
      email: sampleUser.email,
      name: sampleUser.name,
      address: sampleUser.address,
      isOwner: sampleUser.isOwner,
      createdAt: expect.any(Date), //동적 날짜 검증
    });
  });

  //TODO: 테스트 코드 다시 작성 해보기
  test('logIn Method By Success', async () => {
    const sampleUser = {
      email: 'test@example.com',
      password: 'aaaa4321',
      userId: 1,
    };
  
    // 사용자 정보 Mock 설정
    mockUserRepository.findUserByEmail.mockResolvedValue({
      ...sampleUser,
      password: 'hashedPassword',
    });
  
    // bcrypt.compare는 true를 반환하도록 설정
    bcrypt.compare.mockResolvedValue(true);
  
    // JWT 토큰 반환 Mock 설정
    jwt.sign.mockReturnValue('token');
  
    // logIn 메서드 실행
    const token = await userService.logIn(
      sampleUser.email,
       sampleUser.password
      );
  
    // userRepository 메서드가 호출되었는지 확인
    expect(mockUserRepository.findUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(
      sampleUser.email
    );
  
    // bcrypt.compare 호출 확인
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      sampleUser.password, 
      'hashedPassword'
    );
  
    // JWT 토큰 생성 호출 확인
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith({ 
      userId: sampleUser.userId 
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '1h',
    });
  
    // 토큰이 올바르게 반환되었는지 확인
    expect(token).toBe('token');
  });
});
