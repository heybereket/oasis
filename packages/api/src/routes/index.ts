import { Router } from 'express';
import { Upload } from './upload';

export default (): Router => {
  const apiRouter = Router();

  apiRouter.use('/upload', Upload());

  return apiRouter;
};
