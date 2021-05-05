import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-github2";
import User from "../../../entities/User";
import { v4 as uuid } from "uuid";
import { generateSafeUsername } from "../../../utils/generateSafeUsername";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new Strategy(
    {
      clientID: process.env.OASIS_API_GITHUB_CLIENT_ID,
      clientSecret: process.env.OASIS_API_GITHUB_CLIENT_SECRET,
      callbackURL: process.env.OASIS_API_GITHUB_CALLBACK_URL,
    },
    async (_, __, profile, cb) => {
      const id = String(profile.id);

      try {
        const user =
          (await User.findOne({ where: { github: id } })) || User.create();

        // Generate username only if this is the user's first login
        if (!user.id)
          user.username = await generateSafeUsername(profile.username);

        user.id = user.id || uuid();
        user.avatar = profile._json.avatar_url;
        user.badges = [];
        user.createdAt = String(Date.now());
        user.github = id;
        user.name = profile.displayName || profile.username;
        user.verified = false;

        await user.save();

        return cb(null, { id: user.id });
      } catch (e) {
        return cb(e, null);
      }
    }
  )
);

const router = Router();
export default router;

router.use(passport.initialize());

router.get(
  "/",
  passport.authenticate("github", { scope: ["user:email"], session: true })
);

router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  (_, res) => {
    res.redirect("http://localhost:3000/graphql");
  }
);
