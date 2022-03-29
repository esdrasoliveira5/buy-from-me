import { PrismaClient, Products } from '@prisma/client';

class ProductsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async get(id: number): Promise<Products | null> {
    const product = await this.prisma.products.findUnique({
      where: { id },
    });
    return product;
  }

  async getAll(page: number): Promise<Products[]> {
    const products = await this.prisma.products.findMany({
      skip: page,
      take: 20,
    });
    return products;
  }
}
export default ProductsRepository;
