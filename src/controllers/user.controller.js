import {userService} from '../services/user.service.js';

// User의 컨트롤러(Controller)역할을 하는 클래스
export class userController {
    constructor(){
        this.userService = new userService(); 
    }
 // 유저 생성 ( 회원 가입 )
 
 userSignup = async (req, res, next) => {
    try {
      const { 
        email,
        password,
        name,
        address 
    } = req.body;

      // 서비스 계층에 구현된 createUser 로직을 실행합니다.
      const createdUser = await this.userService.createdUser(
        email,
        password,
        name,
        address,
      );

      return res.status(201).json({ 
        message: '회원가입 성공!',
        data: createdUser 
    });
    } catch (err) {
        res.status(500).json({
            error:'회원가입 실패!',
            details : error.message||'에러가 발생 했습니다.'
        });
    }
  };

  userLogin = async(req,res,next)=>{
   try{
      const {email, password } = req.body;

      const loginUser = await this.userService.logIn(email,password);

      return res.status(200).json({ data: loginUser });

    
  } catch (err) {
    next(err)
  }

  }
}