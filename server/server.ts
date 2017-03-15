
import MiddlewaresBase = require("./config/middlewares/base/middelwares-base");
require("source-map-support").install();
import * as winston from "winston";
import express = require("express");
import http = require("http");
import { getServerConfigs } from "./config/env/index";
import MiddlewareCluster = require("./config/middlewares/base/middleware-cluster");

const debug = require("debug")("http");
let app  = express();

let serverConfig = getServerConfigs();
const port = normalizePort(serverConfig.port || 3000);
app.set("port", port);

app.use(MiddlewaresBase.configuration);


if (require("cluster").isMaster) {
  let clusterMiddleware = new MiddlewareCluster();
  clusterMiddleware.init();

} else {

  // TODO init server Class
  const httpServer = http.createServer(app);
  httpServer.listen(port);
  httpServer.on("error", onError);
  httpServer.on("listening", onListening);
  // notify master about the request

  winston.log("info", `Worker ${process.pid} started`);

  process.on("SIGINT", () => {
    httpServer.close();
    process.exit();
  });


  function onError(error: any): void {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string"
      ? `Pipe ${port}`
      : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        winston.log("error", `${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        winston.log("error", `${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening(): void {
    const addr = httpServer.address();
    const bind = typeof addr === "string"
      ? `pipe ${addr}`
      : `port ${addr.port}`;
    winston.log("info", `Listening on ${bind}`);
  }

}

function normalizePort(val: any): any {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


