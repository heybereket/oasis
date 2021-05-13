import { Router } from 'express';
import { PassportStatic } from 'passport';
import GitHubAuth from './providers/github';
import TwitterAuth from './providers/twitter';
import DiscordAuth from './providers/discord';
import BotAuth from './providers/bot';

export default (passport: PassportStatic): Router => {
  const authRouter = Router();

  // OAuth Providers
  if (process.env.OASIS_API_GITHUB_CLIENT_ID)
    authRouter.use('/github', GitHubAuth(passport));
  if (process.env.OASIS_API_TWITTER_KEY)
    authRouter.use('/twitter', TwitterAuth(passport));
  if (process.env.OASIS_API_DISCORD_CLIENT_ID)
    authRouter.use('/discord', DiscordAuth(passport));

  authRouter.use('/bot', BotAuth(passport));
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
