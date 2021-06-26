import { Router } from 'express';
import { Strategy } from 'passport-discord';
import User from '@entities/User';
import { v4 as uuid } from 'uuid';
import { checkUsername } from '@utils/auth/checkUsername';
import { PassportStatic } from 'passport';
import { URLs } from '@config/urls';

const getAvatarURL = (options: {
  hash?: string;
  id?: string;
  size?: number;
}): string => {
  const extension = options.hash.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/avatars/${options.id}/${
    options.hash
  }.${extension}?size=${options.size ? options.size : 512}`;
};

export default (passport: PassportStatic): Router => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.OASIS_API_DISCORD_CLIENT_ID,
        clientSecret: process.env.OASIS_API_DISCORD_CLIENT_SECRET,
        callbackURL: process.env.OASIS_API_DISCORD_CALLBACK_URL,
      },
      async (_, __, profile, done) => {
        const id = String(profile.id);

        try {
          const user = (await User.findOne({ where: { discord: id } })) || User.create();

          if (!user.id) {
            user.id = uuid();
            user.avatar = getAvatarURL({
              hash: profile.avatar,
              id: profile.id,
              size: 512,
            });
            user.name = profile.username;
            user.discord = id;
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
    passport.authenticate('discord', {
      scope: ['identify'],
      session: true,
    })
  );

  router.get(
    '/callback',
    passport.authenticate('discord', {
      successReturnToOrRedirect: URLs.authSuccess,
      failureRedirect: URLs.login,
      session: true,
    })
  );

  return router;
};
