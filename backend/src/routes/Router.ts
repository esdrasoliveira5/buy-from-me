import * as express from 'express';
import UserController, { UsersControllers } from '../controllers/UserControllers';

const Router = express.Router();

class MainRouter {
  private controller = new UsersControllers();

  constructor() {
    Router.use('/users', UserController);
  }
}
export { MainRouter };
export default Router;
