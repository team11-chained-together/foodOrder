//유저 생성 (회원 가입)
export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  //이메일 중복 체크
  checkEmail = async (email) => {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    return existingUser;
  };
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

  // 존재하지않는 이메일 확인
  findUserByEmail = async (email) => {
    const findUserByEmail = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return findUserByEmail;
  };

  // 포인트 0일때 확인
  // userPoint = async (point) => {
  //   const ckeckPoint = await this.prisma.user.findFirst({
  //     where: {
  //       point,
  //     },
  //   });
  //   return ckeckPoint;
  // };

  // 포인트 조회
  getUserPoint = async (userId) => {
    const userPoint = await this.prisma.user.findFirst({
      where: {
        userId: +userId,
      },
      select: {
        point: true,
      },
    });
    return userPoint;
  };
}
