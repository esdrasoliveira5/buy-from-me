import * as express from 'express';
import { Request, Response } from 'express';
import OrdersServices from '../services/OrdersServices';

const Router = express.Router();
class OrdersControllers {
  private services: OrdersServices;

  constructor() {
    this.services = new OrdersServices();
    Router.get('/:id', this.get);
    Router.get('/', this.getAll);
    Router.post('/', this.create);
    Router.delete('/:id', this.delete);
  }

  get = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { id } = req.params;

    const { status, response } = await this.services.get(authorization, Number(id));

    return res.status(status).json(response);
  };

  getAll = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { filter } = req.query;

    const { status, response } = await this.services.getAll(authorization, filter as string);

    return res.status(status).json(response);
  };

  create = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { productsId } = req.body;

    const { status, response } = await this.services.create(authorization, productsId);

    return res.status(status).json(response);
  };

  delete = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { id } = req.params;

    const { status, response } = await this.services.delete(authorization, Number(id));

    return res.status(status).json(response);
  };
}
export default Router;
export { OrdersControllers };
