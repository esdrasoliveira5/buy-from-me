import { sign, SignOptions, verify } from 'jsonwebtoken';
import * as path from 'path';
import fs = require('fs');
import { ResponseError } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';

export type TokenType = {
  id: string;
  email: string;
};

class JwToken {
  private secret: string;

  private jwtConfig: SignOptions;

  constructor() {
    this.secret = fs.readFileSync(path.resolve('jwt.evaluation.key'), 'utf8');
    this.jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  }

  generate(data: TokenType): string {
    const token: string = sign(data, this.secret, this.jwtConfig);
    return token;
  }

  validate(token: string | undefined): ResponseError | TokenType {
    if (token === undefined) {
      return { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid token' } };
    }
    try {
      const decoded = verify(token, this.secret) as TokenType;
      return decoded;
    } catch (err) {
      return { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid token' } };
    }
  }
}
export default JwToken;
