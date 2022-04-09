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
class OrdersRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.prisma.orders.findUnique({
                where: { id },
                include: {
                    product: true,
                    seller: { select: { name: true, lastName: true, contact: true, email: true } },
                    buyer: { select: { name: true, lastName: true, contact: true, email: true } },
                },
            });
            return order;
        });
    }
    getAll(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.prisma.orders.findMany({
                where: Object.assign({}, data),
                include: {
                    product: { select: { name: true } },
                    seller: { select: { name: true } },
                    buyer: { select: { name: true } },
                },
            });
            return orders;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.prisma.orders.create({
                data: Object.assign({}, data),
            });
            return order;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.prisma.orders.delete({ where: { id } });
            return order;
        });
    }
}
exports.default = OrdersRepository;
