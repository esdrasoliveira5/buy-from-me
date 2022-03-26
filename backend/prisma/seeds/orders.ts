import { Orders, PrismaClient, Products, Users } from '@prisma/client'
const prisma = new PrismaClient();

const orders = [
  {
    productsId: 2,
    buyerId: '1',
    sellerId: '4',
  },
  {
    productsId: 1,
    buyerId: '3',
    sellerId: '1',
  },
  {
    productsId: 4,
    buyerId: '1',
    sellerId: '3',
  },
  {
    productsId: 5,
    buyerId: '4',
    sellerId: '2',
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