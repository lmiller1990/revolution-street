import { MikroORM } from "@mikro-orm/core";
import { Request, Response, Router } from "express";
import { orm } from "..";
import { Score } from "../entities/Score";
import { Song } from "../entities/Song";
import { User } from "../entities/User";
import { mustAuthenticate } from "../middleware/mustAuthenticate";

export const submitScores = Router();

export type Grade = "AAA" | "AA" | "A" | "B" | "C" | "D" | "E" | "-";

export interface ScoreForm<T> {
  marvelous: T;
  perfect: T;
  great: T;
  good: T;
  miss: T;
  boo: T;
  song: T;
  grade: Grade;
}

export async function createScore(
  form: ScoreForm<string>,
  { orm, userId }: { orm: MikroORM; userId: number }
) {
  const toNum = (num: string) => (num === "" ? 0 : parseInt(num, 10));

console.log(userId)
  const song = await orm.em.findOne(Song, { id: parseInt(form.song, 10) });
  const score = orm.em.create(Score, {
    marvelous: toNum(form.marvelous),
    perfect: toNum(form.perfect),
    great: toNum(form.great),
    good: toNum(form.good),
    miss: toNum(form.miss),
    boo: toNum(form.boo),
    songId: song!.id,
    grade: form.grade,
    userId,
  });

  return orm.em.persist(score).flush();
}

submitScores.get("/", mustAuthenticate, async (req: Request, res: Response) => {
  const songs = (await orm.em.find(Song, {})).sort((x, y) =>
    x.name.localeCompare(y.name)
  );

  res.render("./submitScores/index", { songs });
});

submitScores.post(
  "/",
  mustAuthenticate,
  async (req: Request, res: Response) => {
    console.log(req.user);
    await createScore(req.body, { orm, userId: (req.user as User).id });
    res.render("./index");
  }
);
