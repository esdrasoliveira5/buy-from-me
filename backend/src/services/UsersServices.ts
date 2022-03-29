import { ResponseError, ResponseToken, ResponseUser } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import { CreateUserData, LoginData, UpdateUserData } from '../interfaces/UsersI';
import UsersRepository from '../repository/UsersRepository';
import Bcrypt from '../validations/Bcrypt';
import JoiValidations from '../validations/JoiValidations';
import JwToken from '../validations/JwToken';

class UsersServices {
  private _userNotFound: ResponseError;

  private _iternalServerError: ResponseError;

  private _conflict: ResponseError;

  private _unauthorized: ResponseError;

  private validations: JoiValidations;

  private repository: UsersRepository;

  private bcrypt: Bcrypt;

  private jwt: JwToken;

  constructor() {
    this._userNotFound = { status: StatusCode.NOT_FOUND, response: { error: 'User not found' } };
    this._iternalServerError = {
      status: StatusCode.INTERNAL_SERVER_ERROR,
      response: { error: 'fail to create' } };
    this._conflict = {
      status: StatusCode.CONFLICT,
      response: { error: 'user already registered' } };
    this._unauthorized = { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid token' } };
    this.validations = new JoiValidations();
    this.repository = new UsersRepository();
    this.bcrypt = new Bcrypt();
    this.jwt = new JwToken();
  }

  async get(data: LoginData): Promise<ResponseError | ResponseToken> {
    const { email, password } = data;

    const validData = this.validations.login(data);
    if (validData) return validData;

    const response = await this.repository.get(email);
    if (response === null) return this._userNotFound;

    const validPassword = await this.bcrypt.compareIt(password, response.password);
    if (validPassword) return validPassword;

    const newToken = this.jwt.generate({ id: response.id, email: response.email });
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

  async update(token: string | undefined, data: UpdateUserData):
  Promise<ResponseUser | ResponseError> {
    const { user, address } = data;

    const tokenValid = this.jwt.validate(token);
    if ('status' in tokenValid) return tokenValid;
    if (tokenValid.id !== data.user.id) return this._unauthorized;

    const validUser = this.validations.userUpdate(user);
    if (validUser) return validUser;

    const validAddress = this.validations.address(address);
    if (validAddress) return validAddress;

    const responseUser = await this.repository.get(tokenValid.email);
    if (responseUser === null) return this._userNotFound;

    const newPassword = await this.bcrypt.hashIt(user.password);
    const userData = { ...user, password: newPassword };

    const response = await this.repository.update({ user: userData, address });
    if (response === undefined) return this._iternalServerError;
    return { status: StatusCode.OK, response };
  }
}

export default UsersServices;
