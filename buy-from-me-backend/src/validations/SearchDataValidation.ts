import { QueryData, SearchData } from '../interfaces/ProductsI';

class SearchDataValidation {
  private _gte: string;

  private _lte: string;

  private _true: string;

  private _false: string;

  private _zero: number;

  constructor() {
    this._gte = 'gte';
    this._lte = 'lte';
    this._false = 'false';
    this._true = 'true';
    this._zero = 0;
  }

  private newPrice(filter: string | undefined, price: string | undefined) {
    if (filter === this._gte) {
      return { gte: Number(price) };
    }

    if (filter === this._lte) {
      return { lte: Number(price) };
    }
    if (price === undefined || price.length === this._zero) {
      return undefined;
    }
    return Number(price);
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

  private category(category: string | undefined) {
    if (category === undefined || category.length === this._zero) {
      return undefined;
    }
    return Number(category);
  }

  dataSearch(data: QueryData) {
    const { filter, price, sold, newP, category } = data;
    const searchData: SearchData = {
      price: this.newPrice(filter, price),
      sold: this.boolean(sold),
      new: this.boolean(newP),
      categoriesId: this.category(category),
    };

    return searchData;
  }
}

export default SearchDataValidation;
