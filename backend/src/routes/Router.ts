import * as express from 'express';
import OrdersRouter, { OrdersControllers } from '../controllers/OrdersControllers';
import ProductsRouter, { ProductsControllers } from '../controllers/ProductsControllers';
import UserRouter, { UsersControllers } from '../controllers/UserControllers';

const Router = express.Router();

class MainRouter {
  private userController = new UsersControllers();

  private productsController = new ProductsControllers();

  private ordersController = new OrdersControllers();

  constructor() {
    Router.use('/user', UserRouter);
    Router.use('/product', ProductsRouter);
    Router.use('/order', OrdersRouter);
  }
}
export { MainRouter };
export default Router;
