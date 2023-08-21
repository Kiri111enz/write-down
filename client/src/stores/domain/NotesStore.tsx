import { makeAutoObservable, runInAction } from 'mobx';
import AppStore from './AppStore';
import { request } from 'utils/http';

export interface Note {
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
            request<Note[]>(this.BASE_URL + 'get', 'get').then((res) => runInAction(() => this._notes = res.message));
        return this._notes;
    }

    public async addNote(): Promise<void> {
        if (this._notes === null)
            throw new Error('Tried to add a note without authentication.');

        request<Note>(this.BASE_URL + 'create', 'post', { title: '', text: '' })
            .then((res) => runInAction(() => this._notes!.push(res.message)));
    }

    public async deleteNote(noteId: number): Promise<void> {
        const index = this._notes?.findIndex((note) => note.id === noteId);
        if (index === undefined)
            throw new Error('Tried to delete an unexisting note.');
        this._notes!.splice(index, 1);
        void request(this.BASE_URL + 'delete', 'delete', {}, { noteId });
    }
}