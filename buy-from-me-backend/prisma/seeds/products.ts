import { PrismaClient, Products } from '@prisma/client'
const prisma = new PrismaClient();

const products: Omit<Products, 'id'>[] = [
  {
    name: 'TV',
    description: 'FullHd',
    price: 1500,
    sold: false,
    categoriesId: 12,
    new: false,
    usersId: '1',
  },
  {
    name: 'Celular',
    description: 'Ifome',
    price: 2500,
    sold: false,
    new: false,
    categoriesId: 15,
    usersId: '2',
  },
  {
    name: 'Lavadora de roupas',
    description: 'Pesada',
    price: 500,
    sold: false,
    new: false,
    categoriesId: 11,
    usersId: '1',
  },
  {
    name: 'Geladeira',
    description: 'Grande',
    price: 1000,
    sold: false,
    new: false,
    categoriesId: 11,
    usersId: '4',
  },
  {
    name: 'Laptop',
    description: 'gamer',
    price: 15000,
    sold: false,
    new: false,
    categoriesId: 19,
    usersId: '3',
  },
  {
    name: 'TV LCD',
    description: '4K',
    price: 7500,
    sold: false,
    new: false,
    categoriesId: 12,
    usersId: '4',
  },
  {
    name: 'TV2',
    description: 'FullHd2',
    price: 1800,
    sold: false,
    new: false,
    categoriesId: 12,
    usersId: '2',
  },
  {
    name: 'Celular3',
    description: 'Ifome',
    price: 900,
    sold: false,
    new: false,
    categoriesId: 5,
    usersId: '1',
  },
  {
    name: 'Lavadora de roupas2',
    description: 'Pesada',
    price: 500,
    sold: false,
    new: false,
    categoriesId: 7,
    usersId: '4',
  },
  {
    name: 'Geladeira2',
    description: 'Grande',
    price: 1000,
    sold: false,
    new: true,
    categoriesId: 6,
    usersId: '3',
  },
  {
    name: 'Outra coisa 2',
    description: 'gamer',
    price: 8000,
    sold: false,
    new: true,
    categoriesId: 10,
    usersId: '1',
  },
  {
    name: 'Outra Coisa',
    description: 'Sei la',
    price: 700,
    sold: false,
    new: true,
    categoriesId: 2,
    usersId: '4',
  }
];

async function productsSeed() {
  const resultProducts = products.map(async (products, index) =>{
    const response = await prisma.products.upsert({
      where: { id: index },
      update: {},
      create: {
        ...products,
      },
    })
    return response
  });

  await Promise.all(resultProducts);
};

productsSeed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });