import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { User } from './../db/models';

class UserController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, email, password } = req.body;
            const passwordHash = await bcrypt.hash(password, 5);
            const user = await User.create({ name, email, password: passwordHash });
            return res.json(user);
        }
        catch (err) {
            next(err);
        }
    }
}

export default new UserController();