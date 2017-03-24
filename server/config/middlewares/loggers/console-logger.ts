import ILogger = require("./interfaces/i-logger");
import Constants = require("../../constants/constants");
class ConsoleLogger implements ILogger {

  public writeLogs(data : any) : void {
    // TODO Make the interface for messages for the master
    process.send({type: Constants.LOGGER.console, data: data});
  }

  public writeDebug(data : any) : void {
    // TODO Make the interface for messages for the master
    process.send({type: Constants.LOGGER.debug, data: data});
  }

}

export = ConsoleLogger;