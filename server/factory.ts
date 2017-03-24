import LoggerService = require("./app/services/logger-service");
import ConsoleLogger = require("./config/middlewares/loggers/console-logger");
import ILoggerService = require("./config/middlewares/loggers/interfaces/i-logger-service");

class Factory {

  static get ConsoleLogger() : ILoggerService {
    return new LoggerService(
      new ConsoleLogger()
    );
  };

}

export = Factory;