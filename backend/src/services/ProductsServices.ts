import { Products } from '@prisma/client';
import { QueryData } from '../interfaces/ProductsI';
import { ResponseError, ResponseProducts } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import { Token } from '../interfaces/UsersI';
import ProductsRepository from '../repository/ProductsRepository';
import UsersRepository from '../repository/UsersRepository';
import JoiValidations from '../validations/JoiValidations';
import JwToken from '../validations/JwToken';
import SearchDataValidation from '../validations/SearchDataValidation';

class ProductsServices {
  private _productsNotFound: ResponseError;

  private _unauthorized: ResponseError;

  private repository: ProductsRepository;

  private userRepository: UsersRepository;

  private searchDataValidation: SearchDataValidation;

  private validations: JoiValidations;

  private jwt: JwToken;

  constructor() {
    this._productsNotFound = {
      status: StatusCode.NOT_FOUND,
      response: { error: 'product not found' } };

    this._unauthorized = { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid token' } };

    this.repository = new ProductsRepository();

    this.userRepository = new UsersRepository();

    this.searchDataValidation = new SearchDataValidation();

    this.validations = new JoiValidations();

    this.jwt = new JwToken();
  }

  async get(id: number): Promise<ResponseProducts | ResponseError> {
    const response = await this.repository.get(id);
    if (response === null) return this._productsNotFound;
    return { status: StatusCode.OK, response };
  }

  async getAll(page:number): Promise<ResponseProducts | ResponseError> {
    const response = await this.repository.getAll(page);
    if (response === null) return this._productsNotFound;
    return { status: StatusCode.OK, response };
  }

  async getByFilter(page:number, data: QueryData):
  Promise<ResponseProducts | ResponseError> {
    const searchData = this.searchDataValidation.dataSearch(data);
    const response = await this.repository.getByFilter(page, searchData, data.name);
    return { status: StatusCode.OK, response };
  }

  async create(token: Token, data: Omit<Products, 'id | sold'>):
  Promise<ResponseError | ResponseProducts> {
    const validProduct = this.validations.product(data);
    if (validProduct) return validProduct;

    const tokenValid = this.jwt.validate(token);
    if ('status' in tokenValid) return tokenValid;
    if (tokenValid.id !== data.usersId) return this._unauthorized;

    const responseUser = await this.userRepository.get({ email: tokenValid.email });
    if (responseUser === null) return this._unauthorized;

    const response = await this.repository.create({ ...data, sold: false });
    return { status: StatusCode.CREATED, response };
  }

  async updateSold(token: Token, id: number): Promise<ResponseError | ResponseProducts> {
    const tokenValid = this.jwt.validate(token);
    if ('status' in tokenValid) return tokenValid;

    const responseUser = await this.userRepository.get({ email: tokenValid.email });
    if (responseUser === null) return this._unauthorized;

    const product = await this.repository.get(id);
    if (product === null) return this._productsNotFound;
    if (product.usersId !== tokenValid.id) return this._unauthorized;

    const response = await this.repository.update(id, { sold: !product.sold });
    return { status: StatusCode.OK, response };
  }
}
export default ProductsServices;
