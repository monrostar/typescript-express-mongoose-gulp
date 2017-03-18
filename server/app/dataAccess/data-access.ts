import Mongoose = require("mongoose");
import { getDatabaseConfig } from "../../config/env/index";
import * as winston from "winston";

class DataAccess {
  static mongooseInstance : any;
  static mongooseConnection : Mongoose.Connection;

  constructor() {
    DataAccess.connect();
  }

  static connect() : Mongoose.Connection {

    let dbConfig = getDatabaseConfig();

    if (this.mongooseInstance) {
      return this.mongooseInstance;
    }

    this.mongooseConnection = Mongoose.connection;
    this.mongooseConnection.once("open", () => {
      winston.log("info", "Connect to an mongodb is opened.");
    });

    this.mongooseInstance = Mongoose.connect(dbConfig.mongodb.connectionString);

    this.mongooseConnection.on("connected", () => {
      winston.log("info", `Mongoose default connection open to  ${dbConfig.mongodb.connectionString}`);
    });

    // If the connection throws an error
    this.mongooseConnection.on("error", (parameters : { err : any }) => {
      let err = parameters.err;
      winston.log("error", `Mongoose default connection error: ${err}`);
    });

    // When the connection is disconnected
    this.mongooseConnection.on("disconnected", () => {
      winston.log("warning", `Mongoose default connection disconnected.`);
    });

    // When the connection is reconnected
    this.mongooseConnection.on("reconnected", () => {
      winston.log("info", `Mongoose default connection is reconnected`);
    });

    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", () => {
      this.mongooseConnection.close(() => {
        winston.log("info", `Mongoose default connection disconnected through app termination`);
        process.exit(0);
      });
    });

    return this.mongooseInstance;
  }

}

DataAccess.connect();
export = DataAccess;
     