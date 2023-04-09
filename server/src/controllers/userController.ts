import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from 'db/models';

class UserController {
    constructor() {
        this.create = this.create.bind(this);
        this.logIn = this.logIn.bind(this);
        this.updateToken = this.updateToken.bind(this);
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, email, password } = req.body;
            if (!password)
                return res.status(400).send('User password cannot be empty.');
            const passwordHash = await bcrypt.hash(password, 5);
            const user = await User.create({ name, email, password: passwordHash });
            const token = this._generateJWT(user);
            return res.cookie('access_token', token, {
                httpOnly: true, secure: process.env.NODE_ENV == 'production'
            }).send('Successfully signed up.');
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
            
            const token = this._generateJWT(user);
            return res.cookie('access_token', token, {
                httpOnly: true, secure: process.env.NODE_ENV == 'production'
            }).send('Successfully signed in.');
        }
        catch (err) {
            next(err);
        }
    }

    public async logOut(req: Request, res: Response): Promise<Response> {
        return res.clearCookie('access_token').send('Successfully signed out.');
    }

    public async updateToken(req: Request, res: Response): Promise<Response> {
        const token = this._generateJWT(req.user);
        return res.cookie('access_token', token, {
            httpOnly: true, secure: process.env.NODE_ENV == 'production'
        }).send('Successfully authorized.');
    }

    private _generateJWT(user: User): string {
        return jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        )
    }
}

export default new UserController();