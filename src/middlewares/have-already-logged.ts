import axios from "axios";
import { mkdir } from "fs/promises";
import { Request, Response, NextFunction } from "express";

export const haveAlreadyLogged = async (req: Request, res: Response, next: NextFunction) => {
    const user_jwt = req.cookies['express-jwt-toler-app'] as string

    axios
        .post(
            `http://${process.env.AUTH_SERVER_ADDRESS as string}:5050/api/users/update-have-logged`,
            { token: user_jwt }
        )
        .then(res => res.data)
        .then(async (data) => {

            req.body.user = data.user

            if (data.msg === 'user alredy logged' ) {
                return next()
            }
            
            if (data.msg === 'user updated') {
                console.log('creando carpetas')
                // req.body.user = data.user
                await mkdir(`${__dirname}/../../${process.env.STORAGE_URL}/${data.user.id}`)
                return next()
            }

            return res.json({ error: 'forbidden' }).status(403)
        })
}