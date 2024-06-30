import express from "express";
import cookieParser from "cookie-parser";
import fileRouter from "./routes/files.routes";

const app = express()

app.use(cookieParser())

app.use('/', fileRouter)

export default app