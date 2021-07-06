import { Router } from "express";
import { users } from "./users";

export const router = Router()

router.use("/users", users)