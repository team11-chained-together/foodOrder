import {userRepository} from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class userService{
    userRepository = new userRepository(); //레포지토리 인스턴스 생성

    signup = async(email,password,name,address)=>{
    //비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10); 
    //새로운 유저 생성
    const createdUser = await this.userRepository.createdUser({
        email,
        password:hashedPassword,
        name,
        address,
    })
    if(!email || !password){
        throw new Error('email 과 password를 입력해주세요 ');
    }
    if(password.length< 8){
        throw new Error('비밀번호를 다시 설정하세요')
    }
    if (existEmail) {
        throw new Error('이미 존재하는 email 입니다.');
      }
    
    return {
        email : createdUser.email,
        name : createdUser.name,
        address : createdUser.address,
        createAt : createdUser.createAt,

        //return createdUser;
    }

   

}

    //로그인 서비스 로직
    login = async(email,password)=>{
        const user = await this.userRepository.logIn(email,password)
        //이메일로 유저가 맞나 확인
        if(!user){
            throw new Error('유저를 찾을 수 없습니다.');
        }
        //비밀번호 비교하여 확인 
        const passwordcheck = await bcrypt.compare(password.user.password);
        
        if(!passwordcheck){
            throw new Error('비밀번호가 일치하지 않습니다.');
        }
        //JWT발급
        const token = jwt.sign({userId:user.userId},process.env.JWT_SECRET,{
            expiresIn: '1h'
        });
        return{user,token};
        
    }

}