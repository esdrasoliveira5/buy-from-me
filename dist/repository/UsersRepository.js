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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class UsersRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.prisma.users.findUnique({
                where: data,
                include: { address: true, Products: true, Orders: true, sales: true },
            });
            return response;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            const addressRes = yield this.prisma.address.create({
                data: data.address,
            });
            console.log(addressRes);
            const response = yield this.prisma.users.create({
                data: Object.assign(Object.assign({}, data.user), { addressId: addressRes.id }),
                include: { address: true },
            });
            console.log(response);
            return response;
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const addressRes = yield this.prisma.address.update({
                where: { id: data.user.addressId },
                data: data.address,
            });
            if (addressRes === undefined)
                return addressRes;
            const response = yield this.prisma.users.update({
                where: { id: data.user.id },
                data: Object.assign({}, data.user),
                include: { address: true },
            });
            return response;
        });
    }
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.prisma.orders.deleteMany({
                where: {
                    OR: [{ buyerId: data.userId }, { sellerId: data.userId }],
                },
            });
            const products = yield this.prisma.products.deleteMany({ where: { usersId: data.userId } });
            const user = yield this.prisma.users.delete({ where: { id: data.userId } });
            const address = yield this.prisma.address.delete({ where: { id: data.addressId } });
            return { order, products, user, address };
        });
    }
}
exports.default = UsersRepository;
