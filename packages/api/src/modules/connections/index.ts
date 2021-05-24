import { Router } from 'express';
import { PassportStatic } from 'passport';
import Spotify from './methods/spotify';

export default (passport: PassportStatic): Router => {
  const connectionRouter = Router();

  // OAuth Providers
  if (process.env.OASIS_API_SPOTIFY_CLIENT_ID)
    connectionRouter.use('/spotify', Spotify());

  return connectionRouter;
};
