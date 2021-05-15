import User from '@entities/User';
import { Router } from 'express';
import { PassportStatic } from 'passport';
import { Strategy } from 'passport-custom';

export default (passport: PassportStatic): Router => {
  passport.use(
    'bot-auth',
    new Strategy(async (req, done) => {
      const user = await User.findOne({
        where: { isBot: true, botToken: req.query.auth_token },
      });

      if (user !== undefined) {
        return done(null, { id: user.id });
      } else {
        return done(null, null);
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
