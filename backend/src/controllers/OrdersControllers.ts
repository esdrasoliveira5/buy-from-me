import * as express from 'express';
import { Request, Response } from 'express';
import OrdersServices from '../services/OrdersServices';

const Router = express.Router();
class OrdersControllers {
  private services: OrdersServices;

  constructor() {
    this.services = new OrdersServices();
    Router.get('/:id', this.get);
  }

  get = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { id } = req.params;

    const { status, response } = await this.services.get(authorization, Number(id));

    return res.status(status).json(response);
  };
}
export default Router;
export { OrdersControllers };
