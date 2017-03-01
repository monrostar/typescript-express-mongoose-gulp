import Mongoose = require("mongoose");
import Constants = require("../../config/constants/constants");

class DataAccess {
  static mongooseInstance : any;
  static mongooseConnection : Mongoose.Connection;

  constructor() {
    DataAccess.connect();
  }

  static connect() : Mongoose.Connection {
    if (this.mongooseInstance) {
      return this.mongooseInstance;
    }

    this.mongooseConnection = Mongoose.connection;
    this.mongooseConnection.once("open", () => {
      console.log("Connect to an mongodb is opened.");
    });

    this.mongooseInstance = Mongoose.connect(Constants.DB_CONNECTION_STRING);


    this.mongooseConnection.on("connected", () => {
      console.log(`Mongoose default connection open to  ${Constants.DB_CONNECTION_STRING}`);
    });

    // If the connection throws an error
    this.mongooseConnection.on("error", (parameters : { err : any }) => {
      let err = parameters.err;
      console.log(`Mongoose default connection error: ${err}`);
    });

    // When the connection is disconnected
    this.mongooseConnection.on("disconnected", () => {
      console.log(`Mongoose default connection disconnected.`);
    });

    // When the connection is reconnected
    this.mongooseConnection.on("reconnected", () => {
      console.log(`Mongoose default connection is reconnected`);
    });

    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", () => {
      this.mongooseConnection.close(() => {
        console.log(`Mongoose default connection disconnected through app termination`);
        process.exit(0);
      });
    });

    return this.mongooseInstance;
  }

}

DataAccess.connect();
export = DataAccess;
     