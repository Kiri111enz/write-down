import { makeAutoObservable } from 'mobx';
import { request } from 'utils/http';

export default class NotesStore {
    protected readonly BASE_URL = 'note/';
    
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        request(this.BASE_URL + 'get', 'get').then(res => console.log(res));
    }
}