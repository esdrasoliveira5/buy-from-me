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
const UsersRepository_1 = __importDefault(require("../repository/UsersRepository"));
const Bcrypt_1 = __importDefault(require("../validations/Bcrypt"));
const JoiValidations_1 = __importDefault(require("../validations/JoiValidations"));
const JwToken_1 = __importDefault(require("../validations/JwToken"));
class UsersServices {
    constructor() {
        this._userNotFound = { status: StatusCodes_1.default.NOT_FOUND, response: { error: 'User not found' } };
        this._iternalServerError = {
            status: StatusCodes_1.default.INTERNAL_SERVER_ERROR,
            response: { error: 'fail to create' }
        };
        this._conflict = {
            status: StatusCodes_1.default.CONFLICT,
            response: { error: 'user already registered' }
        };
        this._unauthorized = { status: StatusCodes_1.default.UNAUTHORIZED, response: { error: 'Invalid token' } };
        this.validations = new JoiValidations_1.default();
        this.repository = new UsersRepository_1.default();
        this.bcrypt = new Bcrypt_1.default();
        this.jwt = new JwToken_1.default();
    }
    get(token, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenValid = this.jwt.validate(token);
            if ('status' in tokenValid)
                return tokenValid;
            if (tokenValid.id !== id)
                return this._unauthorized;
            const response = yield this.repository.get({ email: tokenValid.email });
            if (response === null)
                return this._userNotFound;
            return { status: StatusCodes_1.default.OK, response };
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const validData = this.validations.login(data);
            if (validData)
                return validData;
            const response = yield this.repository.get({ email });
            if (response === null)
                return this._userNotFound;
            const validPassword = yield this.bcrypt.compareIt(password, response.password);
            if (validPassword)
                return validPassword;
            const user = {
                id: response.id,
                name: response.name,
                email: response.email,
            };
            const newToken = this.jwt.generate({ id: response.id, email: response.email });
            const newResponse = { user, token: newToken };
            return { status: StatusCodes_1.default.OK, response: newResponse };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, address } = data;
            const validUser = this.validations.user(user);
            if (validUser)
                return validUser;
            const validAddress = this.validations.address(address);
            if (validAddress)
                return validAddress;
            const userRes = yield this.repository.get({ email: user.email });
            if (userRes)
                return this._conflict;
            const newPassword = yield this.bcrypt.hashIt(user.password);
            const userData = Object.assign(Object.assign({}, user), { password: newPassword });
            const response = yield this.repository.create({ user: userData, address });
            if (response === undefined)
                return this._iternalServerError;
            return { status: StatusCodes_1.default.CREATED, response };
        });
    }
    update(token, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, address } = data;
            const validUser = this.validations.userUpdate(user);
            if (validUser)
                return validUser;
            const validAddress = this.validations.address(address);
            if (validAddress)
                return validAddress;
            const tokenValid = this.jwt.validate(token);
            if ('status' in tokenValid)
                return tokenValid;
            if (tokenValid.id !== data.user.id)
                return this._unauthorized;
            const responseUser = yield this.repository.get({ email: tokenValid.email });
            if (responseUser === null)
                return this._userNotFound;
            const newPassword = yield this.bcrypt.hashIt(user.password);
            const userData = Object.assign(Object.assign({}, user), { password: newPassword, addressId: responseUser.addressId });
            const response = yield this.repository.update({ user: userData, address });
            if (response === undefined)
                return this._iternalServerError;
            return { status: StatusCodes_1.default.OK, response };
        });
    }
    delete(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenValid = this.jwt.validate(token);
            if ('status' in tokenValid)
                return tokenValid;
            if (tokenValid.id !== userId)
                return this._unauthorized;
            const responseUser = yield this.repository.get({ id: tokenValid.id });
            if (responseUser === null)
                return this._userNotFound;
            const response = yield this.repository.delete({ userId, addressId: responseUser.addressId });
            console.log(response);
            return { status: StatusCodes_1.default.OK, response: { message: 'user deleted' } };
        });
    }
}
exports.default = UsersServices;
