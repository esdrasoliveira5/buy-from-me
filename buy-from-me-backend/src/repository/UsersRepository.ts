import { PrismaClient, Users } from '@prisma/client';
import {
  CreateUserData,
  DeleteUserData,
  UpdateUserData,
  UserIdOrEmail,
} from '../interfaces/UsersI';

class UsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async get(data: UserIdOrEmail): Promise<Users | null> {
    const response = await this.prisma.users.findUnique({
      where: data,
      include: { address: true },
    });
    return response;
  }

  async create(data: CreateUserData): Promise<Users > {
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

  async update(data: UpdateUserData): Promise<Users> {
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

  async delete(data: DeleteUserData) {
    const order = await this.prisma.orders.deleteMany({ where: { buyerId: data.userId } });
    const products = await this.prisma.products.deleteMany({ where: { usersId: data.userId } });
    const user = await this.prisma.users.delete({ where: { id: data.userId } });
    const address = await this.prisma.address.delete({ where: { id: data.addressId } });
    return { order, products, user, address };
  }
}

export default UsersRepository;
