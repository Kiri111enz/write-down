import { makeAutoObservable, runInAction } from 'mobx';
import AppStore from './AppStore';
import { request } from 'utils/http';

interface Note {
    id: number
    title: string
    text: string
}

export default class NotesStore {
    private readonly BASE_URL = 'note/';
    private _notes: Note[] | null = null;
    
    constructor(private appStore: AppStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    public get notes(): Note[] | null { 
        if (!this.appStore.authStore.isAuthorized)
            return this._notes = null;
        
        if (this._notes === null)
            request<Note[]>(this.BASE_URL + 'get', 'get').then(res => runInAction(() => this._notes = res.message));
        return this._notes;
    }
}