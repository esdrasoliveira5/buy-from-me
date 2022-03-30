import { PrismaClient, Products } from '@prisma/client';
import { SearchData, UpdateSoldData } from '../interfaces/ProductsI';

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
      where: {
        sold: false,
      },
    });
    return products;
  }

  async getByFilter(page: number, data: SearchData, name: string | undefined):
  Promise<Products[]> {
    const products = await this.prisma.products.findMany({
      skip: page,
      take: 20,
      where: {
        ...data,
        name: { contains: name, mode: 'insensitive' },
      },
    });
    return products;
  }

  async create(data: Omit<Products, 'id'>): Promise<Products> {
    const newProduct = await this.prisma.products.create({
      data: {
        ...data,
      },
    });

    return newProduct;
  }

  async update(id: number, data: Omit<Products, 'id'> | UpdateSoldData): Promise<Products> {
    const product = await this.prisma.products.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return product;
  }
}
export default ProductsRepository;
