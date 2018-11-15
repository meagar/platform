import { Request, Response } from "express";
import * as passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import * as expressSession from "express-session";

const auth = {
  init: () => {
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
          callbackURL: `http://localhost:3001/auth/google/callback`
        },
        function(accessToken, refreshToken, profile, done) {
          const user = {
            email: profile.emails[0].value,
            name: profile.displayName,
            token: accessToken
          };
          return done(null, user);
        }
      )
    );

    const session = expressSession({
      secret: "foobar",
      resave: false,
      saveUninitialized: true
    });

    return { passport, session };
  },

  ensureAuthenticated: (req: Request, res: Response, next: Function) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).send({
        errors: ["User not authenticated"]
      });
    }
    return next();
  }
};

export default auth;
