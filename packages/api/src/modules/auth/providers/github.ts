import { Router } from 'express';
import { Strategy } from 'passport-github2';
import User from '../../../entities/User';
import { v4 as uuid } from 'uuid';
import { generateSafeUsername } from '../../../utils/generateSafeUsername';
import { PassportStatic } from 'passport';

export default (passport: PassportStatic): Router => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.OASIS_API_GITHUB_CLIENT_ID,
        clientSecret: process.env.OASIS_API_GITHUB_CLIENT_SECRET,
        callbackURL: process.env.OASIS_API_GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const id = String(profile.id);

        try {
          const user =
            (await User.findOne({ where: { github: id } })) || User.create();

          // Generate username only if this is the user's first login
          if (!user.id){
            user.id = uuid();
            user.username = await generateSafeUsername(profile.username);
            user.name = profile.displayName;
            user.verified = false;
            user.createdAt = String(Date.now());
          } else {
            user.avatar = profile._json.avatar_url;
            user.badges = [];
            user.github = id;

            await user.save();

            return done(null, { id: user.id });
        }} catch (e) {
           return done(e, null);
        }
      }
    )
  );

  const router = Router();

  router.get(
    '/',
    passport.authenticate('github', {
      scope: ['user:email'],
      session: true,
    })
  );

  router.get(
    '/callback',
    passport.authenticate('github', {
      successReturnToOrRedirect: '/',
      failureRedirect: '/login',
      session: true,
    })
  );

  return router;
};
