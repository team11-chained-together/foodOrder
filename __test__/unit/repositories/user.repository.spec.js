import {beforeEach,describe,expect,jest, test} from '@jest/globals';
import { UserRepository } from '../../../src/repositories/user.repository';

//jest.fn()를 활영 하여 create 와 findUnique 메서드를 Mock 처리 .
let mockPrisma ={
    user:{
        create:jest.fn(),
        findUnique:jest.fn(),
    },
};
//프리즈마 Mock 버전과 함께 인스턴스 생성
let userRepository = new UserRepository(mockPrisma);

describe('User Repository Unit Test',() => {
//각 test가 실행되기 전에 실행됩니다.
beforeEach(()=>{
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
});

// checkEmail 메서드를 테스트 시작
test('checkEmail Method',async()=>{
    // 1. findStoreByUserId 메서드의 반환값을 설정한다.
    const mockReturn = {
        id:1, email:'test@example.com'
    };
    
    //findUnique 가 호출될때 mockReturn 을 반환
    mockPrisma.user.findUnique.mockReturnValue(mockReturn);

    //테스트할 이메일을 정의
    const email = 'test@example.com';
    //checkEmail 를 실행 하는 부분
    const existingUser = await userRepository.checkEmail(email);
    //비교하는 부분
    expect(existingUser).toEqual(mockReturn);
    //findUnique 를 한 번 호출되는지 테스트
    expect(mockPrisma.user.findUnique).toHaveBeenCalledTimes(1);
    //findUnique가 이메일 값으로 호출되는지 확인
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where:{ email }, //email이 기준
    });
});

//createUser 메소드 테스트 시작
test('createUser Method',async()=>{
    //Mock 데이터설정 , 유저 생성 결과값 설정
    const mockReturn = {
        id:1,name:'Created User'
    };
    //create가 호출될 때 mockReturn 값 반환 하도록 설정 
    mockPrisma.user.create.mockReturnValue(mockReturn);

    //유저 생성 피라미터 설정 id 는 autoincrement 값이라 설정하지 않음. 다른부분도 마찬가지
    const createUserParams={
        email:'test@example.com',
        password:'hashPassword',
        name: 'createName',
        address: 'createAddress',
        type: true, //유저 타입을 불리언으로 설정해서 true
    };  

    //createdUser 메서드가 실행되는 부분
    const createUserData = await userRepository.createdUser(
        createUserParams.email,
        createUserParams.hashPassword,
        createUserParams.name,
        createUserParams.address,
        createUserParams.type,
    );
    // 비교부분
    expect(createUserData).toEqual(mockReturn);
    //한 번 호출되었는지 확인
    expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
    //메서드가 올바르게 호출되었는지 확인
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data:{
            email:createUserParams.email,
            password:createUserParams.hashPassword,
            name:createUserParams.name,
            address:createUserParams.address,
            type:createUserParams.type,
        },
        });
    });
});


