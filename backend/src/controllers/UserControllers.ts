import * as express from 'express';
import { Request, Response } from 'express';
import UsersServices from '../services/UsersServices';

const Router = express.Router();

class UsersControllers {
  private services: UsersServices;

  constructor() {
    this.services = new UsersServices();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    Router.post('/login', this.get);
  }

  get = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { status, response } = await this.services.get({ email, password });
    return res.status(status).json(response);
  };
}
export { UsersControllers };
export default Router;
