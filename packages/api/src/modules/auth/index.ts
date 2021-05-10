import { Router } from 'express';
import { PassportStatic } from 'passport';
import GitHubAuth from './providers/github';
import TwitterAuth from './providers/twitter';
import DiscordAuth from './providers/discord';
import GoogleAuth from './providers/google';

export default (passport: PassportStatic): Router => {
  const authRouter = Router();

  /** Third party auth services */
  authRouter.use('/github', GitHubAuth(passport));
  authRouter.use('/twitter', TwitterAuth(passport));
  authRouter.use('/discord', DiscordAuth(passport));
  // authRouter.use('/google', GoogleAuth(passport));

  /** Internal actions. */
  authRouter.get('/logout', (req, res) => {
    req.logout();

    if (req.headers['accept']?.includes('text/html') ?? true) {
      return res.redirect('/');
    }

    res.json({ success: true });
  });

  return authRouter;
};
