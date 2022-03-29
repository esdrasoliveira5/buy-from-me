import { PrismaClient, Users } from '@prisma/client';
import { CreateUserData, UpdateUserData } from '../interfaces/UsersI';

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
      include: { address: true },
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
      include: { address: true },
    });
    return response;
  }

  async update(data: UpdateUserData): Promise<undefined | Users> {
    const addressRes = await this.prisma.address.update({
      where: { id: data.user.addressId },
      data: data.address,
    });
    if (addressRes === undefined) return addressRes;
    const response = await this.prisma.users.update({
      where: { id: data.user.id },
      data: {
        ...data.user,
      },
      include: { address: true },
    });
    return response;
  }
}

export default UsersRepository;
