const timerName = "Startup";
console.time(timerName);
console.log("Starting...");

import express from "express";

const app = express();
app.disable("etag");
app.disable("x-powered-by");

import server from "./entry/server";

app.use(express.static("client"));
app.use(server);

const port = 3000;
app.listen(port, () => {
  console.log(`Startup complete, listening on port ${port}.`);
  console.timeEnd(timerName);
});