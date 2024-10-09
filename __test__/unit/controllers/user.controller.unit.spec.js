import { jest, test, expect } from '@jest/globals';
import { UserController } from '../../../src/controllers/user.controller';
import { UserService } from '../../../src/services/user.service';

const mockUserService = {
  signUp: jest.fn(),
  logIn: jest.fn(),
  getUserPoint: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  json: jest.fn(),
  status: jest.fn(),
};

const mockNext = jest.fn();

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
      email: 'asdasdasdasdfsadffdfdff',
      password: 'aaaa4321',
      name: '홍길동',
      address: 'seoul',
      type: true,
    };

    mockRequest.body = signUpRequestBodyParams;
    const signUpReturnValue = {
      userId: 1,
      ...signUpRequestBodyParams,
      createdAt: new Date().toString(),
    };
    mockUserService.signUp.mockReturnValue(signUpReturnValue);

    await userController.userSignup(mockRequest, mockResponse);
    expect(mockUserService.signUp).toHaveBeenCalledTimes(1);
    expect(mockUserService.signUp).toHaveBeenCalledWith(
      signUpRequestBodyParams.email,
      signUpRequestBodyParams.password,
      signUpRequestBodyParams.name,
      signUpRequestBodyParams.address,
      signUpRequestBodyParams.type,
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
      email: 'asdfasdfasdf',
      password: 'aaaa43321',
      res: { json: mockResponse.json, status: mockResponse.status },
    };
    mockRequest.body = logInRequestBodyParams;

    const logInReturnValue = {
      message: '로그인 성공',
    };
    mockUserService.logIn.mockReturnValue(logInReturnValue);

    await userController.userLogin(mockRequest, mockResponse, mockNext);
    expect(mockUserService.logIn).toHaveBeenCalledTimes(1);
    expect(mockUserService.logIn).toHaveBeenCalledWith(
      logInRequestBodyParams.email,
      logInRequestBodyParams.password,
      logInRequestBodyParams.res,
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: '로그인 성공!' });
  });

  //포인트 성공
  test('getUserPoint', async () => {
    const getUserPointParams = {
      userId: 1,
      point: true,
    };

    mockRequest.body = getUserPointParams;

    const getUserPointValue = {
      point: 10000,
    };

    mockUserService.getUserPoint.mockReturnValue(getUserPointValue);

    await userController.userPoint(mockRequest, mockResponse, mockNext);
    expect(mockUserService.getUserPoint).toHaveBeenCalledTimes(1);
    expect(mockUserService.getUserPoint).toHaveBeenCalledWith(
      getUserPointParams.userId,
      getUserPointParams.point,
    );

    expect(mockResponse.status).toBeCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toBeCalledTimes(1);
    expect(mockResponse.json).toBeCalledWith({
      data: getUserPointValue,
    });
  });
});
