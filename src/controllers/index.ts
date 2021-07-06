import { Request, Response, Router } from "express";
import { submitScores } from "./submitScores";
import { users } from "./users";

export const router = Router()

router.use("/users", users)
router.use("/submit_scores", submitScores)

router.use("/", async (req: Request, res: Response) => {
  res.render("./index");
})