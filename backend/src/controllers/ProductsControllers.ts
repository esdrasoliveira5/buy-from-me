import { Products } from '@prisma/client';
import * as express from 'express';
import { Request, Response } from 'express';
import { QueryData } from '../interfaces/ProductsI';
import ProductsServices from '../services/ProductsServices';

const Router = express.Router();

class ProductsControllers {
  private services: ProductsServices;

  constructor() {
    this.services = new ProductsServices();
    Router.get('/filter', this.getByFilter);
    Router.get('/:id', this.get);
    Router.get('/', this.getAll);
    Router.post('/', this.create);
  }

  get = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { status, response } = await this.services.get(Number(id));

    return res.status(status).json(response);
  };

  getAll = async (req: Request, res: Response) => {
    const { pag } = req.query;

    const pageExists = pag === undefined ? 0 : Number(pag);

    const { status, response } = await this.services.getAll(pageExists);

    return res.status(status).json(response);
  };

  getByFilter = async (req: Request, res: Response) => {
    const { pag, filter, price, sold, newP, category, name } = req.query;

    const data = { filter, price, sold, newP, category, name } as QueryData;
    const pageExists = pag === undefined ? 0 : Number(pag);

    const { status, response } = await this.services.getByFilter(pageExists, data);

    return res.status(status).json(response);
  };

  create = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { name, description, price, categoriesId, usersId, newProduct } = req.body;
    const data = {
      name,
      description,
      price,
      categoriesId,
      usersId,
      new: newProduct,
    } as Omit<Products, 'id | sold'>;
    const { status, response } = await this.services.create(authorization, data);

    return res.status(status).json(response);
  };
}

export { ProductsControllers };
export default Router;
