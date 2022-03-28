import bcrypt = require('bcrypt');
import { ResponseError } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';

class Bcrypt {
  private salt: string;

  private _invalidPassword: ResponseError;

  constructor() {
    this.salt = bcrypt.genSaltSync(10);
    this._invalidPassword = {
      status: StatusCode.UNAUTHORIZED,
      response: { error: 'Invalid password' },
    };
  }

  async hashIt(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, this.salt);
    return hashed;
  }

  async compareIt(password: string, hashedPassword: string): Promise<void | ResponseError> {
    const response = await bcrypt.compare(password, hashedPassword);
    if (!response) return this._invalidPassword;
  }
}

export default Bcrypt;
