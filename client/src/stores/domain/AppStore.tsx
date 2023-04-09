import AuthStore from './AuthStore';

class AppStore {
    public authStore: AuthStore;

    constructor() {
        this.authStore = new AuthStore();
    }
}

export default AppStore;