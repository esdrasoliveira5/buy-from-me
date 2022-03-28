import { Address, Users } from '@prisma/client';

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateUserData {
  user: Omit<Users, 'id | addressId'>;
  address: Omit<Address, 'id'>;
}
