import { QueryData, SearchData } from '../interfaces/ProductsI';

class SearchDataValidation {
  private _gte: string;

  private _lte: string;

  private _true: string;

  private _false: string;

  constructor() {
    this._gte = 'gte';
    this._lte = 'lte';
    this._false = 'false';
    this._true = 'true';
  }

  private newPrice(filter: string | undefined, price: string | undefined) {
    if (filter === this._gte) {
      return { gte: Number(price) };
    }

    if (filter === this._lte) {
      return { lte: Number(price) };
    }
    return price !== undefined ? Number(price) : undefined;
  }

  private boolean(value: string | undefined) {
    if (value === this._true) {
      return true;
    }

    if (value === this._false) {
      return false;
    }

    return undefined;
  }

  dataSearch(data: QueryData) {
    const { filter, price, sold, newP, category } = data;
    const searchData: SearchData = {
      price: this.newPrice(filter, price),
      sold: this.boolean(sold),
      new: this.boolean(newP),
      categoriesId: category ? Number(category) : undefined,
    };

    return searchData;
  }
}

export default SearchDataValidation;
