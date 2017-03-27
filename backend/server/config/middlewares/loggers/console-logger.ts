import ILogger = require("./interfaces/i-logger");
import cluster = require("cluster");
import Constants = require("../../constants/constants");
import * as winston from "winston";

class ConsoleLogger implements ILogger {

  public writeLogs(level : string, data : any) : void {
    if (!cluster.isMaster ) {
      process.send({ type: Constants.LOGGER_WINSTON, level, data });
    } else {
      let logger = new winston.Logger({
        transports       : [ , new (winston.transports.Console)({
          levels: [ "debug", "info" ], handleExceptions: true, json: false, colorize: true
        }) ], exitOnError: false
      });
      logger.log(level, data);
    }
  }

  public writeDebug(data : any) : void {
    process.send(data);
  }

}

export = ConsoleLogger;