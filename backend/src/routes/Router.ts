import * as express from 'express';
import ProductsRouter, { ProductsControllers } from '../controllers/ProductsControllers';
import UserRouter, { UsersControllers } from '../controllers/UserControllers';

const Router = express.Router();

class MainRouter {
  private userController = new UsersControllers();

  private productsController = new ProductsControllers();

  constructor() {
    Router.use('/user', UserRouter);
    Router.use('/product', ProductsRouter);
  }
}
export { MainRouter };
export default Router;
