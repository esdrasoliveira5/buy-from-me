import { QueryData } from '../interfaces/ProductsI';
import { ResponseError, ResponseProducts } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import ProductsRepository from '../repository/ProductsRepository';
import SearchDataValidation from '../validations/SearchDataValidation';

class ProductsServices {
  private _productsNotFound: ResponseError;

  private repository: ProductsRepository;

  private searchDataValidation: SearchDataValidation;

  constructor() {
    this._productsNotFound = {
      status: StatusCode.NOT_FOUND,
      response: { error: 'product not found' } };

    this.repository = new ProductsRepository();

    this.searchDataValidation = new SearchDataValidation();
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
}
export default ProductsServices;
