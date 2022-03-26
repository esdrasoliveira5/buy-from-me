import Express from 'express';
import Cors from 'cors';
import HanldeError from './middlewares/HanldeError';
import Routes, { MainRouter } from './routes/Router';

class App {
  public app = Express();

  public handleError = new HanldeError();

  public mainRouter = new MainRouter();

  constructor() {
    this.config();
    this.app.use(this.handleError.genericError);
    this.app.use('/', Routes);
  }

  private config():void {
    this.app.use(Cors());
    this.app.use(Express.json());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
  }
}

export { App };

export const { app } = new App();
