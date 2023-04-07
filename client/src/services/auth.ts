import { post, Response } from 'utils/http';

interface SignInRequestData {
    name: string;
    password: string;
}

interface SignUpRequestData extends SignInRequestData {
    email: string;
}

class AuthService {
    public async signIn(data: SignInRequestData): Promise<Response> {
        return await post(data, 'user/sign-in');
    }

    public async signUp(data: SignUpRequestData): Promise<Response> {
        return await post(data, 'user/sign-up');
    }
}

export default AuthService;
export { SignInRequestData, SignUpRequestData };