import { Router } from 'express';
import { Strategy } from 'passport-discord';
import User from '../../../entities/User';
import { v4 as uuid } from 'uuid';
import { generateSafeUsername } from '../../../utils/auth/generateSafeUsername';
import { PassportStatic } from 'passport';

const getAvatarURL = (options: {
  hash?: string;
  id?: string;
  discriminator?: string;
  size?: number;
}): string => {
  const extension = options.hash.startsWith('a_') ? 'gif' : 'png';

  return `https://cdn.discordapp.com/${options.hash ? '' : 'embed/'}avatars${
    options.hash
      ? `${options.id}/${options.hash}`
      : parseInt(options.discriminator) % 5
  }.${options.hash ? extension : 'png'}?size=${
    options.size ? options.size : 512
  }`;
};

export default (passport: PassportStatic): Router => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.OASIS_API_DISCORD_CLIENT_ID,
        clientSecret: process.env.OASIS_API_DISCORD_CLIENT_SECRET,
        callbackURL: process.env.OASIS_API_DISCORD_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const id = String(profile.id);

        try {
          const user =
            (await User.findOne({ where: { discord: id } })) || User.create();

          // Store data from GitHub only on user's first login
          if (!user.id) {
            user.id = uuid();
            user.avatar = getAvatarURL({
              hash: profile.avatar,
              id: profile.id,
              discriminator: profile.discriminator,
              size: 512,
            });
            user.name = profile.username;
            user.username = await generateSafeUsername(profile.username);
            user.discord = id;
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
      successReturnToOrRedirect: '/',
      failureRedirect: '/login',
      session: true,
    })
  );

  return router;
};
