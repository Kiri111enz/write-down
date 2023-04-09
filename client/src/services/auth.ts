import { post, Response } from 'utils/http';

interface SignInRequestData {
    name: string;
    password: string;
}

interface SignUpRequestData extends SignInRequestData {
    email: string;
}

class AuthService {
    public async signUp(data: SignUpRequestData): Promise<Response> {
        return await post(data, 'user/sign-up');
    }
    
    public async signIn(data: SignInRequestData): Promise<Response> {
        return await post(data, 'user/sign-in');
    }

    public async singOut(): Promise<Response> {
        return await post({}, 'user/sign-out');
    }

    public async auth(): Promise<Response> {
        return await post({}, 'user/auth');
    }
}

export default AuthService;
export { SignInRequestData, SignUpRequestData };