import * as express from 'express';
import { Request, Response } from 'express';
import ProductsServices from '../services/ProductsServices';

const Router = express.Router();

class ProductsControllers {
  private services: ProductsServices;

  constructor() {
    this.services = new ProductsServices();
    Router.get('/:id', this.get);
    Router.get('/', this.getAll);
  }

  get = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { status, response } = await this.services.get(Number(id));

    return res.status(status).json(response);
  };

  getAll = async (req: Request, res: Response) => {
    const { page } = req.query;

    const pageExists = page === undefined ? 0 : Number(page);

    const { status, response } = await this.services.getAll(pageExists);

    return res.status(status).json(response);
  };
}

export { ProductsControllers };
export default Router;
