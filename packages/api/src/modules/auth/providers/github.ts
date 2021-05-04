import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-github2";
import User from "../../../entities/User";
import { v4 as uuid } from "uuid";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new Strategy(
    {
      clientID: "9792f6d4760120168284",
      clientSecret: "d4c847a8e1564f79f7a5c12e448eb16ce7a1c278",
      callbackURL: "http://localhost:4000/api/auth/github/callback",
    },
    async (_, __, profile, cb) => {
      const id = String(profile.id);

      try {
        const user =
          (await User.findOne({ where: { github: id } })) || User.create();

        user.id = user.id || uuid();
        user.avatar = profile._json.avatar_url;
        user.badges = [];
        user.createdAt = String(Date.now());
        user.github = id;
        user.username = profile.username;
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
    res.redirect("http://localhost:4000/graphql");
  }
);
