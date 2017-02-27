require("source-map-support").install();

import * as debug from "debug";
import { Server } from "./server";
import * as http from "http";
import * as express from "express";

const expressDebug = debug("express-server");

const port = normalizePort(process.env.PORT || 3000);

const app = express();
app.set("port", port);

const httpServer = http.createServer(app);
httpServer.listen(port);
httpServer.on("error", onError);
httpServer.on("listening", onListening);

const server = new Server(app);
server.init();

process.on("SIGINT", () => {
    httpServer.close();
    server.shutdown();
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
