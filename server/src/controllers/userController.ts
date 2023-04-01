import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { User } from './../db/models';

class UserController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, email, password } = req.body;
            if (!password)
                return res.status(400).send('User password cannot be empty.');
            const passwordHash = await bcrypt.hash(password, 5);
            const user = await User.create({ name, email, password: passwordHash });
            return res.json(user);
        }
        catch (err) {
            if (err.errors)
                return res.status(400).send(err.errors[0].message);
            else
                next(err);
        }
    }

    public async logIn(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, email, password } = req.body;
            const user = 
                name ? await User.findOne({ where: { name }}) :
                email ? await User.findOne({ where: { email }}) :
                undefined;
            
            if (!user)
                return res.status(400).send('Wrong username/email specified.');
            if (!bcrypt.compareSync(password, user.password))
                return res.status(400).send('Wrong password specified.');
            
            return res.json(user);
        }
        catch (err) {
            next(err);
        }
    }
}

export default new UserController();