import { Categories, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const categories: Categories[] = [
  { id: 1, name: 'Acessórios para Veículos' },
  { id: 2, name: 'Alimentos e Bebidas' },
  { id: 3, name: 'Animais' },
  { id: 4, name: 'Antiguidades e Coleções' },
  { id: 5, name: 'Arte, Papelaria e Armarinho' },
  { id: 6, name: 'Bebês' },
  { id: 7, name: 'Beleza e Cuidado Pessoal' },
  { id: 8, name: 'Brinquedos e Hobbies' },
  { id: 9, name: 'Calçados, Roupas e Bolsas' },
  { id: 10, name: 'Casa, Móveis e Decoração' },
  { id: 11, name: 'Celulares e Telefones' },
  { id: 12, name: 'Eletrodomésticos' },
  { id: 13, name: 'Eletrônicos, Áudio e Vídeo' },
  { id: 14, name: 'Esportes e Fitness' },
  { id: 15, name: 'Ferramentas' },
  { id: 16, name: 'Festas e Lembrancinhas' },
  { id: 17, name: 'Games' },
  { id: 18, name: 'Indústria e Comércio' },
  { id: 19, name: 'Informática' },
  { id: 20, name: 'Instrumentos Musicais' },
  { id: 21, name: 'Livros, Revistas e Comics' },
  { id: 22, name: 'Música, Filmes e Seriados' },
  { id: 23, name: 'Saúde' },
  { id: 24, name: 'Serviços' },
];

async function categoriesSeed() {
  const resultCategories = categories.map(async ({id, name}) =>{
    const response = await prisma.categories.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name,
      },
    })
    return response
  });
  await Promise.all(resultCategories);
};

categoriesSeed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
