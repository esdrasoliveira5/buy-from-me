import { Address, Users } from '@prisma/client';
import * as express from 'express';
import { Request, Response } from 'express';
import UsersServices from '../services/UsersServices';

const Router = express.Router();

class UsersControllers {
  private services: UsersServices;

  constructor() {
    this.services = new UsersServices();
    Router.get('/:id', this.get);
    Router.post('/login', this.login);
    Router.post('/', this.create);
    Router.put('/:id', this.update);
    Router.delete('/:id', this.delete);
  }

  get = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { status, response } = await this.services.get(authorization, id);

    return res.status(status).json(response);
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { status, response } = await this.services.login({ email, password });

    return res.status(status).json(response);
  };

  create = async (req: Request, res: Response) => {
    const { name, lastName, email, password, contact } = req.body;
    const { street, number, district, zipcode, city, statesId } = req.body;

    const user = { name, lastName, email, password, contact } as Omit<Users, 'id | addressId'>;
    const address = { street, number, district, zipcode, city, statesId } as Omit<Address, 'id'>;

    const { status, response } = await this.services.create({ user, address });

    return res.status(status).json(response);
  };

  update = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { name, lastName, password, contact } = req.body;
    const { street, number, district, zipcode, city, statesId } = req.body;

    const user = { id, name, lastName, password, contact } as Users;
    const address = { street, number, district, zipcode, city, statesId } as Address;

    const { status, response } = await this.services.update(authorization, { user, address });

    return res.status(status).json(response);
  };

  delete = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { id } = req.params;

    const { status, response } = await this.services.delete(authorization, id);

    return res.status(status).json(response);
  };
}
export { UsersControllers };
export default Router;
