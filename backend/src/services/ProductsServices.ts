import { ResponseError, ResponseProducts } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import ProductsRepository from '../repository/ProductsRepository';

class ProductsServices {
  private _productsNotFound: ResponseError;

  private repository: ProductsRepository;

  constructor() {
    this._productsNotFound = {
      status: StatusCode.NOT_FOUND,
      response: { error: 'product not found' } };

    this.repository = new ProductsRepository();
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
}
export default ProductsServices;
