import { Request, Response, Router } from "express";
import { DateTime } from "luxon";

import { orm } from "..";
import { User } from "../entities/User";

export const users = Router();

// 2021-07-06 17:17:39.220632+10 -> 2021-07-06 17:17:39+10
const timestamptzRegexp = /(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})\.\d{6}(\+\d{2})/

const userVM = (users: User[]) => {
  return users.map(((user, idx) => {
    console.log(typeof user.lastActive)
    // const [_, time, zone] = user.lastActive.match(timestamptzRegexp)!

    const lastActive = DateTime.fromJSDate(user.lastActive)

    // const lastActive = Luxon.DateTime.fromFormat(`${time}${zone}`, 'YYYY-MM-DD HH:MM:ssZ')
    // console.log(lastActive.toFormat('YYYY-MM-DD HH:mm'))

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
