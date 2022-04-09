"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StatusCodes_1 = __importDefault(require("../interfaces/StatusCodes"));
const ProductsRepository_1 = __importDefault(require("../repository/ProductsRepository"));
const UsersRepository_1 = __importDefault(require("../repository/UsersRepository"));
const JoiValidations_1 = __importDefault(require("../validations/JoiValidations"));
const JwToken_1 = __importDefault(require("../validations/JwToken"));
const SearchDataValidation_1 = __importDefault(require("../validations/SearchDataValidation"));
class ProductsServices {
    constructor() {
        this._productsNotFound = {
            status: StatusCodes_1.default.NOT_FOUND,
            response: { error: 'product not found' }
        };
        this._conflict = { status: StatusCodes_1.default.CONFLICT, response: { error: 'product already exists' } };
        this._unauthorized = { status: StatusCodes_1.default.UNAUTHORIZED, response: { error: 'invalid token' } };
        this.repository = new ProductsRepository_1.default();
        this.userRepository = new UsersRepository_1.default();
        this.searchDataValidation = new SearchDataValidation_1.default();
        this.validations = new JoiValidations_1.default();
        this.jwt = new JwToken_1.default();
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.get(id);
            if (response === null)
                return this._productsNotFound;
            return { status: StatusCodes_1.default.OK, response };
        });
    }
    getAll(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page * 20) - 20;
            const response = yield this.repository.getAll(skip);
            return { status: StatusCodes_1.default.OK, response };
        });
    }
    getByFilter(page, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page * 20) - 20;
            const searchData = this.searchDataValidation.dataSearch(data);
            const response = yield this.repository.getByFilter(skip, searchData, data.name);
            return { status: StatusCodes_1.default.OK, response };
        });
    }
    create(token, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validProduct = this.validations.product(data);
            if (validProduct)
                return validProduct;
            const tokenValid = this.jwt.validate(token);
            if ('status' in tokenValid)
                return tokenValid;
            if (tokenValid.id !== data.usersId)
                return this._unauthorized;
            const responseUser = yield this.userRepository.get({ email: tokenValid.email });
            if (responseUser === null)
                return this._unauthorized;
            const product = yield this.repository.getByFilter(0, data, data.name);
            if (product.length !== 0)
                return this._conflict;
            const response = yield this.repository.create(Object.assign(Object.assign({}, data), { sold: false }));
            return { status: StatusCodes_1.default.CREATED, response };
        });
    }
    updateSold(token, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenValid = this.jwt.validate(token);
            if ('status' in tokenValid)
                return tokenValid;
            const responseUser = yield this.userRepository.get({ email: tokenValid.email });
            if (responseUser === null)
                return this._unauthorized;
            const product = yield this.repository.get(id);
            if (product === null)
                return this._productsNotFound;
            if (product.usersId !== tokenValid.id)
                return this._unauthorized;
            const response = yield this.repository.update(id, { sold: !product.sold });
            return { status: StatusCodes_1.default.OK, response };
        });
    }
    update(token, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validData = this.validations.productUpdate(data);
            if (validData)
                return validData;
            const tokenValid = this.jwt.validate(token);
            if ('status' in tokenValid)
                return tokenValid;
            const responseUser = yield this.userRepository.get({ email: tokenValid.email });
            if (responseUser === null)
                return this._unauthorized;
            const product = yield this.repository.get(id);
            if (product === null)
                return this._productsNotFound;
            if (product.usersId !== tokenValid.id)
                return this._unauthorized;
            const response = yield this.repository.update(id, data);
            return { status: StatusCodes_1.default.OK, response };
        });
    }
    delete(token, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenValid = this.jwt.validate(token);
            if ('status' in tokenValid)
                return tokenValid;
            const responseUser = yield this.userRepository.get({ email: tokenValid.email });
            if (responseUser === null)
                return this._unauthorized;
            const product = yield this.repository.get(id);
            if (product === null)
                return this._productsNotFound;
            if (product.usersId !== tokenValid.id)
                return this._unauthorized;
            const response = yield this.repository.delete(id);
            console.log(response);
            return { status: StatusCodes_1.default.OK, response: { message: 'product deleted' } };
        });
    }
}
exports.default = ProductsServices;
