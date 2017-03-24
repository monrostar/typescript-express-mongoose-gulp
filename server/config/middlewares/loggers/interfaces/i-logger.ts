interface ILogger {
  writeLogs(data: any): void;
  writeDebug(data: any): void;
}

export = ILogger;