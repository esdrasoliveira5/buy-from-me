import Express from 'express';
import 'express-async-errors';
import Cors from 'cors';
import HanldeError from './middlewares/HanldeError';
import Router, { MainRouter } from './routes/Router';

class App {
  public app = Express();

  public handleError = new HanldeError();

  public mainRouter = new MainRouter();

  constructor() {
    this.config();
    this.app.use('/', Router);
    this.app.use(this.handleError.genericError);
  }

  private config():void {
    this.app.use(Cors());
    this.app.use(Express.json());
  }

  public start():void {
    this.app.listen(process.env.PORT || 3001, () => {
      console.log(`Server is running on PORT: ${process.env.PORT || 3001}`);
    });
  }
}

export { App };

export const { app } = new App();
