import ILogger = require("./interfaces/i-logger");
import Constants = require("../../constants/constants");
class ConsoleLogger implements ILogger {

  public writeLogs(data : any) : void {
    process.send(data);
  }

  public writeDebug(data : any) : void {
    process.send(data);
  }

}

export = ConsoleLogger;