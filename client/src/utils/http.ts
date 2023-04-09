import axios from 'axios';

class Response {
    constructor(
        private _success: boolean,
        private _message: string
    ) { }

    public get success(): boolean {
        return this._success;
    }

    public get message(): string {
        return this._message;
    }
}

const post = async(url: string, data: object): Promise<Response> => {
    try {
        const res = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
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