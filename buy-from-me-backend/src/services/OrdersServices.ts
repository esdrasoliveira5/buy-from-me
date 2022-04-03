import { OrderData } from '../interfaces/OrdersI';
import { ResponseDelete, ResponseError, ResponseOrders } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import { Token } from '../interfaces/UsersI';
import OrdersRepository from '../repository/OrdersRepository';
import ProductsRepository from '../repository/ProductsRepository';
import UsersRepository from '../repository/UsersRepository';
import JoiValidations from '../validations/JoiValidations';
import JwToken from '../validations/JwToken';
import SearchOrderValidation from '../validations/SearchOrderValidation';

class OrdersServices {
  private _orderNotFound: ResponseError;

  private _conflict: ResponseError;

  private _productsNotFound: ResponseError;

  private _unauthorized: ResponseError;

  private userRepository: UsersRepository;

  private productRepository: ProductsRepository;

  private repository: OrdersRepository;

  private validations: JoiValidations;

  private searchValidation: SearchOrderValidation;

  private jwt: JwToken;

  constructor() {
    this._orderNotFound = { status: StatusCode.NOT_FOUND, response: { error: 'order not found' } };

    this._conflict = { status: StatusCode.CONFLICT, response: { error: 'order already exists' } };

    this._unauthorized = { status: StatusCode.UNAUTHORIZED, response: { error: 'invalid token' } };

    this._productsNotFound = {
      status: StatusCode.NOT_FOUND,
      response: { error: 'product not found' } };

    this.repository = new OrdersRepository();

    this.userRepository = new UsersRepository();

    this.productRepository = new ProductsRepository();

    this.validations = new JoiValidations();

    this.searchValidation = new SearchOrderValidation();

    this.jwt = new JwToken();
  }

  async get(token: Token, id: number): Promise<ResponseError | ResponseOrders> {
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

  async getAll(token: Token, filter: string | undefined): Promise<ResponseError | ResponseOrders> {
    const tokenValid = this.jwt.validate(token);
    if ('status' in tokenValid) return tokenValid;

    const responseUser = await this.userRepository.get({ email: tokenValid.email });
    if (responseUser === null) return this._unauthorized;

    const data = this.searchValidation.searchData(filter, tokenValid.id);

    const response = await this.repository.getAll(data);

    if (response.length === 0) return this._orderNotFound;

    return { status: StatusCode.OK, response };
  }

  async create(token: Token, productsId: number): Promise<ResponseError | ResponseOrders> {
    const tokenValid = this.jwt.validate(token);
    if ('status' in tokenValid) return tokenValid;

    const validate = this.validations.order(productsId);
    if (validate) return validate;

    const responseUser = await this.userRepository.get({ email: tokenValid.email });
    if (responseUser === null) return this._unauthorized;

    const product = await this.productRepository.get(productsId);
    if (product === null) return this._productsNotFound;

    const data: OrderData = {
      productsId,
      buyerId: tokenValid.id,
      sellerId: product.usersId,
    };

    const order = await this.repository.getAll(data);
    if (order.length !== 0) return this._conflict;

    const response = await this.repository.create(data);
    return { status: StatusCode.CREATED, response };
  }

  async delete(token: Token, id: number): Promise<ResponseError | ResponseDelete> {
    const tokenValid = this.jwt.validate(token);
    if ('status' in tokenValid) return tokenValid;

    const responseUser = await this.userRepository.get({ email: tokenValid.email });
    if (responseUser === null) return this._unauthorized;

    const order = await this.repository.get(id);
    if (order === null) return this._orderNotFound;
    if (order.buyerId !== tokenValid.id) return this._unauthorized;

    const response = await this.repository.delete(id);
    console.log(response);
    return { status: StatusCode.OK, response: { message: 'order deleted' } };
  }
}

export default OrdersServices;
