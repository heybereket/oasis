import { Router } from 'express';
import { Strategy } from 'passport-github2';
import User from '@entities/User';
import { v4 as uuid } from 'uuid';
import { checkUsername } from '@utils/auth/checkUsername';
import { http } from '@utils/common/http';
import { searchJSON } from '@utils/index';
import { PassportStatic } from 'passport';
import Badge from '@entities/Badge';

export default (passport: PassportStatic): Router => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.OASIS_API_GITHUB_CLIENT_ID,
        clientSecret: process.env.OASIS_API_GITHUB_CLIENT_SECRET,
        callbackURL: process.env.OASIS_API_GITHUB_CALLBACK_URL,
      },
      async (_, __, profile, done) => {
        const id = String(profile.id);

        const contributorData = http(
          'https://api.github.com/repos/oasis-sh/oasis/contributors'
        );

        try {
          const user =
            (await User.findOne({ where: { github: id } })) || User.create();

          // Store data from GitHub only on user's first login
          if (!user.id) {
            user.id = uuid();
            user.avatar = profile._json.avatar_url;
            user.name = profile.displayName;
            user.username = await checkUsername(profile.username);
            user.github = id;
            user.verified = false;
            user.createdAt = String(Date.now());
          }

          // Searches JSON to see if user is a contributor in the repository
          if (searchJSON(await contributorData, 'login', profile.username)) {
            // Give the user a contributor badge if returns true
            user.badges = Promise.resolve([
              await Badge.createQueryBuilder()
                .where('name = :name', {
                  name: 'contributor-badge',
                })
                .getOne(),
            ]);
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
