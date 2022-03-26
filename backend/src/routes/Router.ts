import { Router, Request, Response } from 'express';

const Routes = Router();

class MainRouter {
  
  constructor() {
    Routes.get('/', this.online);
  }

  online = async (req: Request, res: Response) => {
    console.log('AQUI');
    
    return res.status(200).json({message: 'Api Online!'})
  }
}
export { MainRouter };
export default Routes;
