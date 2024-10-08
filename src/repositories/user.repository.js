//유저 생성 (회원 가입)
export class UserRepository{
  constructor(prisma) {
    this.prisma = prisma
  }

    checkEmail= async (email) =>{
      const existingUser = await this.prisma.user.findUnique({
        where:{email}
      });
      return existingUser;
    }

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