import AuthStore from './AuthStore';
import NotesStore from './NotesStore';

export default class AppStore {
    private readonly _authStore: AuthStore;
    private readonly _notesStore: NotesStore;

    constructor() {
        this._authStore = new AuthStore();
        this._notesStore = new NotesStore();
    }

    public get authStore(): AuthStore { return this._authStore; }

    public get notesStore(): NotesStore { return this._notesStore; }
}