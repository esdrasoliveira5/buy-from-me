import { Orders, Products, Users } from '@prisma/client';
import { UserT } from './UsersI';

export interface Status {
  status: number;
}

export interface ResponseError extends Status {
  response: {
    error: string;
  };
}

export interface ResponseUser extends Status {
  response : Users;
}

export interface ResponseToken extends Status {
  response: {
    user: UserT,
    token: string,
  };
}

export interface ResponseDelete extends Status {
  response : { message: string };
}

export interface ResponseProducts extends Status {
  response: Products | Products[];
}

export interface ResponseOrders extends Status {
  response: Orders | Orders[];
}
