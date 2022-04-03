import { Address, Users } from '@prisma/client';

export type LoginData = {
  email: string;
  password: string;
};

export type CreateUserData = {
  user: Omit<Users, 'id | addressId'>;
  address: Omit<Address, 'id'>;
};

export type UpdateUserData = {
  user: Omit<Users, 'email'>;
  address: Omit<Address, 'id'>;
};

export type DeleteUserData = {
  userId: string;
  addressId: number;
};

export type UserIdOrEmail = {
  id?: string;
  email?: string;
};

export type UserT = {
  id: string;
  name: string;
  email: string;
};

export type Token = string | undefined;
