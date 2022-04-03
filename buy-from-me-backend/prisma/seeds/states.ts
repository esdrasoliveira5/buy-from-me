import { PrismaClient, States } from '@prisma/client'
const prisma = new PrismaClient();

const states: Omit<States, 'id'>[] = [
  { name: 'MG' },
  { name: 'AC' },
  { name: 'AL' },
  { name: 'AP' },
  { name: 'AM' },
  { name: 'BA' },
  { name: 'CE' },
  { name: 'DF' },
  { name: 'ES' },
  { name: 'GO' },
  { name: 'MA' },
  { name: 'MT' },
  { name: 'MS' },
  { name: 'PA' },
  { name: 'PB' },
  { name: 'PR' },
  { name: 'PE' },
  { name: 'PI' },
  { name: 'RJ' },
  { name: 'RN' },
  { name: 'RS' },
  { name: 'RO' },
  { name: 'RR' },
  { name: 'SC' },
  { name: 'SP' },
  { name: 'SE' },
  { name: 'TO' },
];

async function statesSeed() {
  const resultState = states.map(async ({name}, index) =>{
    const response = await prisma.states.upsert({
      where: { id: index  },
      update: {},
      create: {
        name: name,
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