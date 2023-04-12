import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from 'db/models';
import { sendWithCookie, Cookie } from 'utils/response';

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { name, email, password } = req.body;
        if (!password)
            return res.status(400).send('User password cannot be empty.');
        const passwordHash = await bcrypt.hash(password, 5);
        const user = await User.create({ name, email, password: passwordHash });
        const token = generateJWT(user);
        return sendWithCookie(res, new Cookie('access_token', token), 'Successfully signed up.');
    }
    catch (err) {
        if (err.errors)
            return res.status(400).send(err.errors[0].message);
        else
            return next(err);
    }
}

const signIn = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
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
        
        const token = generateJWT(user);
        return sendWithCookie(res, new Cookie('access_token', token), 'Successfully signed in.');
    }
    catch (err) {
        return next(err);
    }
}

const signOut = async (req: Request, res: Response): Promise<Response> => {
    return res.clearCookie('access_token').send('Successfully signed out.');
}

const updateToken = async (req: Request, res: Response): Promise<Response> => {
    const token = generateJWT(req.user);
    return sendWithCookie(res, new Cookie('access_token', token), 'Successfully authorized.');
}

const generateJWT = (user: User): string => {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

export default { signUp, signIn, signOut, updateToken };