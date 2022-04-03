import { Orders, PrismaClient } from '@prisma/client';
import { OrderBuyerOrSeller, OrderData } from '../interfaces/OrdersI';

class OrdersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async get(id: number): Promise<Orders | null> {
    const order = await this.prisma.orders.findUnique({
      where: { id },
    });
    return order;
  }

  async getAll(data: OrderBuyerOrSeller): Promise<Orders[]> {
    const orders = await this.prisma.orders.findMany({
      where: {
        ...data,
      },
    });
    return orders;
  }

  async create(data: OrderData): Promise<Orders> {
    const order = await this.prisma.orders.create({
      data: {
        ...data,
      },
    });
    return order;
  }

  async delete(id: number) {
    const order = await this.prisma.orders.delete({ where: { id } });
    return order;
  }
}
export default OrdersRepository;
