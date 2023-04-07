import { runInAction, makeAutoObservable } from 'mobx';
import AppStore from './AppStore';
import AuthService, { LogInRequestData } from 'services/auth';
import { Response } from 'utils/http';

class UserStore {
    private _isAuthorized = false;

    public get isAuthorized(): boolean { return this._isAuthorized; }

    constructor(
        private _appStore: AppStore, 
        private _authService: AuthService) {
        makeAutoObservable(this);
        this.logIn = this.logIn.bind(this);
    }

    public async logIn(data: LogInRequestData): Promise<Response> {
        const res = await this._authService.logIn(data);
        runInAction(() => this._isAuthorized = res.success);
        return res;
    }
}

export default UserStore;