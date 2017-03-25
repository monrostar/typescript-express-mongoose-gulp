import ILoggerService = require("../../config/middlewares/loggers/interfaces/i-logger-service");
import ILogger = require("../../config/middlewares/loggers/interfaces/i-logger");
import ConsoleLogger = require("../../config/middlewares/loggers/console-logger");

class LoggerService implements ILoggerService {

  public _logger: ILogger;

  constructor(logger: ILogger) {
    this._logger = logger;
  };

  public log(level: string, data : any) : void {
    this._logger.writeLogs(level, data);
  }

  public debug(data : any) : void {
    this._logger.writeDebug(data);
  }

}

export = LoggerService;
