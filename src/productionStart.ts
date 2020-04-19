import cluster from "cluster";
import { cpus } from "os";
import express from "express";
import server from "./entry/server";

if (cluster.isMaster) {
  const timerName = "Ready";
  console.time(timerName);

  let count = 0;
  cpus().forEach(() => {
    count++;
    cluster.fork().once("listening", () => {
      count--;
      if (!count) {
        console.timeEnd(timerName);
      }
    });
  });

  cluster.on("exit", (worker, code, signal) => {
    console.warn(`Worker ${worker.id} exited with code ${code} and signal ${signal}.`);
    cluster.fork();
  });
} else {
  const app = express();
  app.disable("etag");
  app.disable("x-powered-by");

  app.use(express.static("client"));
  app.use(server);

  app.listen(3000);
}
