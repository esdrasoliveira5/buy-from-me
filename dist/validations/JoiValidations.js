"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const StatusCodes_1 = __importDefault(require("../interfaces/StatusCodes"));
class JoiValidations {
    constructor() {
        this.joi = joi_1.default;
    }
    login(data) {
        const { email, password } = data;
        const { error } = this.joi.object({
            email: joi_1.default.string().not().empty().required(),
            password: joi_1.default.string().min(8).max(20).required(),
        }).validate({ email, password });
        if (error) {
            return { status: StatusCodes_1.default.BAD_REQUEST, response: { error: error.details[0].message } };
        }
    }
    user(data) {
        const { name, lastName, email, password, contact } = data;
        const { error } = this.joi.object({
            name: joi_1.default.string().not().empty().required(),
            lastName: joi_1.default.string().not().empty().required(),
            email: joi_1.default.string().email().not().empty(),
            password: joi_1.default.string().min(8).max(20).required(),
            contact: joi_1.default.number().strict().min(9).required(),
        }).validate({ name, lastName, email, password, contact });
        if (error) {
            return { status: StatusCodes_1.default.BAD_REQUEST, response: { error: error.details[0].message } };
        }
    }
    address(data) {
        const { street, number, district, zipcode, city, statesId } = data;
        const { error } = this.joi.object({
            street: joi_1.default.string().not().empty().required(),
            number: joi_1.default.string().not().empty().required(),
            district: joi_1.default.string().not().empty().required(),
            zipcode: joi_1.default.number().strict().min(9).required(),
            city: joi_1.default.string().not().empty().required(),
            statesId: joi_1.default.number().strict().required(),
        }).validate({ street, number, district, zipcode, city, statesId });
        if (error) {
            return { status: StatusCodes_1.default.BAD_REQUEST, response: { error: error.details[0].message } };
        }
    }
    userUpdate(data) {
        const { name, lastName, password, contact } = data;
        const { error } = this.joi.object({
            name: joi_1.default.string().not().empty().required(),
            lastName: joi_1.default.string().not().empty().required(),
            password: joi_1.default.string().min(8).max(20).required(),
            contact: joi_1.default.number().strict().min(9).required(),
        }).validate({ name, lastName, password, contact });
        if (error) {
            return { status: StatusCodes_1.default.BAD_REQUEST, response: { error: error.details[0].message } };
        }
    }
    product(data) {
        const { name, description, price, categoriesId, usersId } = data;
        const { error } = this.joi.object({
            name: joi_1.default.string().not().empty().required(),
            description: joi_1.default.string().not().empty().required(),
            price: joi_1.default.number().strict().not().empty(),
            categoriesId: joi_1.default.number().strict().required(),
            usersId: joi_1.default.string().not().empty().required(),
            new: joi_1.default.boolean().not().empty().strict(),
        }).validate({ name, description, price, categoriesId, usersId, new: data.new });
        if (error) {
            return { status: StatusCodes_1.default.BAD_REQUEST, response: { error: error.details[0].message } };
        }
    }
    productUpdate(data) {
        const { name, description, price, categoriesId } = data;
        const { error } = this.joi.object({
            name: joi_1.default.string().not().empty().required(),
            description: joi_1.default.string().not().empty().required(),
            price: joi_1.default.number().strict().not().empty(),
            categoriesId: joi_1.default.number().strict().required(),
            new: joi_1.default.boolean().not().empty().required(),
        }).validate({ name, description, price, categoriesId, new: data.new });
        if (error) {
            return { status: StatusCodes_1.default.BAD_REQUEST, response: { error: error.details[0].message } };
        }
    }
    order(productsId) {
        const { error } = this.joi.object({
            productsId: joi_1.default.number().strict().required(),
        }).validate({ productsId });
        if (error) {
            return { status: StatusCodes_1.default.BAD_REQUEST, response: { error: error.details[0].message } };
        }
    }
}
exports.default = JoiValidations;
