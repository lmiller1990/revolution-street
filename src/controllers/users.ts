import { Request, Response, Router } from "express";
import { DateTime } from "luxon";

import { orm } from "..";
import { User } from "../entities/User";

export const users = Router();

const userVM = (users: User[]) => {
  return users.map(((user, idx) => {
    const lastActive = DateTime.fromJSDate(user.lastActive)

    return {
      rank: idx + 1,
      lastActive: lastActive.toFormat('y-LL-dd hh:mm'),
      region: user.region,
      username: user.username,
      twitter: user.twitter
    }
  }));
};

users.get("/", async (req: Request, res: Response) => {
  const all = await orm.em.find(User, {});
  res.render("./users/index", { users: userVM(all) });
});
