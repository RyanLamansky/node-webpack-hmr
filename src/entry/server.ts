import {
  Request, Response,
} from "express";
import { createHash } from "crypto";

const checkCompatibilityCode = "(async()=>{})();window['.Modern']=1;";
const checkCompatibilityName = `/checkCompatibility-${createHash("md5").update(checkCompatibilityCode).digest("hex")}.js`;

const homePage = (() => {
  const bundleLoader = `<script defer onload="var s=document.createElement('script');s.src=(window['.Modern']?'/modern':'/legacy')+'.js?${BUILD_DATE}';s.defer=true;document.body.appendChild(s);" src="${checkCompatibilityName}"></script>`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Experimental</title></head><body><div id="app-root">Experimental</div>${bundleLoader}</body></html>`;
})();

export default function server(request: Request, response: Response): void | Promise<void> {
  try {
    switch (request.path) {
    case "/":
      response.send(homePage);
      return;
    case checkCompatibilityName:
      response.setHeader("Cache-Control", "public, max-age=604800, no-transform, immutable");
      response.contentType(".js").send(checkCompatibilityCode);
      return;
    }

    response
      .contentType("text/plain")
      .status(404)
      .send("Not found.");
  } catch (e) {
    response
      .contentType("text/plain")
      .status(500)
      .send("Internal server error");
  }
}
