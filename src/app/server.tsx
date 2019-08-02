import { Request, Response } from 'express';

export default async function server(request: Request, response: Response) {
    if (request.path === '/') {
        response.send('<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Experimental</title></head><body><div id="app-root">Experimental</div><script defer src="/client.js"></script></body></html>');
        return;
    }

    response.redirect('/');
}
