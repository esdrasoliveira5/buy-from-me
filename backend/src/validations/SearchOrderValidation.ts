import { OrderBuyerOrSeller } from '../interfaces/OrdersI';

class SearchOrderValidation {
  private _buyerId: string;

  private _sellerId: string;

  constructor() {
    this._buyerId = 'buyerId';
    this._sellerId = 'sellerId';
  }

  searchData(filter: string | undefined, id: string): OrderBuyerOrSeller {
    if (filter === this._buyerId) return { buyerId: id };
    if (filter === this._sellerId) return { sellerId: id };
    return { buyerId: id };
  }
}
export default SearchOrderValidation;
