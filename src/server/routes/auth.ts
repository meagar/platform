import { Router } from "express";
import * as passport from "passport";
import auth from "../lib/auth";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false
  }),
  (req, res) => {
    const token = auth.issueJWT(req.user);
    res.send({ token });
  }
);

export default router;
