import { ResponseError } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import { Token } from '../interfaces/UsersI';
import OrdersRepository from '../repository/OrdersRepository';
import UsersRepository from '../repository/UsersRepository';
import JoiValidations from '../validations/JoiValidations';
import JwToken from '../validations/JwToken';

class OrdersServices {
  private _orderNotFound: ResponseError;

  private _unauthorized: ResponseError;

  private userRepository: UsersRepository;

  private repository: OrdersRepository;

  private validations: JoiValidations;

  private jwt: JwToken;

  constructor() {
    this._orderNotFound = { status: StatusCode.NOT_FOUND, response: { error: 'order not found' } };

    this._unauthorized = { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid token' } };

    this.repository = new OrdersRepository();

    this.userRepository = new UsersRepository();

    this.validations = new JoiValidations();

    this.jwt = new JwToken();
  }

  async get(token: Token, id: number) {
    const tokenValid = this.jwt.validate(token);
    if ('status' in tokenValid) return tokenValid;

    const responseUser = await this.userRepository.get({ email: tokenValid.email });
    if (responseUser === null) return this._unauthorized;

    const response = await this.repository.get(id);
    if (response === null) return this._orderNotFound;
    if (response.buyerId !== tokenValid.id && response.sellerId !== tokenValid.id) {
      return this._unauthorized;
    }
    return { status: StatusCode.OK, response };
  }
}

export default OrdersServices;
