import { NextFunction, Request, Response } from "express";

export function mustAuthenticate(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.redirect("/login")
  }

  return next()
}