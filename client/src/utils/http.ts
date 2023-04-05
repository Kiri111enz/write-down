import axios from 'axios';

class Response {
    constructor(
        private _success: boolean,
        private _data: object
    ) { }

    public get success(): boolean {
        return this._success;
    }

    public get data(): object {
        return this._data;
    }
}

const post = async(data: object, url: string): Promise<Response> => {
    try {
        const res = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json ' }
        });
        return new Response(true, res.data);
    }
    catch (err) {
        if (err.response)
            return new Response(false, err.response.data);
        return new Response(false, err);
    }
};

export { post, Response };