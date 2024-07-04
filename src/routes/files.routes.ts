import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { haveAlreadyLogged } from "../middlewares/have-already-logged";

const fileRouter = Router()

fileRouter.use(isAuth)
fileRouter.use(haveAlreadyLogged)

fileRouter.get('/', (_req, res) => {
    return res.send('hola')
})

export default fileRouter