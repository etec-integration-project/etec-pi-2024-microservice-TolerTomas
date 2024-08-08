import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { haveAlreadyLogged } from "../middlewares/have-already-logged";
import { Request, Response} from "express";
import { mkdir } from "fs/promises";
import { join as pathjoin } from "path";

const fileRouter = Router()

fileRouter.use(isAuth)
fileRouter.use(haveAlreadyLogged)

fileRouter.get('/test', (req: Request, res: Response) => {
    
    console.log({ req })

    return res.send('Server is on')
})

fileRouter.post('/mkdir', async (req: Request, res: Response) => {

    const { path, newDir } = req.body

    const finalDir = path == '-'
        ? '/'
        : (path as string).endsWith('/')
            ? (path as string).concat(newDir)
            : (path as string).concat('/').concat(newDir)

    console.log(req.body)

    mkdir(
        pathjoin(__dirname, '..', '..', 'app-storage', req.body.user.id, ...(path as string).split('/'), newDir)
    )
        .then(() => {
            return res.json({
                __dirname,
                path: path,
                newDir,
                finalDir: path == '-'
                    ? '/'
                    : (path as string).endsWith('/')
                        ? (path as string).concat(newDir)
                        : (path as string).concat('/').concat(newDir)
            })
        })

    
})

export default fileRouter