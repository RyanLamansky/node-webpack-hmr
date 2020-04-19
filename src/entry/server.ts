import { Request, Response } from "express";
import crypto from "crypto";

const checkCompatibilityCode = "(async()=>{})();window['.Modern']=1;";
const checkCompatibilityName = `/checkCompatibility-${crypto.createHash("md5").update(checkCompatibilityCode).digest("hex")}.js`;

declare const BUILD_DATE: number;

const bundleLoader = `<script defer onload="var s=document.createElement('script');s.src=(window['.Modern']?'/modern':'/legacy')+'.js?${BUILD_DATE}';s.defer=true;document.body.appendChild(s);" src="${checkCompatibilityName}"></script>`;

export default function server(request: Request, response: Response) {
  switch (request.path) {
    case "/":
      response.send(`<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Experimental</title></head><body><div id="app-root">Experimental</div>${bundleLoader}</script></body></html>`);
      return;
    case checkCompatibilityName:
      response.setHeader("Cache-Control", "public, max-age=604800, immutable");
      response.contentType(".js").send(checkCompatibilityCode);
      return;
  }

  response
    .contentType("text/plain")
    .status(404)
    .send("Not found.")
    ;
}
