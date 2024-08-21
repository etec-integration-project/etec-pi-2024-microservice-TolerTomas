import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { haveAlreadyLogged } from "../middlewares/have-already-logged";
import { createdir, listdir, uploadfile } from "../controllers/files-controller";

const fileRouter = Router()

fileRouter.use(isAuth)
fileRouter.use(haveAlreadyLogged)

fileRouter.post('/mkdir', createdir)

fileRouter.post('/upload', uploadfile)

fileRouter.get('/list', listdir)

export default fileRouter