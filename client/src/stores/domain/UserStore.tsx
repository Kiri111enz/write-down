import { runInAction, makeAutoObservable } from 'mobx';
import AppStore from './AppStore';
import AuthService, { SignInRequestData, SignUpRequestData } from 'services/auth';
import { Response } from 'utils/http';

class UserStore {
    private _isAuthorized = false;

    public get isAuthorized(): boolean { return this._isAuthorized; }

    constructor(
        private _appStore: AppStore, 
        private _authService: AuthService) {
        makeAutoObservable(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this._auth = this._auth.bind(this);
        this.auth();
    }

    public async signUp(data: SignUpRequestData): Promise<Response> {
        return await this._auth(this._authService.signUp, data);
    }

    public async signIn(data: SignInRequestData): Promise<Response> {
        return await this._auth(this._authService.signIn, data);
    }

    public async signOut(): Promise<Response> {
        const res = await this._authService.singOut();
        runInAction(() => this._isAuthorized = !res.success);
        return res;
    }

    public async auth(): Promise<Response> {
        return await this._auth(this._authService.auth, {});
    }

    private async _auth(authFunc: (data: object) => Promise<Response>, data: object): Promise<Response> {
        const res = await authFunc(data);
        runInAction(() => this._isAuthorized = res.success);
        return res;
    }
}

export default UserStore;