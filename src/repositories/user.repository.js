export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  checkEmail = async (email) => {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return existingUser;
  };

  createdUser = async (email, hashedPassword, name, address, isOwner) => {
    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        address,
        isOwner,
      },
    });
    return createdUser;
  };

  findUserByEmail = async (email) => {
    const findUserByEmail = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return findUserByEmail;
  };

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
