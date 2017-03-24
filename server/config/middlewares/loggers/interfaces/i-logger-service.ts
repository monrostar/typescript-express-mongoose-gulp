import ILogger = require("./i-logger");
interface ILoggerService {
  _logger: ILogger;
  log(data: any): void;
  debug(data: any): void;
}

export = ILoggerService;