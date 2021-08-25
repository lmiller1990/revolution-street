import fs from "fs";
import path from "path";
import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Request, Response, Router } from "express";
import multer from "multer";
import { orm } from "..";
import { Score } from "../entities/Score";
import { Song } from "../entities/Song";
import { User } from "../entities/User";
import { mustAuthenticate } from "../middleware/mustAuthenticate";

export const submitScores = Router();

export type Grade = "AAA" | "AA" | "A" | "B" | "C" | "D" | "E" | "-";

export interface ScoreForm<T> {
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
  filename: string | undefined,
  userId: number,
  orm: MikroORM
) {
  const toNum = (num: string) => (num === "" ? 0 : parseInt(num, 10));

  const song = await orm.em.findOne(Song, { id: parseInt(form.song, 10) });

  if (!song) {
    throw Error(
      `Could not create score for unknown song with id: ${form.song}.`
    );
  }

  const alreadyHasScore = await orm.em.findOne(Score, {
    songId: song.id,
    userId,
  });

  if (alreadyHasScore) {
    alreadyHasScore.perfect = toNum(form.perfect);
    alreadyHasScore.great = toNum(form.great);
    alreadyHasScore.good = toNum(form.good);
    alreadyHasScore.miss = toNum(form.miss);
    alreadyHasScore.boo = toNum(form.boo);
    alreadyHasScore.grade = form.grade;
    alreadyHasScore.image = filename;
    return orm.em.persist(alreadyHasScore).flush();
  }

  const score = orm.em.create(Score, {
    perfect: toNum(form.perfect),
    great: toNum(form.great),
    good: toNum(form.good),
    miss: toNum(form.miss),
    boo: toNum(form.boo),
    songId: song!.id,
    image: filename,
    grade: form.grade,
    userId,
  });

  return orm.em.persist(score).flush();
}

submitScores.get(
  "/",
  mustAuthenticate,
  async (req: Request<{}, {}, {}, { song_id: string }>, res: Response) => {
    const songToScore = req.query.song_id;
    const songs = (await orm.em.find(Song, {})).sort((x, y) =>
      x.name.localeCompare(y.name)
    );

    res.render("./submitScores/index", { songs, songToScore });
  }
);

async function editScore(
  scoreId: string,
  userId: number | undefined,
  orm: MikroORM<PostgreSqlDriver>
) {
  const id = parseInt(scoreId, 10);

  const score = await orm.em
    .createQueryBuilder(Score)
    .select("*")
    .where({ id, userId })
    .getResult();

  if (!score || score.length === 0) {
    return;
  }

  await orm.em.populate(score, "song");

  return score[0];
}

submitScores.get(
  "/:score_id/edit",
  mustAuthenticate,
  async (req: Request<{ score_id: string }>, res: Response) => {
    const user = req.user as User;

    const score = await editScore(
      req.params.score_id,
      user.id,
      orm as MikroORM<PostgreSqlDriver>
    );

    if (!score) {
      return res.redirect(`/users/${user.username}`);
    }

    res.render("./submitScores/edit", { score });
  }
);

async function updateScore(
  form: ScoreForm<string> & { id: string },
  userId: number | undefined,
  filename: string | undefined,
  orm: MikroORM<PostgreSqlDriver>
) {
  const score = await orm.em.findOneOrFail(Score, {
    id: parseInt(form.id, 10),
  });

  if (!score || score.userId !== userId) {
    throw Error(`Not authorized to edit this score`);
  }

  score.perfect = parseInt(form.perfect, 10);
  score.great = parseInt(form.great, 10);
  score.good = parseInt(form.good, 10);
  score.boo = parseInt(form.boo, 10);
  score.miss = parseInt(form.miss, 10);
  score.image = filename;
  score.grade = form.grade;

  return orm.em.persist(score).flush();
}

const upload = multer({
  dest: "./uploads",
  limits: { fieldSize: 20 * 1024 * 1024 },
});

const getExt = (mimetype?: string) => mimetype?.split("/")?.[1] ?? undefined;

submitScores.post(
  "/:score_id",
  mustAuthenticate,
  upload.single("image"),
  async (req: Request<{ score_id: string }>, res: Response) => {
    const ext = getExt(req.file?.mimetype);
    const user = req.user as User;
    const filename = (req.file && `${req.file?.filename}.${ext}`) ?? undefined;
    if (req.file && filename) {
      fs.renameSync(
        path.resolve(process.cwd(), req.file.path),
        path.resolve(process.cwd(), "uploads", filename)
      );
    }

    try {
      await updateScore(
        req.body,
        user.id,
        filename,
        orm as MikroORM<PostgreSqlDriver>
      );

      return res.redirect(`/users/${user.username}`);
    } catch (e) {
      return res.redirect(`/users/${user.username}`);
    }
  }
);

submitScores.post(
  "/",
  mustAuthenticate,
  upload.single("image"),
  async (req: Request, res: Response) => {
    const user = req.user as User;
    const ext = getExt(req.file?.mimetype);
    const filename = (req.file && `${req.file?.filename}.${ext}`) ?? undefined;
    if (req.file && filename) {
      fs.renameSync(
        path.resolve(process.cwd(), req.file.path),
        path.resolve(process.cwd(), "uploads", filename)
      );
    }

    await createScore(req.body, filename, (req.user as User).id, orm);
    return res.redirect(`/users/${user.username}`);
  }
);
