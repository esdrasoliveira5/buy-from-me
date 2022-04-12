import { PrismaClient, Users } from '@prisma/client'
const prisma = new PrismaClient();

const users: Users[] = [
  {
    id: '11',
    name: 'Roberto',
    lastName: 'Vendedor',
    email: 'roberto@email.com',
    contact: 987654321,
    password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuitl.SX32bmFLz5lvXYu7VF0V7NXdrTO',//roberto_password
    addressId: 11,
  },
  {
    id: '12',
    name: 'Amanda',
    lastName: 'Comprador',
    email: 'amanda@email.com',
    contact: 987654321,
    password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuOR4r5ax7.OhT0pICGqnbWx5VF0A87tW',//amanda_password
    addressId: 12,
  },
  {
    id: '13',
    name: 'Elias',
    lastName: 'Vendedor',
    email: 'elias@email.com',
    contact: 987654321,
    password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuVULm5UlVaC/fXmgFRB9AXiGdYYMXOm6',//elias_password
    addressId: 13,
  },
  {
    id: '14',
    name: 'Fernanda',
    lastName: 'Comprador',
    email: 'fernanda@email.com',
    contact: 987654321,
    password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuF6mbNYjy/6tIpw6IGdymEe2HXMfOECi',//fernanda_password
    addressId: 14,
  },
  {
    id: '15',
    name: 'Pricila',
    lastName: 'Vendedor',
    email: 'pricila@email.com',
    contact: 987654321,
    password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuitl.SX32bmFLz5lvXYu7VF0V7NXdrTO',//pricila_password
    addressId: 15,
  },
  {
    id: '16',
    name: 'Ricardo',
    lastName: 'Bahia',
    email: 'ricardo@email.com',
    contact: 987654321,
    password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuOR4r5ax7.OhT0pICGqnbWx5VF0A87tW',//ricardo_password
    addressId: 16,
  },
  {
    id: '17',
    name: 'Eliana',
    lastName: 'Vendedor',
    email: 'eliana@email.com',
    contact: 987654321,
    password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuVULm5UlVaC/fXmgFRB9AXiGdYYMXOm6',//eliana
    addressId: 17,
  },
  {
    id: '18',
    name: 'Pedro',
    lastName: 'Comprador',
    email: 'pedro@email.com',
    contact: 987654321,
    password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuF6mbNYjy/6tIpw6IGdymEe2HXMfOECi',//pedro_password
    addressId: 18,
  },
  {
    id: '19',
    name: 'Ana',
    lastName: 'Vendedor',
    email: 'ana@email.com',
    contact: 987654321,
    password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuVULm5UlVaC/fXmgFRB9AXiGdYYMXOm6',//ana_password
    addressId: 19,
  },
  {
    id: '20',
    name: 'Gabriel',
    lastName: 'Comprador',
    email: 'gabriel@email.com',
    contact: 987654321,
    password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuF6mbNYjy/6tIpw6IGdymEe2HXMfOECi',//gabriel_password
    addressId: 20,
  }
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