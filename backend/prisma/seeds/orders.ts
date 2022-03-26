import { Orders, PrismaClient, Products, Users } from '@prisma/client'
const prisma = new PrismaClient();

const orders = [
  {
    productsId: 2,
    buyerId: '134',
    sellerId: '234',
  },
  {
    productsId: 1,
    buyerId: '134',
    sellerId: '123',
  },
  {
    productsId: 4,
    buyerId: '134',
    sellerId: '123',
  },
  {
    productsId: 5,
    buyerId: '234',
    sellerId: '134',
  },
];

async function orderSeed() {
  const resultProducts = orders.map(async (order, index) =>{
    const response = await prisma.orders.upsert({
      where: { id: index },
      update: {},
      create: {
        ...order,
      },
    })
    return response
  });

  await Promise.all(resultProducts);
};

orderSeed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });