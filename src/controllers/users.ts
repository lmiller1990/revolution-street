import { Request, Response, Router } from "express";
import { orm } from "..";
import { User } from "../entities/User";

export const users = Router()

users.get('/', async (req: Request, res: Response) => {
  const all = await orm.em.find(User, {})
  res.render('./users/index', { users: all })
})
