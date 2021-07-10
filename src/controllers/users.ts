import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Request, Response, Router } from "express";
import { DateTime } from "luxon";

import { orm } from "..";
import { countryMap } from "../data/countries";
import { Score } from "../entities/Score";
import { Song } from "../entities/Song";
import { User } from "../entities/User";
import { ScoreForm } from "./submitScores";

export const users = Router();

const userVM = (users: User[]) => {
  return users.map((user, idx) => {
    const lastActive = DateTime.fromJSDate(user.lastActive);
    const region = countryMap[user.region]

    return {
      lastActive: lastActive.toFormat("y-LL-dd hh:mm"),
      rank: idx + 1,
      region: region ? `${region.name} ${region.flag}` : "-",
      flag: region ? region.flag : "",
      username: user.username,
      twitter: user.twitter,
    };
  });
};

const showUser = async (user: User, orm: MikroORM<PostgreSqlDriver>) => {
  const songs = (await orm.em.find(Song, {})).sort((x, y) =>
    y.name.localeCompare(x.name)
  );

  const scores = await orm.em
    .createQueryBuilder(Score)
    .select("*")
    .where({ userId: user.id })
    .getResult();
  await orm.em.populate(scores, "song");

  const songIdAsKey = scores.reduce<Record<string, Score>>((acc, score) => {
    return {
      ...acc,
      [score.songId]: score,
    };
  }, {});

  const summary: Array<
    Omit<ScoreForm<string>, "song"> & {
      song: { id: string; name: string };
      id?: string;
    }
  > = songs.map((song) => {
    const score = songIdAsKey[song.id];
    if (score) {
      return {
        id: score.id.toString(),
        marvelous: (score.marvelous || 0).toString(),
        perfect: (score.perfect || 0).toString(),
        great: (score.great || 0).toString(),
        good: (score.good || 0).toString(),
        boo: (score.boo || 0).toString(),
        miss: (score.miss || 0).toString(),
        grade: score.grade,
        song: {
          name: song.name,
          id: song.id.toString()
        },
      };
    }

    return {
      id: undefined,
      marvelous: "-",
      perfect: "-",
      great: "-",
      good: "-",
      boo: "-",
      miss: "-",
      grade: "-",
      song: {
        name: song.name,
        id: song.id.toString()
      },
    };
  });

  return summary.sort((x, y) => x.song.name.localeCompare(y.song.name));
};

users.get("/", async (req: Request, res: Response) => {
  const all = await orm.em.find(User, {});
  res.render("./users/index", { users: userVM(all) });
});

users.get("/:username", async (req: Request, res: Response) => {
  const user = await orm.em.findOne(User, { username: req.params.username });
  console.log('user', user)
  const currentUser = req.user as User
  res.render("./users/show", {
    user,
    name: req.params.username,
    flag: user && user.region && countryMap[user.region]?.flag,
    canEdit: currentUser && user && currentUser.id === user.id,
    scores: user ? await showUser(user!, orm as MikroORM<PostgreSqlDriver>) : [],
  });
});
