import { ResponseError, ResponseToken } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import { Login } from '../interfaces/UsersI';
import UsersRepository from '../repository/UsersRepository';
import Bcrypt from '../validations/Bcrypt';
import JoiValidations from '../validations/JoiValidations';
import Token from '../validations/Token';

class UsersServices {
  private _userNotFound: ResponseError;

  private validations: JoiValidations;

  private repository: UsersRepository;

  private bcrypt: Bcrypt;

  private token: Token;

  constructor() {
    this._userNotFound = { status: StatusCode.NOT_FOUND, response: { error: 'User not found' } };
    this.validations = new JoiValidations();
    this.repository = new UsersRepository();
    this.bcrypt = new Bcrypt();
    this.token = new Token();
  }

  async get(data: Login): Promise<ResponseError | ResponseToken> {
    const { email, password } = data;
    const validData = this.validations.login(email, password);
    if (validData) return validData;
    const response = await this.repository.get(email);
    if (response === null) return this._userNotFound;
    const validPassword = await this.bcrypt.compareIt(password, response.password);
    if (validPassword) return validPassword;
    const newToken = this.token.generate({ id: response.id, email: response.email });
    const newResponse = { user: response, token: newToken };
    return { status: StatusCode.OK, response: newResponse };
  }
}

export default UsersServices;
