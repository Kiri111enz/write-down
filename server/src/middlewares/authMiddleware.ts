import { User } from 'db/models';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.method == 'OPTIONS')
        return next();

    try {
        const token = req.cookies.access_token;
        if (!token)
            return res.status(401).send('User not authorized.');
        const user = jwt.verify(token, process.env.SECRET_KEY) as User;
        req.user = user;
        return next();
    }
    catch (err) {
        return res.status(401).send('User not authorized.')
    }
}