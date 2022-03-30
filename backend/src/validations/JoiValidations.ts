import { Address, Products, Users } from '@prisma/client';
import Joi from 'joi';
import { ProductUpdateData } from '../interfaces/ProductsI';
import { ResponseError } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import { LoginData } from '../interfaces/UsersI';

class JoiValidations {
  private joi = Joi;

  login(data: LoginData): ResponseError | void {
    const { email, password } = data;
    const { error } = this.joi.object({
      email: Joi.string().not().empty().required(),
      password: Joi.string().min(8).max(20).required(),
    }).validate({ email, password });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }

  user(data: Omit<Users, 'id | addressId'>): void | ResponseError {
    const { name, lastName, email, password, contact } = data;
    const { error } = this.joi.object({
      name: Joi.string().not().empty().required(),
      lastName: Joi.string().not().empty().required(),
      email: Joi.string().email().not().empty(),
      password: Joi.string().min(8).max(20).required(),
      contact: Joi.number().strict().min(9).required(),
    }).validate({ name, lastName, email, password, contact });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }

  address(data: Omit<Address, 'id'>): void | ResponseError {
    const { street, number, district, zipcode, city, statesId } = data;
    const { error } = this.joi.object({
      street: Joi.string().not().empty().required(),
      number: Joi.string().not().empty().required(),
      district: Joi.string().not().empty().required(),
      zipcode: Joi.number().strict().min(9).required(),
      city: Joi.string().not().empty().required(),
      statesId: Joi.number().strict().required(),
    }).validate({ street, number, district, zipcode, city, statesId });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }

  userUpdate(data: Omit<Users, 'email'>): void | ResponseError {
    const { name, lastName, password, contact, addressId } = data;
    const { error } = this.joi.object({
      name: Joi.string().not().empty().required(),
      lastName: Joi.string().not().empty().required(),
      password: Joi.string().min(8).max(20).required(),
      contact: Joi.number().strict().min(9).required(),
      addressId: Joi.number().strict().required(),
    }).validate({ name, lastName, password, contact, addressId });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }

  userDelete(userId: string): void | ResponseError {
    const { error } = this.joi.object({
      userId: Joi.string().not().empty().required(),
    }).validate({ userId });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }

  product(data: Omit<Products, 'id | sold'>): void | ResponseError {
    const { name, description, price, categoriesId, usersId } = data;
    const { error } = this.joi.object({
      name: Joi.string().not().empty().required(),
      description: Joi.string().not().empty().required(),
      price: Joi.number().strict().not().empty(),
      categoriesId: Joi.number().strict().required(),
      usersId: Joi.string().not().empty().required(),
      new: Joi.boolean().not().empty().required(),
    }).validate({ name, description, price, categoriesId, usersId, new: data.new });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }

  productUpdate(data: ProductUpdateData): void | ResponseError {
    const { name, description, price, categoriesId } = data;
    const { error } = this.joi.object({
      name: Joi.string().not().empty().required(),
      description: Joi.string().not().empty().required(),
      price: Joi.number().strict().not().empty(),
      categoriesId: Joi.number().strict().required(),
      new: Joi.boolean().not().empty().required(),
    }).validate({ name, description, price, categoriesId, new: data.new });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }

  order(productsId: number): void | ResponseError {
    const { error } = this.joi.object({
      productsId: Joi.number().strict().required(),
    }).validate({ productsId });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }
}
export default JoiValidations;
