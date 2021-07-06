import { Request, Response, Router } from "express";

export const submitScores = Router();

submitScores.get("/", async (req: Request, res: Response) => {
  res.render("./submitScores/index");
});
