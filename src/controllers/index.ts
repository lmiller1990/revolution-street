import { Request, Response, Router } from "express";
import { auth } from "./auth";
import { submitScores } from "./submitScores";
import { users } from "./users";

export const router = Router()

router.use("/users", users)
router.use("/submit_scores", submitScores)
router.use(auth)

router.use("/", async (req: Request, res: Response) => {
  res.render("./index");
})