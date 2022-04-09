"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchDataValidation {
    constructor() {
        this._gte = 'gte';
        this._lte = 'lte';
        this._false = 'false';
        this._true = 'true';
        this._zero = 0;
    }
    newPrice(filter, price) {
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
    boolean(value) {
        if (value === this._true) {
            return true;
        }
        if (value === this._false) {
            return false;
        }
        return undefined;
    }
    category(category) {
        if (category === undefined || category.length === this._zero) {
            return undefined;
        }
        return Number(category);
    }
    dataSearch(data) {
        const { filter, price, sold, newP, category } = data;
        const searchData = {
            price: this.newPrice(filter, price),
            sold: this.boolean(sold),
            new: this.boolean(newP),
            categoriesId: this.category(category),
        };
        return searchData;
    }
}
exports.default = SearchDataValidation;
