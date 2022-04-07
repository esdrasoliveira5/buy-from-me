import { Orders, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const orders = [
  {
    productsId: 11,
    buyerId: '12',
    sellerId: '11',
  },
  {
    productsId: 12,
    buyerId: '11',
    sellerId: '12',
  },
  {
    productsId: 13,
    buyerId: '14',
    sellerId: '13',
  },
  {
    productsId: 14,
    buyerId: '13',
    sellerId: '14',
  },
  {
    productsId: 18,
    buyerId: '12',
    sellerId: '14',
  },
  {
    productsId: 17,
    buyerId: '11',
    sellerId: '13',
  },
  {
    productsId: 16,
    buyerId: '14',
    sellerId: '12',
  },
  {
    productsId: 15,
    buyerId: '13',
    sellerId: '11',
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
