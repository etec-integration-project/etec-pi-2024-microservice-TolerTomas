import express from "express";
import cookieParser from "cookie-parser";
import fileRouter from "./routes/files.routes";
import fileUpload from 'express-fileupload';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(cors({
    origin: '*',
    credentials: true
}))

app.use('/storage', fileRouter)

export default app