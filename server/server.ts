import e = require("express");
require("source-map-support").install();
import config from "./config/index";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as fs from "fs-promise-tsc";
import * as morgan from "morgan";

import mongoose = require("mongoose");
import * as Bluebird from "bluebird";

// Declare middleware
import TokenMiddleware from "./middleware/token.middleware";

// Declare routes
import { Index } from "./routes/";


export class Server {

  private _connection : mongoose.Connection;
          assets : any;

  constructor(
    public app : express.Application,
    public assetMapPath : string = path.join(__dirname, "..", "assets", "webpack-assets.json")
  ) {}

  public get connection() : mongoose.Connection {
    return this._connection;
  }

  private connectMongoose() {

    mongoose.Promise = Bluebird;

    //connect to mongoose
    mongoose.connect(config.database.url, (err) => {
      if (err) {
        console.log(`Mongoose connected err stack trace: ${err}`);
      }
    });

    this._connection = mongoose.connection;

    // CONNECTION EVENTS
    // When successfully connected

    this._connection.on("connected", () => {
      console.log(`Mongoose default connection open to  ${config.database.url}`);
    });

    // If the connection throws an error
    this._connection.on("error", (parameters : { err : any }) => {
      let err = parameters.err;
      console.log(`Mongoose default connection error: ${err}`);
    });

    // When the connection is disconnected
    this._connection.on("disconnected", () => {
      console.log(`Mongoose default connection disconnected`);
    });

    // When the connection is reconnected
    this._connection.on("reconnected", () => {
      console.log(`Mongoose default connection is reconnected`);
    });

    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", () => {
      this._connection.close(() => {
        console.log(`Mongoose default connection disconnected through app termination`);
        process.exit(0);
      });
    });

  }

  private expressConfig() {

    this.app.use(morgan("tiny"));

    this.app.set("views", path.join(__dirname, "../views"));
    this.app.set("view engine", "pug");

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // TODO compression
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use("/client", express.static(path.join(__dirname, "../client")));
    this.app.use("/assets", express.static(path.join(__dirname, "../assets")));
    this.app.use("/css", express.static(path.join(__dirname, "../css")));
    this.app.use(favicon(path.join(__dirname, "../public/favicon.ico")));
    // TODO express-session

  }

  private routes() : void {
    const router : express.Router = express.Router();

    const routes          = new Index();
    const tokenMiddleware = new TokenMiddleware();

    //home page
    router.get("/", tokenMiddleware.checkToken.bind(tokenMiddleware), routes.index.bind(routes));
    router.get("/api", tokenMiddleware.checkToken.bind(tokenMiddleware), routes.index.bind(routes));

    this.app.use(router);

    this.app.use(function (req : express.Request, res : express.Response, next : express.NextFunction) {
      res.status(404);
      // TODO: JSON response if requested in request
      res.render("error", {
        message: "Hmmmm, couldn't find that.",
        stack  : "N/A"
      });
    });
  }

  async init() : Promise<any> {
    // Load assets from expected location
    if (await fs.exists(this.assetMapPath)) {
      const fileData = await fs.readFile(this.assetMapPath, "utf8");
      if (fileData) {
        this.assets = JSON.parse(fileData);
        console.log(`Loaded asset map: ${fileData}`);
        this.app.set("assetMap", this.assets);
      }
    }
    //configure application
    this.expressConfig();

    //configure database
    this.connectMongoose();

    //add routes
    this.routes();

    //add errors handler
    this.errorsHandler();

    return Promise.resolve();
  }

  shutdown() : Promise<any> {
    // stop doing things
    return Promise.resolve();
  }

  private errorsHandler() {

    if (this.app.get("env") === "development") {
      this.app.use((err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
        let { status = 500, message = "Server Error" } = err;
        res.status(status);
        // TODO: JSON response if requested in request
        res.json({
          message,
          stack: JSON.stringify(err)
        });
      });
    } else {
      this.app.use((err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
        let { status = 500, message = "Server Error" } = err;
        res.status(status);
        // TODO: JSON response if requested in request
        res.json({
          message
        });
      });
    }
  }
}