import { post, Response } from 'utils/http';

interface LogInRequestData {
    name: string,
    password: string
}

class AuthService {
    public async logIn(data: LogInRequestData): Promise<Response> {
        return await post(data, 'user/sign-in');
    }
}

export default AuthService;
export { LogInRequestData };