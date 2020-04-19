import { Request, Response } from "express";

export default function server(request: Request, response: Response) {
  switch (request.path) {
    case "/":
      response.send("<!DOCTYPE html><html><head><meta charset=\"utf-8\" /><title>Experimental</title></head><body><div id=\"app-root\">Experimental</div><script defer src=\"/client.js\"></script></body></html>");
      return;
  }

  response
    .contentType("text/plain")
    .status(404)
    .send("Not found.")
    ;
}
