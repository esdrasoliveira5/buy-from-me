import { Users } from '@prisma/client';

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
    user: Users,
    token: string,
  }
}
