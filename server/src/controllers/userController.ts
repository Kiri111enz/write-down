import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from 'db/models';
import { sendWithCookie, Cookie } from 'utils/response';

class UserController {
    constructor() {
        this.create = this.create.bind(this);
        this.signIn = this.signIn.bind(this);
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
            return sendWithCookie(res, new Cookie('access_token', token), 'Successfully signed up.');
        }
        catch (err) {
            if (err.errors)
                return res.status(400).send(err.errors[0].message);
            else
                return next(err);
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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
            return sendWithCookie(res, new Cookie('access_token', token), 'Successfully signed in.');
        }
        catch (err) {
            return next(err);
        }
    }

    public async signOut(req: Request, res: Response): Promise<Response> {
        return res.clearCookie('access_token').send('Successfully signed out.');
    }

    public async updateToken(req: Request, res: Response): Promise<Response> {
        const token = this._generateJWT(req.user);
        return sendWithCookie(res, new Cookie('access_token', token), 'Successfully authorized.');
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