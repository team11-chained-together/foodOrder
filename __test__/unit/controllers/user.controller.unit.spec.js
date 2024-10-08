import {jest, test,expect} from '@jest/globals'
import { UserController } from '../../../src/controllers/user.controller'

const mockUserService = {
    signUp: jest.fn()
};

const mockRequest = {
    body:jest.fn()
}

const mockResponse = {
    json:jest.fn(),
    status : jest.fn(),
}

const mockNext = jest.fn();

const userController = new UserController(mockUserService);

describe('UserController Unit Test', ()=>{
    beforeEach(()=>{
        jest.resetAllMocks();

        mockResponse.status.mockReturnValue(mockResponse);
    });
test('signUp Method by Success', async()=>{
    const signUpRequestBodyParams ={
		email: "asdasdasdasdfsadffdfdff",
        password:"aaaa4321",
		name: "홍길동",
		address: "seoul",
		type: true,
        }

        mockRequest.body = signUpRequestBodyParams;
        const signUpReturnValue = {
                userId: 1,
                ...signUpRequestBodyParams,
                createdAt: new Date().toString(),
        };
        mockUserService.signUp.mockReturnValue(signUpReturnValue);

        await userController.userSignup(mockRequest,mockResponse);        
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
            message:'회원가입 성공!',
            data:signUpReturnValue
            
        });

    });

    test('signUp Method by Invalid Params Error', async () =>{
        await userController.userSignup(mockRequest,mockResponse);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(500);

        expect(mockRequest.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({message:'회원가입 실패!'});
    })
})
