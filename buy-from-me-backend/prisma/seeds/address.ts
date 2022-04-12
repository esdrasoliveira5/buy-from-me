import { Address, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const address: Address[] = [
  {
    id: 11,
    street: 'Pedra',
    number: '1000',
    district: 'Santa Monica',
    city: 'Mario',
    zipcode: 987654321,
    statesId: 1,
  },
  {
    id: 12,
    street: 'Amarela',
    number: '500A',
    district: 'Dom',
    city: 'Luz',
    zipcode: 986584321,
    statesId: 2,
  },
  {
    id: 13,
    street: 'Azaleia',
    number: '800',
    district: 'Mastervile',
    city: 'Amaral',
    zipcode: 8986821,
    statesId: 3,
  },
  {
    id: 14,
    street: 'Centro',
    number: '50C',
    district: 'Carlos Prates',
    city: 'Penas Brancas',
    zipcode: 986548321,
    statesId: 4,
  },
  {
    id: 15,
    street: 'Jaboticabas',
    number: '150',
    district: 'Amaral',
    city: 'Santana',
    zipcode: 987654321,
    statesId: 1,
  },
  {
    id: 16,
    street: 'Av das Flores',
    number: '40A',
    district: 'Laranja',
    city: 'Santa Luzia',
    zipcode: 988684321,
    statesId: 9,
  },
  {
    id: 17,
    street: 'Bauba',
    number: '10',
    district: 'Centro',
    city: 'Fernando Prado',
    zipcode: 63846821,
    statesId: 10,
  },
  {
    id: 18,
    street: 'Oliveira',
    number: '578C',
    district: 'Silveira',
    city: 'Passo Largo',
    zipcode: 35688321,
    statesId: 13,
  },
  {
    id: 19,
    street: 'Lionel Rich',
    number: '30A',
    district: 'Ferdinando',
    city: 'Minas Azuis',
    zipcode: 89885237,
    statesId: 17,
  },
  {
    id: 20,
    street: 'Pedreira',
    number: '79C',
    district: 'Calamar',
    city: 'Santa fe',
    zipcode: 68435321,
    statesId: 15,
  }
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