import axios from 'axios';

export class Response<Type> {
    constructor(private _success: boolean, private _message: Type) { }

    public get success(): boolean { return this._success; }

    public get message(): Type { return this._message; }
}

export const request = async <Type>(url: string, method: string, data: object={}, params: object={}): Promise<Response<Type>> => {
    try {
        const res = await axios.request({ url, method, data, params,
            headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return new Response(true, res.data);
    }
    catch (err) {
        return new Response(false, err.response ? err.response.data : err);
    }
};