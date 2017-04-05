import ILogger = require("./interfaces/i-logger");
import cluster = require("cluster");
import Constants = require("../../constants/constants");
import * as winston from "winston";
import path = require("path");
import fs = require("fs");

class ConsoleLogger implements ILogger {

  protected logger : winston.LoggerInstance;

  constructor() {
    this.logger = ConsoleLogger.winston;
  }

  protected static get winston() : winston.LoggerInstance {

    let logDirectory = path.join(__dirname, "../../../../logs");
    // ensure log directory exists
    if (fs.existsSync(logDirectory) === false) {
      fs.mkdirSync(logDirectory);
    }

    return new winston.Logger({
      transports: [
        new (winston.transports.File)({
          name            : "error-file",
          levels          : [ "error", "warn" ],
          filename        : logDirectory + "/error-log.log",
          handleExceptions: true,
          json            : true,
          maxsize         : 5242880, //5MB
          maxFiles        : 5,
          colorize        : false,
          timestamp       : true
        }), new (winston.transports.File)({
          name            : "info-file",
          levels          : [ "info", "debug" ],
          filename        : logDirectory + "/info-log.log",
          handleExceptions: true,
          json            : true,
          maxsize         : 5242880, //5MB
          maxFiles        : 1,
          colorize        : false,
          timestamp       : true
        }), new (winston.transports.Console)({
          levels: [ "info", "error", "warn", "debug" ], handleExceptions: true, json: false, colorize: true
        })
      ]
    });

  }

  public writeLogs(level : string, data : any) : void {
    if (!cluster.isMaster) {
      process.send({ type: Constants.LOGGER_WINSTON, level, data });
    } else {
      this.logger.log(level, data);
    }
  }

  public writeDebug(data : any) : void {
    process.send(data);
  }

}

export = ConsoleLogger;