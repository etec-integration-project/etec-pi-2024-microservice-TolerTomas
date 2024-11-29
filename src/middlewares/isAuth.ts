import { Request, Response, NextFunction } from "express";
import axios from "axios";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const user_jwt = req.cookies['express-jwt-toler-app'] as string
    
    if (!user_jwt) { return res.json({ 'error': 'unauthorized' }) }

    axios
        .post(
            `http://${process.env.AUTH_SERVER_ADDRESS as string}:5050/api/users/verify`,
            { token: user_jwt }
        )
        .then(res => res.data)
        .then(data => {
            return data.isVerified ? next() : res.json({ 'error': 'forbidden' })
        })
}