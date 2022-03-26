import { Orders, PrismaClient, Products, Users } from '@prisma/client'
const prisma = new PrismaClient();

const users = [
  {
    id: '1',
    name: 'Roberto',
    lastName: 'Vendedor',
    email: 'roberto@email.com',
    contact: 987654321,
    password: '123456789',
    addressId: 1,
  },
  {
    id: '2',
    name: 'Amanda',
    lastName: 'Comprador',
    email: 'amanda@email.com',
    contact: 987654321,
    password: '123456789',
    addressId: 2,
  },
  {
    id: '3',
    name: 'Elias',
    lastName: 'Vendedor',
    email: 'elias@email.com',
    contact: 987654321,
    password: '123456789',
    addressId: 3,
  },
  {
    id: '4',
    name: 'Fernanda',
    lastName: 'Comprador',
    email: 'fernanda@email.com',
    contact: 987654321,
    password: '123456789',
    addressId: 4,
  },
];

async function usersSeed() {
  const resultUsers = users.map(async (user) =>{
    const response = await prisma.users.upsert({
      where: { id: user.id },
      update: {},
      create: {
        ...user,
      },
    })
    return response
  });
  await Promise.all(resultUsers);
};

usersSeed().catch((e) => {
    console.error(e)
    process.exit(1)
  }).finally(async () => {
    await prisma.$disconnect()
});