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
const OrdersRepository_1 = __importDefault(require("../repository/OrdersRepository"));
const ProductsRepository_1 = __importDefault(require("../repository/ProductsRepository"));
const UsersRepository_1 = __importDefault(require("../repository/UsersRepository"));
const JoiValidations_1 = __importDefault(require("../validations/JoiValidations"));
const JwToken_1 = __importDefault(require("../validations/JwToken"));
const SearchOrderValidation_1 = __importDefault(require("../validations/SearchOrderValidation"));
class OrdersServices {
    constructor() {
        this._orderNotFound = { status: StatusCodes_1.default.NOT_FOUND, response: { error: 'order not found' } };
        this._conflict = { status: StatusCodes_1.default.CONFLICT, response: { error: 'order already exists' } };
        this._unauthorized = { status: StatusCodes_1.default.UNAUTHORIZED, response: { error: 'invalid token' } };
        this._productsNotFound = {
            status: StatusCodes_1.default.NOT_FOUND,
            response: { error: 'product not found' }
        };
        this.repository = new OrdersRepository_1.default();
        this.userRepository = new UsersRepository_1.default();
        this.productRepository = new ProductsRepository_1.default();
        this.validations = new JoiValidations_1.default();
        this.searchValidation = new SearchOrderValidation_1.default();
        this.jwt = new JwToken_1.default();
    }
    get(token, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenValid = this.jwt.validate(token);
            if ('status' in tokenValid)
                return tokenValid;
            const responseUser = yield this.userRepository.get({ email: tokenValid.email });
            if (responseUser === null)
                return this._unauthorized;
            const response = yield this.repository.get(id);
            if (response === null)
                return this._orderNotFound;
            if (response.buyerId !== tokenValid.id && response.sellerId !== tokenValid.id) {
                return this._unauthorized;
            }
            return { status: StatusCodes_1.default.OK, response };
        });
    }
    getAll(token, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenValid = this.jwt.validate(token);
            if ('status' in tokenValid)
                return tokenValid;
            const responseUser = yield this.userRepository.get({ email: tokenValid.email });
            if (responseUser === null)
                return this._unauthorized;
            const data = this.searchValidation.searchData(filter, tokenValid.id);
            const response = yield this.repository.getAll(data);
            return { status: StatusCodes_1.default.OK, response };
        });
    }
    create(token, productsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenValid = this.jwt.validate(token);
            if ('status' in tokenValid)
                return tokenValid;
            const validate = this.validations.order(productsId);
            if (validate)
                return validate;
            const responseUser = yield this.userRepository.get({ email: tokenValid.email });
            if (responseUser === null)
                return this._unauthorized;
            const product = yield this.productRepository.get(productsId);
            if (product === null)
                return this._productsNotFound;
            const data = {
                productsId,
                buyerId: tokenValid.id,
                sellerId: product.usersId,
            };
            const order = yield this.repository.getAll(data);
            if (order.length !== 0)
                return this._conflict;
            const response = yield this.repository.create(data);
            return { status: StatusCodes_1.default.CREATED, response };
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
            const order = yield this.repository.get(id);
            if (order === null)
                return this._orderNotFound;
            if (order.buyerId !== tokenValid.id && order.sellerId !== tokenValid.id) {
                return this._unauthorized;
            }
            const response = yield this.repository.delete(id);
            console.log(response);
            return { status: StatusCodes_1.default.OK, response: { message: 'order deleted' } };
        });
    }
}
exports.default = OrdersServices;
