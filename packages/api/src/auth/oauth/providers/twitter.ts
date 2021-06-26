import { Router } from 'express';
import { Strategy } from 'passport-twitter';
import User from '@entities/User';
import { v4 as uuid } from 'uuid';
import { checkUsername } from '@utils/auth/checkUsername';
import { PassportStatic } from 'passport';
import isNull from '@utils/common/isNull';
import { URLs } from '@config/urls';

export default (passport: PassportStatic): Router => {
  passport.use(
    new Strategy(
      {
        consumerKey: process.env.OASIS_API_TWITTER_CLIENT_ID,
        consumerSecret: process.env.OASIS_API_TWITTER_CLIENT_SECRET,
        callbackURL: process.env.OASIS_API_TWITTER_CALLBACK_URL,
      },
      async (_, __, profile, done) => {
        const id = String(profile.id);

        try {
          const user = (await User.findOne({ where: { twitter: id } })) || User.create();

          if (!user.id) {
            user.id = uuid();
            user.avatar = profile._json.profile_image_url_https;
            user.banner = isNull(profile._json.profile_banner_url);
            user.name = profile.displayName;
            user.twitter = id;
            user.username = await checkUsername(profile.username);
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
      session: true,
    })
  );

  router.get(
    '/callback',
    passport.authenticate('twitter', {
      successReturnToOrRedirect: URLs.authSuccess,
      failureRedirect: URLs.login,
      session: true,
    })
  );

  return router;
};
