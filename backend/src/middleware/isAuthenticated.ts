import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface Payload {
    sub: string;
    isAdmin: boolean;
    userID: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).end()
    }

    const [, token] = authToken.split(' ')

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as Payload;

        if (!payload.isAdmin) {
            return res.status(403).end()
        }

        req.userID = payload.sub

        console.log("id do usuario", req.userID)
        return next()

    } catch (err) {
        return res.status(401).end()
    }
}