//유저 생성 (회원 가입)
export class UserRepository{
  constructor(prisma) {
    this.prisma = prisma
  }
  //이메일 중복 체크 
    checkEmail= async (email) =>{
      const existingUser = await this.prisma.user.findUnique({
        where:{email}
      });
      return existingUser;
    }
    // 유저 생성
    createdUser = async (email, hashedPassword, name, address, type) => {
    
        const createdUser = await this.prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
            address,
            type,
          },
        });
        return createdUser;
      };

}