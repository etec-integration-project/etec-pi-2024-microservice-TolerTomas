import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { haveAlreadyLogged } from "../middlewares/have-already-logged";
import { createdir, deletefile, downloadfile, listdir, uploadfile } from "../controllers/files-controller";

const fileRouter = Router()

fileRouter.use(isAuth)
fileRouter.use(haveAlreadyLogged)

fileRouter.post('/mkdir', createdir)

fileRouter.post('/upload', uploadfile)

fileRouter.post('/list', listdir)

fileRouter.post('/download', downloadfile)

fileRouter.delete('/delete', deletefile)

export default fileRouter