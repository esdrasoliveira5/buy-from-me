import { ResponseError, ResponseToken, ResponseUser } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import { CreateUserData, LoginData } from '../interfaces/UsersI';
import UsersRepository from '../repository/UsersRepository';
import Bcrypt from '../validations/Bcrypt';
import JoiValidations from '../validations/JoiValidations';
import Token from '../validations/Token';

class UsersServices {
  private _userNotFound: ResponseError;

  private _iternalServerError: ResponseError;

  private _conflict: ResponseError;

  private validations: JoiValidations;

  private repository: UsersRepository;

  private bcrypt: Bcrypt;

  private token: Token;

  constructor() {
    this._userNotFound = { status: StatusCode.NOT_FOUND, response: { error: 'User not found' } };
    this._iternalServerError = {
      status: StatusCode.INTERNAL_SERVER_ERROR,
      response: { error: 'fail to create' } };
    this._conflict = {
      status: StatusCode.CONFLICT,
      response: { error: 'user already registered' } };
    this.validations = new JoiValidations();
    this.repository = new UsersRepository();
    this.bcrypt = new Bcrypt();
    this.token = new Token();
  }

  async get(data: LoginData): Promise<ResponseError | ResponseToken> {
    const { email, password } = data;

    const validData = this.validations.login(data);
    if (validData) return validData;

    const response = await this.repository.get(email);
    if (response === null) return this._userNotFound;

    const validPassword = await this.bcrypt.compareIt(password, response.password);
    if (validPassword) return validPassword;

    const newToken = this.token.generate({ id: response.id, email: response.email });
    const newResponse = { user: response, token: newToken };
    return { status: StatusCode.OK, response: newResponse };
  }

  async create(data: CreateUserData): Promise<ResponseError | ResponseUser> {
    const { user, address } = data;

    const validUser = this.validations.user(user);
    if (validUser) return validUser;

    const validAddress = this.validations.address(address);
    if (validAddress) return validAddress;

    const userRes = await this.repository.get(user.email);
    if (userRes) return this._conflict;

    const newPassword = await this.bcrypt.hashIt(user.password);
    const userData = { ...user, password: newPassword };

    const response = await this.repository.create({ user: userData, address });
    if (response === undefined) return this._iternalServerError;
    return { status: StatusCode.CREATED, response };
  }
}

export default UsersServices;
