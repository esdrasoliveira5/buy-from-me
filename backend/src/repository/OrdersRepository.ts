import { Orders, PrismaClient } from '@prisma/client';

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
}
export default OrdersRepository;
