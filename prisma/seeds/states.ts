import { PrismaClient, States } from '@prisma/client'
const prisma = new PrismaClient();

const states: States[] = [
  { id: 1, name: 'MG' },
  { id: 2, name: 'AC' },
  { id: 3, name: 'AL' },
  { id: 4, name: 'AP' },
  { id: 5, name: 'AM' },
  { id: 6, name: 'BA' },
  { id: 7, name: 'CE' },
  { id: 8, name: 'DF' },
  { id: 9, name: 'ES' },
  { id: 10, name: 'GO' },
  { id: 11, name: 'MA' },
  { id: 12, name: 'MT' },
  { id: 13, name: 'MS' },
  { id: 14, name: 'PA' },
  { id: 15, name: 'PB' },
  { id: 16, name: 'PR' },
  { id: 17, name: 'PE' },
  { id: 18, name: 'PI' },
  { id: 19, name: 'RJ' },
  { id: 20, name: 'RN' },
  { id: 21, name: 'RS' },
  { id: 22, name: 'RO' },
  { id: 23, name: 'RR' },
  { id: 24, name: 'SC' },
  { id: 25, name: 'SP' },
  { id: 26, name: 'SE' },
  { id: 27, name: 'TO' },
];

async function statesSeed() {
  const resultState = states.map(async ({id, name}) =>{
    const response = await prisma.states.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name,
      },
    })
    return response
  });

  await Promise.all(resultState);
};

statesSeed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });