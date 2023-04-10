import { runInAction, makeAutoObservable } from 'mobx';
import { post, Response } from 'utils/http';

class AuthStore {
    private readonly _BASE_URL = 'user/';
    private _isAuthorized = false;

    constructor() {
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.auth = this.auth.bind(this);
        this.signOut = this.signOut.bind(this);

        makeAutoObservable(this);
        this.auth();
    }

    public get isAuthorized(): boolean { return this._isAuthorized; }

    public async signIn(data: object): Promise<Response> {
        return await this._updateStatus('sign-in', data);
    }

    public async signUp(data: object): Promise<Response> {
        return await this._updateStatus('sign-up', data);
    }

    public async auth(): Promise<Response> {
        return await this._updateStatus('auth', {});
    }

    public async signOut(): Promise<Response> {
        return await this._updateStatus('sign-out', {}, true);
    }

    private async _updateStatus(url: string, data: object, flip=false): Promise<Response> {
        const res = await post(this._BASE_URL + url, data);
        runInAction(() => this._isAuthorized = flip ? !res.success : res.success);
        return res;
    }
}

export default AuthStore;