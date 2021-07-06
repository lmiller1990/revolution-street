import express from "express";
import { router } from "./controllers";

export const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(router);
