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
    sellerId: '20',
  },
  {
    productsId: 13,
    buyerId: '14',
    sellerId: '12',
  },
  {
    productsId: 14,
    buyerId: '13',
    sellerId: '19',
  },
  {
    productsId: 15,
    buyerId: '12',
    sellerId: '13',
  },
  {
    productsId: 16,
    buyerId: '11',
    sellerId: '18',
  },
  {
    productsId: 17,
    buyerId: '17',
    sellerId: '14',
  },
  {
    productsId: 18,
    buyerId: '13',
    sellerId: '17',
  },
  {
    productsId: 19,
    buyerId: '14',
    sellerId: '15',
  },
  {
    productsId: 20,
    buyerId: '13',
    sellerId: '16',
  },
  {
    productsId: 24,
    buyerId: '13',
    sellerId: '14',
  },
  {
    productsId: 41,
    buyerId: '19',
    sellerId: '14',
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
