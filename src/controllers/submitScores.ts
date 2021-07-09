import { MikroORM } from "@mikro-orm/core";
import { Request, Response, Router } from "express";
import { updateNamespaceExportDeclaration } from "typescript";
import { orm } from "..";
import { Score } from "../entities/Score";
import { Song } from "../entities/Song";
import { User } from "../entities/User";
import { mustAuthenticate } from "../middleware/mustAuthenticate";

export const submitScores = Router();

export async function createScore(
  form: {
    marvelous: string;
    perfect: string;
    great: string;
    good: string;
    miss: string;
    boo: string;
    song: string;
    grade: "AAA" | "AA" | "A" | "B" | "C" | "D" | "E";
  },
  { orm, userId }: { orm: MikroORM; userId: number }
) {
  const toNum = (num: string) => (num === "" ? 0 : parseInt(num, 10));

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
    await createScore(req.body, { orm, userId: (req.user as User).id });
    res.render("./index");
  }
);
