import { Router } from 'express';
import { Strategy } from 'passport-google-oauth20';
import User from '../../../entities/User';
import { v4 as uuid } from 'uuid';
import { generateSafeUsername } from '../../../utils/auth/generateSafeUsername';
import { PassportStatic } from 'passport';

export default (passport: PassportStatic): Router => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.OASIS_API_GOOGLE_CLIENT_ID,
        clientSecret: process.env.OASIS_API_GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.OASIS_API_GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const id = String(profile.id);
        const username = profile.displayName.replace(/ /g, '_');

        try {
          const user =
            (await User.findOne({ where: { google: id } })) || User.create();

          if (!user.id) {
            user.id = uuid();
            user.avatar = profile._json.picture;
            user.name = profile.displayName;
            user.username = await generateSafeUsername(username);
            user.google = id;
            user.verified = false;
            user.createdAt = String(Date.now());
          }

          await user.save();

          return done(null, { id: user.id });
        } catch (e) {
          return done(e, null);
        }
      }
    )
  );

  const router = Router();

  router.get(
    '/',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile'],
      session: true,
    })
  );

  router.get(
    '/callback',
    passport.authenticate('google', {
      successReturnToOrRedirect: '/',
      failureRedirect: '/login',
      session: true,
    })
  );

  return router;
};
