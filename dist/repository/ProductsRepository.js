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
class ProductsRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.prisma.products.findUnique({
                where: { id },
            });
            return product;
        });
    }
    getAll(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.prisma.products.findMany({
                skip: page,
                take: 20,
                where: {
                    sold: false,
                },
            });
            return products;
        });
    }
    getByFilter(page, data, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.prisma.products.findMany({
                skip: page,
                take: 20,
                where: Object.assign(Object.assign({}, data), { name: { contains: name, mode: 'insensitive' } }),
            });
            return products;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.prisma.products.create({
                data: Object.assign({}, data),
            });
            return newProduct;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.sold !== undefined && data.sold === true) {
                yield this.prisma.orders.deleteMany({ where: { productsId: id } });
            }
            const product = yield this.prisma.products.update({
                where: { id },
                data: Object.assign({}, data),
            });
            return product;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.prisma.orders.deleteMany({ where: { productsId: id } });
            const product = yield this.prisma.products.delete({ where: { id } });
            return { order, product };
        });
    }
}
exports.default = ProductsRepository;
