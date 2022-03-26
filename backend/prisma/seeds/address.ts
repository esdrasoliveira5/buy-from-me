import { Address, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const address: Address[] = [
  {
    id: 1,
    street: 'Pedra',
    number: '1000',
    district: 'Santa Monica',
    city: 'Mario',
    zipcode: 987654321,
    statesId: 1,
  },
  {
    id: 2,
    street: 'Amarela',
    number: '500A',
    district: 'Dom',
    city: 'Luz',
    zipcode: 986584321,
    statesId: 2,
  },
  {
    id: 3,
    street: 'Azaleia',
    number: '800',
    district: 'Mastervile',
    city: 'Amaral',
    zipcode: 8986821,
    statesId: 3,
  },
  {
    id: 4,
    street: 'Centro',
    number: '50C',
    district: 'Carlos Prates',
    city: 'Penas Brancas',
    zipcode: 986548321,
    statesId: 4,
  },
];

async function addressSeed() {
  const resultUsers = address.map(async (address) =>{
    const response = await prisma.address.upsert({
      where: { id: address.id },
      update: {},
      create: {
        ...address,
      },
    })
    return response
  });
  await Promise.all(resultUsers);
};

addressSeed().catch((e) => {
    console.error(e)
    process.exit(1)
  }).finally(async () => {
    await prisma.$disconnect()
});