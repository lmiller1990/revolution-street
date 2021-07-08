import { Request, Response, Router } from "express";

export const auth = Router();

auth.get("/login", async (req: Request, res: Response) => {
  res.render("./auth/login");
});

auth.get("/sign_up", async (req: Request, res: Response) => {
  res.render("./auth/sign_up");
});

auth.post("/sign_up", async (req: Request, res: Response) => {
  console.log(req.body)
  res.render("./auth/sign_up");
});