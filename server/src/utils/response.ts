import { Response } from "express";

class Cookie {
    constructor(private _name: string, private _value: string) { }

    public get name(): string { return this._name; }

    public get value(): string { return this._value; }
}

const sendWithCookie = (res: Response, cookie: Cookie, message: string): Response => {
    return res.cookie(cookie.name, cookie.value, {
        httpOnly: true, secure: process.env.NODE_ENV == 'production'
    }).send(message);
}

export { sendWithCookie, Cookie };