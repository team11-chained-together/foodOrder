// User의 컨트롤러(Controller)역할을 하는 클래스
export class UserController {
    constructor(userService){
        this.userService = userService; 
    }
 // 유저 생성 ( 회원 가입 )
 
 userSignup = async (req, res, next) => {
    try {
      const { 
        email,
        password,
        name,
        address,
        type,
    } = req.body;

      // 서비스 계층에 구현된 createUser 로직을 실행합니다.
      const createdUser = await this.userService.signup(
        email,
        password,
        name,
        address,
        type,
      );

      return res.status(201).json({ 
        message: '회원가입 성공!',
        user:createdUser,
    });
    } catch (err) {
      
        res.status(500).json({
            message:"회원가입 실패!",
        });
    }
  };
}