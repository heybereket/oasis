import User from '@entities/User';
import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import { Strategy } from 'passport-custom';

export default (passport: PassportStatic): Router => {
  passport.use(
    'bot-auth',
    new Strategy(async (req, done) => {
      try {
        const [, token] = req.headers.authorization?.split(' ') || [];

        const { uid, tokenId } = verify(
          token,
          process.env.BOT_TOKEN_SECRET
        ) as any;

        const user = await User.findOneOrFail({
          where: { isBot: true, id: uid, botTokenId: tokenId },
        });

        return done(null, { id: user.id });
      } catch (e) {
        return done(e, null);
      }
    })
  );

  const router = Router();

  router.get(
    '/login',
    passport.authenticate('bot-auth', {
      session: true,
      successRedirect: '/',
      failureRedirect: '/login',
    })
  );

  return router;
};
