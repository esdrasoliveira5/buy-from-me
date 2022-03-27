import Responses from '../helpers/Responses';
import { ResponseError, ResponseUser } from '../interfaces/ResponsesI';
import StatusCode from '../interfaces/StatusCodes';
import { Login } from '../interfaces/UsersI';
import UsersRepository from '../repository/UsersRepository';

class UsersServices {
  public repository: UsersRepository;

  public responses: Responses;

  constructor() {
    this.repository = new UsersRepository();
    this.responses = new Responses();
  }

  async get(data: Login): Promise<ResponseError | ResponseUser> {
    const response = await this.repository.get(data.email);
    if (response === null) return this.responses.notFound;

    return { status: StatusCode.OK, response };
  }
}

export default UsersServices;
