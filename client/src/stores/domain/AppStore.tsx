import UserStore from './UserStore';
import AuthService from './../../services/auth';

class AppStore {
    public userStore: UserStore;

    constructor() {
        this.userStore = new UserStore(this, new AuthService());
    }
}

export default AppStore;