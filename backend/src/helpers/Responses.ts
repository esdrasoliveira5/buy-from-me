import { ResponseError } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';

class Responses {
  private _notFound: ResponseError;

  constructor() {
    this._notFound = { status: StatusCode.NOT_FOUND, response: { error: 'User not found' } };
  }

  get notFound(): ResponseError {
    return this._notFound;
  }
}
export default Responses;
