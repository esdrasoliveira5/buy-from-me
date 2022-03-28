import { Address, Users } from '@prisma/client';
import Joi from 'joi';
import { ResponseError } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import { LoginData } from '../interfaces/UsersI';

class JoiValidations {
  public joi = Joi;

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

  user(data: Omit<Users, 'id | addressId'>) {
    const { name, lastName, email, password, contact } = data;
    console.log(contact);
    const { error } = this.joi.object({
      name: Joi.string().not().empty().required(),
      lastName: Joi.string().not().empty().required(),
      email: Joi.string().email().not().empty(),
      password: Joi.string().min(8).max(20).required(),
      contact: Joi.number().min(9).required(),
    }).validate({ name, lastName, email, password, contact });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }

  address(data: Omit<Address, 'id'>) {
    const { street, number, district, zipcode, city, statesId } = data;
    const { error } = this.joi.object({
      street: Joi.string().not().empty().required(),
      number: Joi.string().not().empty().required(),
      district: Joi.string().not().empty().required(),
      zipcode: Joi.number().min(9).required(),
      city: Joi.string().not().empty().required(),
      statesId: Joi.number().not().empty().required(),
    }).validate({ street, number, district, zipcode, city, statesId });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }
}
export default JoiValidations;
