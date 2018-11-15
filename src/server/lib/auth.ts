import { Request, Response } from "express";
import * as passport from "passport";
import * as JWT from "jsonwebtoken";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

const auth = {
  init: () => {
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

    return passport;
  },

  issueJWT: (user: any) => {
    const payload = { sub: user.id };
    const secretKey = new Buffer(
      process.env.JWT_SECRET_KEY as string,
      "base64"
    );
    return JWT.sign(payload, secretKey, { expiresIn: "30m" });
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
