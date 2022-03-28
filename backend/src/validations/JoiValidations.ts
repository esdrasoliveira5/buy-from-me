import Joi from 'joi';
import { ResponseError } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';

class JoiValidations {
  public joi = Joi;

  login(email: string, password:string): ResponseError | void {
    const { error } = this.joi.object({
      email: Joi.string().not().empty().required(),
      password: Joi.string().min(8).max(20).required(),
    }).validate({ email, password });
    if (error) {
      return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
    }
  }
}
export default JoiValidations;
