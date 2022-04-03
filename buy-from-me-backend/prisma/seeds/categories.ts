import { Categories, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const categories: Omit<Categories, 'id'>[] = [
  { name: 'Acessórios para Veículos' },
  { name: 'Alimentos e Bebidas' },
  { name: 'Animais' },
  { name: 'Antiguidades e Coleções' },
  { name: 'Arte, Papelaria e Armarinho' },
  { name: 'Bebês' },
  { name: 'Beleza e Cuidado Pessoal' },
  { name: 'Brinquedos e Hobbies' },
  { name: 'Calçados, Roupas e Bolsas' },
  { name: 'Casa, Móveis e Decoração' },
  { name: 'Celulares e Telefones' },
  { name: 'Eletrodomésticos' },
  { name: 'Eletrônicos, Áudio e Vídeo' },
  { name: 'Esportes e Fitness' },
  { name: 'Ferramentas' },
  { name: 'Festas e Lembrancinhas' },
  { name: 'Games' },
  { name: 'Indústria e Comércio' },
  { name: 'Informática' },
  { name: 'Instrumentos Musicais' },
  { name: 'Livros, Revistas e Comics' },
  { name: 'Música, Filmes e Seriados' },
  { name: 'Saúde' },
  { name: 'Serviços' },
];

async function categoriesSeed() {
  const resultCategories = categories.map(async ({name}, index) =>{
    const response = await prisma.categories.upsert({
      where: { id: index  },
      update: {},
      create: {
        name: name,
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
