import { Router } from 'express';
import Spotify from './methods/spotify';

export default (): Router => {
  const connectionRouter = Router();

  // OAuth Providers
  if (process.env.SPOTIFY_CLIENT_ID)
    connectionRouter.use('/spotify', Spotify());

  return connectionRouter;
};
