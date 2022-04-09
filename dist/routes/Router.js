"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express = __importStar(require("express"));
const OrdersControllers_1 = __importStar(require("../controllers/OrdersControllers"));
const ProductsControllers_1 = __importStar(require("../controllers/ProductsControllers"));
const UserControllers_1 = __importStar(require("../controllers/UserControllers"));
const Router = express.Router();
class MainRouter {
    constructor() {
        this.userController = new UserControllers_1.UsersControllers();
        this.productsController = new ProductsControllers_1.ProductsControllers();
        this.ordersController = new OrdersControllers_1.OrdersControllers();
        Router.use('/user', UserControllers_1.default);
        Router.use('/product', ProductsControllers_1.default);
        Router.use('/order', OrdersControllers_1.default);
    }
}
exports.MainRouter = MainRouter;
exports.default = Router;
