import { PrismaClient, Users } from '@prisma/client';
import { CreateUserData } from '../interfaces/UsersI';

class UsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async get(email:string): Promise<Users | null> {
    const response = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    return response;
  }

  async create(data: CreateUserData): Promise< undefined | Users > {
    const addressRes = await this.prisma.address.create({
      data: data.address,
    });
    if (addressRes === undefined) return addressRes;
    const response = await this.prisma.users.create({
      data: {
        ...data.user,
        addressId: addressRes.id,
      },
    });
    return response;
  }
}

export default UsersRepository;
