require("source-map-support").install();
import express = require("express");
import http = require("http");
import Middlewares = require("./config/middlewares/base/MiddlewaresBase");

let app  = express();
const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

app.use(Middlewares.configuration);

const httpServer = http.createServer(app);
httpServer.listen(port);
httpServer.on("error", onError);
httpServer.on("listening", onListening);

process.on("SIGINT", () => {
  httpServer.close();
  process.exit();
});

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
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
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
  console.log(`Listening on ${bind}`);
}

