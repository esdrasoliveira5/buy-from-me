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
exports.UsersControllers = void 0;
const express = __importStar(require("express"));
const UsersServices_1 = __importDefault(require("../services/UsersServices"));
const Router = express.Router();
class UsersControllers {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            const { id } = req.params;
            const { status, response } = yield this.services.get(authorization, id);
            return res.status(status).json(response);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { status, response } = yield this.services.login({ email, password });
            return res.status(status).json(response);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, lastName, email, password, contact } = req.body;
            const { street, number, district, zipcode, city, statesId } = req.body;
            const user = { name, lastName, email, password, contact };
            const address = { street, number, district, zipcode, city, statesId };
            const { status, response } = yield this.services.create({ user, address });
            return res.status(status).json(response);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            const { id } = req.params;
            const { name, lastName, password, contact } = req.body;
            const { street, number, district, zipcode, city, statesId } = req.body;
            const user = { id, name, lastName, password, contact };
            const address = { street, number, district, zipcode, city, statesId };
            const { status, response } = yield this.services.update(authorization, { user, address });
            return res.status(status).json(response);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            const { id } = req.params;
            const { status, response } = yield this.services.delete(authorization, id);
            return res.status(status).json(response);
        });
        this.services = new UsersServices_1.default();
        Router.get('/:id', this.get);
        Router.post('/login', this.login);
        Router.post('/', this.create);
        Router.put('/:id', this.update);
        Router.delete('/:id', this.delete);
    }
}
exports.UsersControllers = UsersControllers;
exports.default = Router;
