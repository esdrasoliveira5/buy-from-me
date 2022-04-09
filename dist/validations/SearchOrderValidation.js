"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchOrderValidation {
    constructor() {
        this._buyerId = 'buyerId';
        this._sellerId = 'sellerId';
    }
    searchData(filter, id) {
        if (filter === this._buyerId)
            return { buyerId: id };
        if (filter === this._sellerId)
            return { sellerId: id };
        return { buyerId: id };
    }
}
exports.default = SearchOrderValidation;
