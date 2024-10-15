import { jest, test, expect } from '@jest/globals';
import { UserController } from '../../../src/controllers/user.controller';
import { UserService } from '../../../src/services/user.service';
import { SignUpUser } from '../../../src/utils/validators/controller/userValidator.js';

const mockUserService = {
  signUp: jest.fn(),
  logIn: jest.fn(),
  getUserPoint: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  session: jest.fn(),
};

const mockResponse = {
  json: jest.fn(),
  status: jest.fn(),
};

const mockNext = jest.fn();

const emailCode = mockRequest.session.emailCode;
const signUpValidation = new SignUpUser(mockRequest.body, emailCode);
const userController = new UserController(mockUserService);

// 초기화
describe('UserController Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });

  // 회원가입 성공
  test('signUp Method by Success', async () => {
    const signUpRequestBodyParams = {
      email: 'SH@example.com',
      password: 'aaaa4321',
      confirmPassword: 'aaaa4321',
      name: '홍길동',
      address: 'seoul',
      isOwner: true,
    };

    mockRequest.body = signUpRequestBodyParams;

    const signUpReturnValue = {
      userId: 1,
      ...signUpRequestBodyParams,
      createdAt: new Date().toString(),
    };
    mockUserService.signUp.mockReturnValue(signUpReturnValue);

    await userController.userSignup(mockRequest, mockResponse, mockNext);
    expect(mockUserService.signUp).toHaveBeenCalledTimes(1);
    expect(mockUserService.signUp).toHaveBeenCalledWith(
      signUpRequestBodyParams.email,
      signUpRequestBodyParams.password,
      signUpRequestBodyParams.name,
      signUpRequestBodyParams.address,
      signUpRequestBodyParams.isOwner,
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '회원가입 성공!',
      data: signUpReturnValue,
    });
  });

  // 회원가입 실패
  // test('signUp Method by Invalid Params Error', async () => {
  //   await userController.userSignup(mockRequest, mockResponse);

  //   expect(mockResponse.status).toHaveBeenCalledTimes(1);
  //   expect(mockResponse.status).toHaveBeenCalledWith(500);

  //   expect(mockRequest.json).toHaveBeenCalledTimes(1);
  //   expect(mockResponse.json).toHaveBeenCalledWith({ message: '회원가입 실패!' });
  // });

  // 로그인 성공
  test('logIn Method by Successs', async () => {
    const logInRequestBodyParams = {
      email: 'SH@example.com',
      password: 'aaaa43321',
    };
    mockRequest.body = logInRequestBodyParams;

    const logInReturnValue = 'mockedToken';
    mockUserService.logIn.mockReturnValue(logInReturnValue);

    mockResponse.cookie = jest.fn();

    await userController.userLogin(mockRequest, mockResponse, mockNext);

    expect(mockUserService.logIn).toHaveBeenCalledTimes(1);
    expect(mockUserService.logIn).toHaveBeenCalledWith(
      logInRequestBodyParams.email,
      logInRequestBodyParams.password,
    );

    expect(mockResponse.cookie).toHaveBeenCalledTimes(1); // 쿠키 설정 확인
    expect(mockResponse.cookie).toHaveBeenCalledWith('authorization', `Bearer ${logInReturnValue}`);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: '로그인 성공!' });
  });

  //포인트 성공
  test('getUserPoint', async () => {
    const getUserPointBodyParams = {
      userId: 1,
    };

    mockRequest.user = getUserPointBodyParams;

    const getUserPointReturnValue = {
      userId: 1,
      point: 0,
    };

    mockUserService.getUserPoint.mockResolvedValue(getUserPointReturnValue);

    await userController.userPoint(mockRequest, mockResponse, mockNext);

    expect(mockUserService.getUserPoint).toHaveBeenCalledTimes(1);
    expect(mockUserService.getUserPoint).toHaveBeenCalledWith(getUserPointBodyParams.userId);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: getUserPointReturnValue,
    });
  });
});
