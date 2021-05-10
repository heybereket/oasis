import { Router } from 'express';
import { Strategy } from 'passport-twitter';
import User from '@entities/User';
import { v4 as uuid } from 'uuid';
import { generateSafeUsername } from '@utils/auth/generateSafeUsername';
import { PassportStatic } from 'passport';

export default (passport: PassportStatic): Router => {
  passport.use(
    new Strategy(
      {
        consumerKey: process.env.OASIS_API_TWITTER_API_KEY,
        callbackURL: process.env.OASIS_API_TWITTER_CALLBACK_URL,
        consumerSecret: process.env.OASIS_API_TWITTER_API_SECRET_KEY,
      },
      async (accessToken, refreshToken, profile, done) => {
        const id = String(profile.id);

        try {
          const user =
            (await User.findOne({ where: { twitter: id } })) || User.create();

          // Store data from Twitter only on user's first login
          if (!user.id) {
            user.id = uuid();
            user.avatar = profile._json.profile_image_url;
            user.name = profile.displayName;
            user.username = await generateSafeUsername(profile.username);
            user.twitter = id;
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
    passport.authenticate('twitter', {
      scope: ['user:email'],
      session: true,
    })
  );

  router.get(
    '/callback',
    passport.authenticate('twitter', {
      successReturnToOrRedirect: '/',
      failureRedirect: '/login',
      session: true,
    })
  );

  return router;
};
