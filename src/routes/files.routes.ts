import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";

const fileRouter = Router()

fileRouter.use(isAuth)

fileRouter.get('/', (_req, res) => {
    return res.send('hola')
})

export default fileRouter