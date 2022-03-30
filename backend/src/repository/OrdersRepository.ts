import { Orders, PrismaClient } from '@prisma/client';
import { OrderBuyerOrSeller } from '../interfaces/OrdersI';

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

  async create(data: Omit<Orders, 'id'>) {
    const order = await this.prisma.orders.create({
      data: {
        ...data,
      },
    });
    return order;
  }
}
export default OrdersRepository;
