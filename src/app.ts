import express from "express";
import { router } from "./controllers";
// import bodyParser from "body-parser"

export const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(router);
