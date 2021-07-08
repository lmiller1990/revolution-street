import express, { NextFunction, Request, Response } from "express";
import LocalStrategy from "passport-local";
import passport from "passport";
import session from "express-session";

import { router } from "./controllers";
import { localStrategy } from "./local-strategy";
import { User } from "./entities/User";

export const app = express();

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: "email",
    },
    localStrategy
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: User, done) => {
  done(null, user);
});

app.use(
  session({
    secret: "keyboard catt",
  })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.authenticated = !!req.user;
  next();
});

app.use(router);
