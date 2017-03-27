import Mongoose = require("mongoose");
import { getDatabaseConfig } from "../../config/env/index";
import * as winston from "winston";
import Bluebird = require("bluebird");
import Container = require("../../container");

class DataAccess {
  static mongooseInstance : any;
  static mongooseConnection : Mongoose.Connection;

  constructor() {
    DataAccess.connect();
  }

  static connect() : Mongoose.Connection {
    let ConsoleLogger = Container.ConsoleLogger;
    let dbConfig = getDatabaseConfig();

    if (this.mongooseInstance) {
      return this.mongooseInstance;
    }

    Mongoose.Promise = Bluebird;
    let connectionString = dbConfig.mongodb.connectionString;
    this.mongooseConnection = Mongoose.connection;

    this.mongooseConnection.once("open", () => {
      ConsoleLogger.log("info", "Connect to an mongodb is opened.");
    });

    this.mongooseInstance = Mongoose.connect(connectionString);

    this.mongooseConnection.on("connected", () => {
      ConsoleLogger.log("info", `Mongoose default connection open to ${connectionString}.`);
    });

    // If the connection throws an error
    this.mongooseConnection.on("error", (msg) => {
      ConsoleLogger.log("error", `Mongoose default connection message: ${msg}`);
    });

    // When the connection is disconnected
    this.mongooseConnection.on("disconnected", () => {
      setTimeout(function() {
        this.mongooseInstance = Mongoose.connect(connectionString);
      }, 90000000);

      ConsoleLogger.log("warn", `Mongoose default connection disconnected.`);
    });

    // When the connection is reconnected
    this.mongooseConnection.on("reconnected", () => {
      ConsoleLogger.log("info", `Mongoose default connection is reconnected.`);
    });

    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", () => {
      this.mongooseConnection.close(() => {
        ConsoleLogger.log("info", `Mongoose default connection disconnected through app termination.`);
        process.exit(0);
      });
    });

    return this.mongooseInstance;
  }

}

DataAccess.connect();
export = DataAccess;
     