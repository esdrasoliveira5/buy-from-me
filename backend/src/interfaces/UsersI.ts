import { Address, Users } from '@prisma/client';

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateUserData {
  user: Omit<Users, 'id | addressId'>;
  address: Omit<Address, 'id'>;
}

export interface UpdateUserData {
  user: Omit<Users, 'email'>;
  address: Omit<Address, 'id'>;
}

export interface DeleteUserData {
  userId: string;
  addressId: number;
}

export interface UserIdOrEmail {
  id?: string;
  email?: string;
}
