import { Response } from "express";

class Cookie {
    constructor(public name: string, public value: string) { }
}

const sendWithCookie = (res: Response, cookie: Cookie, message: string): Response => {
    return res.cookie(cookie.name, cookie.value, {
        httpOnly: true, secure: process.env.NODE_ENV == 'production'
    }).send(message);
}

export { sendWithCookie, Cookie };