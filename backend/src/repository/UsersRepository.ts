import { PrismaClient, Users } from '@prisma/client';

class UsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async get(email:string): Promise<Users | null> {
    const response = this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    return response;
  }
}

export default UsersRepository;
