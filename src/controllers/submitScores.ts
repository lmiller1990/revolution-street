import { Request, Response, Router } from "express";
import { mustAuthenticate } from "../middleware/mustAuthenticate";

export const submitScores = Router();

submitScores.get(
  "/",
  mustAuthenticate,
  async (req: Request, res: Response) => {
    res.render("./submitScores/index");
  }
);
