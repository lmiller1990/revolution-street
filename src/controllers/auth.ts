import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { orm } from "..";
import { User } from "../entities/User";
import { countries } from "../data/countries";

export const auth = Router();

const saltRounds = 10;

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

auth.get("/login", async (req: Request, res: Response) => {
  res.render("./auth/login");
});

auth.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  async (req: Request, res: Response) => {
    res.redirect("/");
  }
);

auth.get("/log_out", async (req: Request, res: Response) => {
  req.logout();
  res.redirect("/");
});

auth.get("/sign_up", async (req: Request, res: Response) => {
  res.render("./auth/sign_up", {
    countries,
  });
});

auth.post("/sign_up", async (req: Request, res: Response) => {
  const { username, password, email, region } = req.body;
  const hashed = await hashPassword(password);
  const user = orm.em.create(User, {
    email,
    username,
    region,
    password: hashed,
  });

  await orm.em.persist(user).flush();

  await new Promise((resolve) => {
    req.login({ ...user, email, password: hashed }, (err) => {
      if (!err) {
        resolve(res.redirect("/"));
      } else {
        resolve(res.render("./auth/sign_up"));
      }
    });
  });
});
