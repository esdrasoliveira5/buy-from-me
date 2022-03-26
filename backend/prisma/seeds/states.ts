import { Orders, PrismaClient, Products, Users } from '@prisma/client'
const prisma = new PrismaClient();

const states = [
  { nome: 'MG' },
  { nome: 'AC' },
  { nome: 'AL' },
  { nome: 'AP' },
  { nome: 'AM' },
  { nome: 'BA' },
  { nome: 'CE' },
  { nome: 'DF' },
  { nome: 'ES' },
  { nome: 'GO' },
  { nome: 'MA' },
  { nome: 'MT' },
  { nome: 'MS' },
  { nome: 'PA' },
  { nome: 'PB' },
  { nome: 'PR' },
  { nome: 'PE' },
  { nome: 'PI' },
  { nome: 'RJ' },
  { nome: 'RN' },
  { nome: 'RS' },
  { nome: 'RO' },
  { nome: 'RR' },
  { nome: 'SC' },
  { nome: 'SP' },
  { nome: 'SE' },
  { nome: 'TO' },
];

async function statesSeed() {
  const resultState = states.map(async ({nome}, index) =>{
    const response = await prisma.states.upsert({
      where: { id: index  },
      update: {},
      create: {
        name: nome,
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