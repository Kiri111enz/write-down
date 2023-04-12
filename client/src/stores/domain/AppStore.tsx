import AuthStore from './AuthStore';

class AppStore {
    private readonly _authStore: AuthStore;

    constructor() {
        this._authStore = new AuthStore();
    }

    public get authStore(): AuthStore { return this._authStore; }
}

export default AppStore;